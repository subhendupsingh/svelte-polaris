<script lang="ts">
	import {
		findFirstFocusableNodeIncludingDisabled,
		focusNextFocusableNode
	} from '$utilities/focus.js';
	import { portal } from '$utilities/shared.js';
	import type { AriaAttributes } from 'svelte/elements';
	import { setActivatorAttributes, type PopoverProps } from './types.js';
	import PopoverOverlay from './components/popover-overlay/popover-overlay.svelte';
	import Portal from '../portal/portal.svelte';
	import { onMount, tick } from 'svelte';

	let {
		activatorWrapper = 'div',
		children,
		onClose,
		activator,
		preventFocusOnClose,
		active,
		fixed,
		ariaHaspopup,
		preferInputActivator = true,
		zIndexOverride,
		forceUpdatePosition,
		trigger,
		...rest
	}: PopoverProps = $props();

	let isDisplayed = $state(false);
	let activatorNode = $derived(activator);
	let overlayRef = $state<HTMLDivElement>();
	let activatorContainer = $state<HTMLElement>();
	const id = $props.id();

	enum PopoverCloseSource {
		Click,
		EscapeKeypress,
		FocusOut,
		ScrollOut
	}

	function isInPortal(element: Element) {
		let parentElement = element.parentElement;

		while (parentElement) {
			if (parentElement.matches(portal.selector)) return false;
			parentElement = parentElement.parentElement;
		}

		return true;
	}

	const handleClose = (source: PopoverCloseSource) => {
		onClose(source);

		if (activatorContainer == null || preventFocusOnClose) {
			return;
		}

		activatorNode?.setAttribute('data-state', active === true ? 'open' : 'close');

		if (source === PopoverCloseSource.FocusOut && activatorNode) {
			const focusableActivator =
				findFirstFocusableNodeIncludingDisabled(activatorNode) ||
				findFirstFocusableNodeIncludingDisabled(activatorContainer) ||
				activatorContainer;
			if (!focusNextFocusableNode(focusableActivator, isInPortal)) {
				focusableActivator.focus();
			}
		} else if (source === PopoverCloseSource.EscapeKeypress && activatorNode) {
			const focusableActivator =
				findFirstFocusableNodeIncludingDisabled(activatorNode) ||
				findFirstFocusableNodeIncludingDisabled(activatorContainer) ||
				activatorContainer;

			if (focusableActivator) {
				focusableActivator.focus();
			} else {
				focusNextFocusableNode(focusableActivator, isInPortal);
			}
		}
	};

	const setAccessibilityAttributes = () => {
		if (activatorContainer == null) {
			return;
		}

		const firstFocusable = findFirstFocusableNodeIncludingDisabled(activatorContainer);
		const focusableActivator: HTMLElement & {
			disabled?: boolean;
		} = firstFocusable || activatorContainer;

		const activatorDisabled =
			'disabled' in focusableActivator && Boolean(focusableActivator.disabled);

		setActivatorAttributes(focusableActivator, {
			id,
			active,
			ariaHaspopup: ariaHaspopup as AriaAttributes['aria-haspopup'],
			activatorDisabled
		});
	};

	function setDisplayState() {
		/**
		 * This is a workaround to prevent rendering the Popover when the content is moved into
		 * a React portal that hasn't been rendered. We don't want to render the Popover in this
		 * case because the auto-focus logic will break. We wait until the activatorContainer is
		 * displayed, which is when it has an offsetParent, or if the activatorContainer is the
		 * body, if it has a clientWidth bigger than 0.
		 * See: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
		 */

		isDisplayed = Boolean(
			activatorContainer &&
				(activatorContainer.offsetParent !== null ||
					(activatorContainer === activatorContainer.ownerDocument.body &&
						activatorContainer.clientWidth > 0))
		);
	}

	$effect(() => {
		if (!activatorContainer) {
			return;
		}

		const observer = new ResizeObserver(setDisplayState);
		observer.observe(activatorContainer);

		setDisplayState();

		return () => {
			observer.disconnect();
		};
	});

	/* $effect(() => {
		if (!activatorNode && activatorContainer) {
			activatorNode = activatorContainer.firstElementChild as HTMLElement;
		} else if (activatorNode && activatorContainer && !activatorContainer.contains(activatorNode)) {
			//TODO:
			activatorNode = activatorContainer.firstElementChild as HTMLElement;
		}

		if (activatorNode && activatorContainer) {
			//TODO:
			activatorNode = activatorContainer.firstElementChild as HTMLElement;
		}

		setAccessibilityAttributes();
	}); */

	onMount(async () => {
		await tick();
		if (!activatorNode && activatorContainer) {
			activatorNode = activatorContainer.firstElementChild as HTMLElement;
		} else if (activatorNode && activatorContainer && !activatorContainer.contains(activatorNode)) {
			//TODO:
			activatorNode = activatorContainer.firstElementChild as HTMLElement;
		}

		if (activatorNode && activatorContainer) {
			//TODO:
			activatorNode = activatorContainer.firstElementChild as HTMLElement;
		}

		setAccessibilityAttributes();
	});

	// DONOT REMOVE THIS, HANDLES POSITIONING OF OVERLAY
	/* const renderActivator = (node: Node) => {
		forceUpdatePosition?.();
	}; */
</script>

{#snippet portalMarkup()}
	{#if activatorNode && isDisplayed && active}
		<Portal idPrefix="popover">
			<PopoverOverlay
				bind:overlayRef
				bind:forceUpdatePosition
				{id}
				activator={activatorNode}
				{preferInputActivator}
				onClose={handleClose}
				{active}
				{fixed}
				{zIndexOverride}
				{...rest}
			>
				{@render children?.()}
			</PopoverOverlay>
		</Portal>
	{/if}
{/snippet}

<svelte:element this={activatorWrapper}>
	<div bind:this={activatorContainer}>
		{@render trigger?.()}
	</div>

	{@render portalMarkup()}
</svelte:element>
