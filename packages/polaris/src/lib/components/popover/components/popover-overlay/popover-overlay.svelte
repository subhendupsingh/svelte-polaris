<script lang="ts">
	import { onDestroy, onMount, type Component } from 'svelte';
	import {
		nodeContainsDescendant,
		PopoverCloseSource,
		TransitionStatus,
		type PopoverOverlayProps,
		type PortalsContainerElement,
		type State
	} from './types.js';
	import { findFirstKeyboardFocusableNode } from '$utilities/focus.js';
	import { themeDefault } from '@shopify/polaris-tokens';
	import { applyStyles, classNames, variationName } from '$utilities/css.js';
	import styles from '../../popover.module.css';
	import PositionedOverlay from '$lib/components/positioned-overlay/positioned-overlay.svelte';
	import type { OverlayDetails } from '$lib/components/positioned-overlay/types.js';
	import { Rect } from '$utilities/geometry.js';
	import EventListener from '$lib/components/event-listener/event-listener.svelte';
	import KeypressListener from '$lib/components/keypress-listener/keypress-listener.svelte';
	import { Key } from '$utilities/types.js';
	import { overlay } from '$utilities/shared.js';
	import Pane from '../pane/pane.svelte';
	import { useContext, type PortalsManager } from '$utilities/contexts.js';
	import { PORTALS_MANAGER_CONTEXT_KEY } from '$utilities/portals/types.js';

	let {
		active,
		activator,
		fullWidth,
		preferredPosition = 'below',
		preferredAlignment = 'center',
		preferInputActivator = true,
		fixed,
		zIndexOverride,
		overlayRef = $bindable(),
		forceUpdatePosition = $bindable(),
		autofocusTarget = 'none',
		...rest
	}: PopoverOverlayProps = $props();

	let states: State = $state({
		transitionStatus: active ? TransitionStatus.Entered : TransitionStatus.Exited
	});

	let overlayDetails = $state<OverlayDetails>({
		activatorRect: new Rect({}),
		left: undefined,
		right: undefined,
		desiredHeight: 0,
		positioning: 'below',
		measuring: false,
		chevronOffset: 0
	});

	let contentNode = $state<HTMLDivElement>();
	let enteringTimer = $state<number>();
	let observer: ResizeObserver;
	let context = $derived(useContext<{container: PortalsContainerElement}>(PORTALS_MANAGER_CONTEXT_KEY)?.());

	function changeTransitionStatus(transitionStatus: TransitionStatus, cb?: () => void) {
		states = { transitionStatus };
		cb?.();
		// Forcing a reflow to enable the animation
		contentNode && contentNode.getBoundingClientRect();
	}

	function focusContent() {
		if (autofocusTarget === 'none' || contentNode == null) {
			return;
		}

		requestAnimationFrame(() => {
			if (contentNode == null) {
				return;
			}

			const focusableChild = findFirstKeyboardFocusableNode(contentNode);

			if (focusableChild && autofocusTarget === 'first-node') {
				focusableChild.focus({
					preventScroll: process.env.NODE_ENV === 'development'
				});
			} else {
				contentNode.focus({
					preventScroll: process.env.NODE_ENV === 'development'
				});
			}
		});
	}

	function clearTransitionTimeout() {
		if (enteringTimer) {
			window?.clearTimeout(enteringTimer);
		}
	}

	onMount(() => {
		if (active) {
			focusContent();
			changeTransitionStatus(TransitionStatus.Entered);
		}

		observer = new ResizeObserver(() => {
			states = {
				/**
				 * This is a workaround to enable event listeners to be
				 * re-attached when moving from one document to another
				 * when using a React portal across iframes.
				 * Using a resize observer works because when the clientWidth
				 * will go from 0 to the real width after the activator
				 * gets rendered in its new place.
				 */
				window: activator.ownerDocument.defaultView,
				transitionStatus: states.transitionStatus
			};
		});

		observer.observe(activator);
	});

	onDestroy(() => {
		clearTransitionTimeout();
		observer?.disconnect();
	});

	$effect(() => {
		if (active) {
			focusContent();
			changeTransitionStatus(TransitionStatus.Entered, () => {
				clearTransitionTimeout();
				enteringTimer = window?.setTimeout(
					() => {
						states = { transitionStatus: TransitionStatus.Entered };
						// Important: This will not update when the active theme changes.
						// Update this to `useTheme` once converted to a function component.
					},
					parseInt(themeDefault.motion['motion-duration-100'], 10)
				);
			});
		}

		if (!active) {
			clearTransitionTimeout();
			states = { transitionStatus: TransitionStatus.Exited };
		}

		if (activator) {
			observer?.unobserve(activator);
			observer?.observe(activator);
		}
	});

	const className = $derived(
		classNames(
			styles.PopoverOverlay,
			states.transitionStatus === TransitionStatus.Entering && styles['PopoverOverlay-entering'],
			states.transitionStatus === TransitionStatus.Entered && styles['PopoverOverlay-open'],
			states.transitionStatus === TransitionStatus.Exiting && styles['PopoverOverlay-exiting'],
			preferredPosition === 'cover' && styles['PopoverOverlay-noAnimation']
		)
	);

	function wasContentNodeDescendant(
		composedPath: readonly EventTarget[],
		contentNode?: HTMLDivElement
	) {
		return contentNode != null && composedPath.includes(contentNode);
	}

	function wasPolarisPortalDescendant(
		composedPath: readonly EventTarget[],
		portalsContainerElement?: PortalsContainerElement
	): boolean {
		return composedPath.some(
			(eventTarget) => eventTarget instanceof Node && portalsContainerElement?.contains(eventTarget)
		);
	}

	function handleScrollOut() {
		rest.onClose(PopoverCloseSource.ScrollOut);
	}

	function handleClick(event: Event) {
		const target = event.target as HTMLElement;
		const composedPath = event.composedPath();
		const wasDescendant = rest.preventCloseOnChildOverlayClick
			? wasPolarisPortalDescendant(composedPath, context?.container)
			: wasContentNodeDescendant(composedPath, contentNode);
		const isActivatorDescendant = nodeContainsDescendant(activator, target);
		if (
			wasDescendant ||
			isActivatorDescendant ||
			states.transitionStatus !== TransitionStatus.Entered
		) {
			return;
		}

		rest.onClose(PopoverCloseSource.Click);
	}

	function handleEscape(event: Event) {
		const target = event.target as HTMLElement;
		const composedPath = event.composedPath();
		const wasDescendant = wasContentNodeDescendant(composedPath, contentNode);
		const isActivatorDescendant = nodeContainsDescendant(activator, target);

		if (wasDescendant || isActivatorDescendant) {
			rest.onClose(PopoverCloseSource.EscapeKeypress);
		}
	}

	const handleFocusFirstItem = (): void => {
		rest.onClose(PopoverCloseSource.FocusOut);
	};

	const handleFocusLastItem = (): void => {
		rest.onClose(PopoverCloseSource.FocusOut);
	};

	const isCovering = $derived(overlayDetails.positioning === 'cover');
	const contentStyles = $derived(
		overlayDetails.measuring ? undefined : { height: overlayDetails.desiredHeight }
	);

	const contentClassNames = $derived(
		classNames(
			styles.Content,
			rest.fullHeight && styles['Content-fullHeight'],
			rest.fluidContent && styles['Content-fluidContent']
		)
	);

	const { window } = $derived(states);

	const popoverClassName = $derived(
		classNames(
			styles.Popover,
			overlayDetails.measuring && styles.measuring,
			(fullWidth || isCovering) && styles.fullWidth,
			rest.hideOnPrint && styles['PopoverOverlay-hideOnPrint'],
			overlayDetails.positioning && styles[variationName('positioned', overlayDetails.positioning)]
		)
	);
