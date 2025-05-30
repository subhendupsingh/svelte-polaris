<script lang="ts">
	import { getRectForNode, Rect } from '$utilities/geometry.js';
	import { onDestroy, onMount, tick } from 'svelte';
	import styles from './positioned-overlay.module.css';
	import type { PositionedOverlayProps, Positioning, State } from './types.js';
	import { forNode } from '../scrollable/types.js';
	import { applyStyles, classNames } from '$utilities/css.js';
	import EventListener from '../event-listener/event-listener.svelte';
	import { dataPolarisTopBar, layer } from '$utilities/shared.js';
	import {
		calculateHorizontalPosition,
		calculateVerticalPosition,
		intersectionWithViewport,
		rectIsOutsideOfRect,
		windowRect
	} from '$utilities/math.js';
	let {
		activator,
		active,
		children,
		onScrollOut,
		preferInputActivator,
		preferredPosition,
		preferredAlignment,
		fullWidth,
		fixed,
		preventInteraction,
		classNames: suppliedClass,
		zIndexOverride,
		overlayRef = $bindable(),
		overlayDetails = $bindable(),
		forceUpdatePosition = $bindable()
	}: PositionedOverlayProps = $props();

	let states: State = $state({
		measuring: true,
		activatorRect: getRectForNode(activator),
		right: undefined,
		left: undefined,
		top: 0,
		height: 0,
		width: null,
		positioning: 'below',
		zIndex: null,
		outsideScrollableContainer: false,
		lockPosition: false,
		chevronOffset: 0
	});

	const setScrollableContainers = () => {
		const containers: (HTMLElement | Document)[] = [];
		let scrollableContainer = forNode(activator);

		if (scrollableContainer) {
			containers.push(scrollableContainer);

			while (scrollableContainer?.parentElement) {
				scrollableContainer = forNode(scrollableContainer.parentElement);

				containers.push(scrollableContainer);
			}
		}

		scrollableContainers = containers;
	};

	const registerScrollHandlers = () => {
		scrollableContainers.forEach((node) => {
			node.addEventListener('scroll', handleMeasurement);
		});
	};

	const unregisterScrollHandlers = () => {
		scrollableContainers.forEach((node) => {
			node.removeEventListener('scroll', handleMeasurement);
		});
	};

	onMount(async () => {
		setScrollableContainers();
		if (scrollableContainers.length && !fixed) {
			registerScrollHandlers();
		}

		await tick();
		handleMeasurement();
	});

	onDestroy(() => {
		observer?.disconnect();

		if (scrollableContainers.length && !fixed) {
			unregisterScrollHandlers();
		}
	});

	$effect(() => {
		const { outsideScrollableContainer, top } = states;

		if (active && onScrollOut != null && top !== 0 && outsideScrollableContainer) {
			onScrollOut();
		}

		overlayDetails = {
			activatorRect: states.activatorRect,
			left: states.left,
			right: states.right,
			desiredHeight: states.height,
			positioning: states.positioning,
			measuring: states.measuring,
			chevronOffset: states.chevronOffset
		};

		forceUpdatePosition = () => requestAnimationFrame(handleMeasurement);
	});

	function firstScrollableContainer(): HTMLElement | Document | null {
		return scrollableContainers[0] ?? null;
	}

	function isDocument(node: HTMLElement | Document | null): node is Document {
		return node?.ownerDocument === null;
	}

	function getMarginsForNode(node: HTMLElement) {
		// Accounts for when the node is moved between documents
		const window = node?.ownerDocument.defaultView || globalThis.window;
		const nodeStyles = window.getComputedStyle(node);
		return {
			activator: parseFloat(nodeStyles.marginTop || '0'),
			container: parseFloat(nodeStyles.marginBottom || '0'),
			horizontal: parseFloat(nodeStyles.marginLeft || '0')
		};
	}

	function getZIndexForLayerFromNode(node: HTMLElement) {
		const layerNode = node.closest(layer.selector) || node?.ownerDocument?.body;
		const zIndex =
			layerNode === node?.ownerDocument?.body
				? 'auto'
				: parseInt(window.getComputedStyle(layerNode).zIndex || '0', 10);
		return zIndex === 'auto' || isNaN(zIndex) ? null : zIndex;
	}

	const handleMeasurement = () => {
		const { lockPosition, top } = states;

		observer?.disconnect();
		if (overlayRef == null || firstScrollableContainer() == null) {
			return;
		}
		const document = activator?.ownerDocument;
		const preferredActivator = preferInputActivator
			? activator.querySelector('input') || activator
			: activator;
		const activatorRect = getRectForNode(preferredActivator);
		const currentOverlayRect = getRectForNode(overlayRef);
		const scrollableElement = isDocument(firstScrollableContainer())
			? document?.body
			: firstScrollableContainer();
		const scrollableContainerRect = scrollableElement ? getRectForNode(scrollableElement) : null;

		if (!scrollableContainerRect) {
			//throw new Error('Scrollable container rect is null, cannot calculate position');
			return;
		}

		const overlayRect =
			fullWidth || preferredPosition === 'cover'
				? new Rect({ ...currentOverlayRect, width: activatorRect.width })
				: currentOverlayRect;

		// If `body` is 100% height, it still acts as though it were not constrained to that size. This adjusts for that.
		if (scrollableElement === document.body && scrollableContainerRect) {
			scrollableContainerRect.height = document.body.scrollHeight;
		}

		let topBarOffset = 0;

		const topBarElement = scrollableElement?.querySelector(`${dataPolarisTopBar.selector}`);

		if (topBarElement) {
			topBarOffset = topBarElement.clientHeight;
		}

		let overlayMargins = { activator: 0, container: 0, horizontal: 0 };

		if (overlayRef.firstElementChild) {
			const nodeMargins = getMarginsForNode(overlayRef.firstElementChild as HTMLElement);
			overlayMargins = nodeMargins;
		}

		const containerRect = windowRect(activator);
		const zIndexForLayer = getZIndexForLayerFromNode(activator);
		const zIndex = zIndexForLayer == null ? zIndexForLayer : zIndexForLayer + 1;

		if (!preferredPosition) {
			throw new Error('preferredPosition is not provided');
		}

		if (!preferredAlignment) {
			throw new Error('preferredAlignment is not provided');
		}

		const verticalPosition = calculateVerticalPosition(
			activatorRect,
			overlayRect,
			overlayMargins,
			scrollableContainerRect,
			containerRect,
			preferredPosition,
			fixed,
			topBarOffset
		);

		const horizontalPosition = calculateHorizontalPosition(
			activatorRect,
			overlayRect,
			containerRect,
			overlayMargins,
			preferredAlignment
		);

		const chevronOffset =
			activatorRect.center.x - horizontalPosition + overlayMargins.horizontal * 2;

		states = {
			measuring: false,
			activatorRect: getRectForNode(activator),
			left: preferredAlignment !== 'right' ? horizontalPosition : undefined,
			right: preferredAlignment === 'right' ? horizontalPosition : undefined,
			top: lockPosition ? top : verticalPosition.top,
			lockPosition: Boolean(fixed),
			height: verticalPosition.height || 0,
			width: fullWidth || preferredPosition === 'cover' ? overlayRect.width : null,
			positioning: verticalPosition.positioning as Positioning,
			outsideScrollableContainer:
				onScrollOut != null &&
				rectIsOutsideOfRect(
					activatorRect,
					intersectionWithViewport(scrollableContainerRect, containerRect)
				),
			zIndex,
			chevronOffset
		};
	};

	let scrollableContainers: (HTMLElement | Document)[] = $state([]);
	let observer: MutationObserver | null = new MutationObserver(handleMeasurement);

	let positionedOverlayStyles = $derived({
		top: states.top == null || isNaN(states.top) ? undefined : states.top,
		left: states.left == null || isNaN(states.left) ? undefined : states.left,
		right: states.right == null || isNaN(states.right) ? undefined : states.right,
		width: states.width == null || isNaN(states.width) ? undefined : states.width,
		zIndex: zIndexOverride || states.zIndex || undefined
	});

	const className = $derived(
		classNames(
			styles.PositionedOverlay,
			fixed && styles.fixed,
			preventInteraction && styles.preventInteraction,
			suppliedClass
		)
	);
	
</script>

<div class={className} style="top: {positionedOverlayStyles.top}px; left: {positionedOverlayStyles.left}px; right: {positionedOverlayStyles.right}px; width: {positionedOverlayStyles.width}px; z-index: {positionedOverlayStyles.zIndex};" bind:this={overlayRef}>
	<EventListener
		event="resize"
		handler={handleMeasurement}
		window={overlayRef?.ownerDocument.defaultView}
	/>
	{@render children?.()}
</div>