</script>

{#snippet renderPopoverContent()}
	<Pane>
		{@render rest.children?.()}
	</Pane>
{/snippet}

{#snippet renderPopover()}
	<div class={popoverClassName} {...overlay.props}>
		<EventListener event="click" handler={handleClick} {window} />
		<EventListener event="touchstart" handler={handleClick} {window} />
		<KeypressListener keyCode={Key.Escape} handler={handleEscape} document={window?.document} />
		<div class={styles.FocusTracker} tabIndex={0} onfocus={handleFocusFirstItem}></div>
		<div class={styles.ContentContainer}>
			<div
				tabIndex={autofocusTarget === 'none' ? undefined : -1}
				class={contentClassNames}
				style={contentStyles ? applyStyles(contentStyles) : undefined}
				bind:this={contentNode}
			>
				{@render renderPopoverContent()}
			</div>
		</div>
		<!-- <div class={styles.FocusTracker} tabIndex={0} onfocus={handleFocusLastItem}></div> -->
	</div>
{/snippet}

<PositionedOverlay
	bind:overlayRef
	bind:overlayDetails
	bind:forceUpdatePosition
	{fullWidth}
	{active}
	{activator}
	{preferInputActivator}
	{preferredPosition}
	{preferredAlignment}
	{fixed}
	onScrollOut={handleScrollOut}
	classNames={className}
	{zIndexOverride}
>
	{@render renderPopover()}
</PositionedOverlay>
