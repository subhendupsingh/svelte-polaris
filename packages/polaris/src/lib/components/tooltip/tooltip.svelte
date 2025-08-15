<script lang="ts">
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import { findFirstFocusableNode } from '$utilities/focus.js';
	import { noop } from '$utilities/noop.js';
	import Portal from '../portal/portal.svelte';
	import TooltipOverlay from './components/tooltip-overlay/tooltip-overlay.svelte';
	import styles from './tooltip.module.css';
	import { HOVER_OUT_TIMEOUT, type TooltipProps } from './types.js';
	import Text from '$lib/components/text/text.svelte';
	import { classNames } from '$utilities/css.js';
	import { useContext } from '$utilities/contexts.js';
	import { EPHEMERAL_PRESENCE_MANAGER_CONTEXT_KEY, type EphemeralPresenceManagerContextType } from '../app-provider/types.js';

	let {
		children,
		content,
		dismissOnMouseOut,
		active: originalActive,
		hoverDelay,
		preferredPosition = 'above',
		activatorWrapper = 'span',
		accessibilityLabel,
		width = 'default',
		padding = 'default',
		borderRadius: borderRadiusProp,
		zIndexOverride,
		hasUnderline,
		persistOnClick = false,
		onOpen,
		onClose
	}: TooltipProps = $props();

	const borderRadius = $derived(borderRadiusProp || '200');

	const active = new UseToggle(Boolean(originalActive));
	const handleBlur = active.setFalse;
	const setActiveTrue = active.setTrue;

	const persist = new UseToggle(Boolean(originalActive) && Boolean(persistOnClick));
	const togglePersisting = persist.toggle;

	let activatorNode = $state<HTMLDivElement>();
	const useEphemeralPresenceManager = useContext<EphemeralPresenceManagerContextType>(EPHEMERAL_PRESENCE_MANAGER_CONTEXT_KEY)
	const { presenceList, addPresence, removePresence } = $derived(useEphemeralPresenceManager()!);
	const id = $props.id();
	let activatorContainer = $state<HTMLDivElement>();
	let mouseEntered = $state(false);
	let shouldAnimate = $state(Boolean(!originalActive));
	let hoverDelayTimeout = $state<NodeJS.Timeout | null>(null);
	let hoverOutTimeout = $state<NodeJS.Timeout | null>(null);

	const handleFocus = () => {
		if (originalActive !== false) {
			setActiveTrue();
		}
	};

	const handleOpen = () => {
		shouldAnimate = !presenceList.tooltip && !active.value;
		onOpen?.();
		addPresence('tooltip');
	};

	const handleClose = () => {
		onClose?.();
		shouldAnimate = false;
		hoverOutTimeout = setTimeout(() => {
			removePresence('tooltip');
		}, HOVER_OUT_TIMEOUT);
	};

	const handleKeyUp = (event: KeyboardEvent) => {
		if (event.key !== 'Escape') return;
		handleClose?.();
		handleBlur();
		persistOnClick && togglePersisting();
	};

	function setActivator(node: HTMLElement | null) {
		let activatorContainerRef: any = activatorContainer;
		if (node == null) {
			activatorContainerRef.current = null;
			activatorNode = undefined;
			return;
		}

		if (node.firstElementChild) {
			activatorNode = node.firstElementChild as HTMLDivElement;
		}

		activatorContainerRef = node;
	}

	function handleMouseEnter() {
		mouseEntered = true;
		if (hoverDelay && !presenceList.tooltip) {
			hoverDelayTimeout = setTimeout(() => {
				handleOpen();
				handleFocus();
			}, hoverDelay);
		} else {
			handleOpen();
			handleFocus();
		}
	}

	function handleMouseLeave() {
		if (hoverDelayTimeout) {
			clearTimeout(hoverDelayTimeout);
			hoverDelayTimeout = null;
		}

		mouseEntered = false;
		handleClose();
		if (!persist.value) {
			handleBlur();
		}
	}

	function handleMouseEnterFix() {
		!mouseEntered && handleMouseEnter();
	}

	const firstFocusable = $derived(
		activatorContainer ? findFirstFocusableNode(activatorContainer) : null
	);

	$effect(() => {
		const accessibilityNode = firstFocusable || activatorContainer;
		if (!accessibilityNode) return;

		accessibilityNode.tabIndex = 0;
		accessibilityNode.setAttribute('aria-describedby', id);
		accessibilityNode.setAttribute('data-polaris-tooltip-activator', 'true');

		return () => {
			if (hoverDelayTimeout) {
				clearTimeout(hoverDelayTimeout);
			}
			if (hoverOutTimeout) {
				clearTimeout(hoverOutTimeout);
			}
		};
	});

	$effect(() => {
		if (originalActive === false && active.value) {
			handleClose();
			handleBlur();
		}
	});

	const wrapperClassNames = $derived(
		classNames(
			activatorWrapper === 'div' && styles.TooltipContainer,
			hasUnderline && styles.HasUnderline
		)
	);
</script>

{#snippet portalMarkup()}
	{#if activatorNode}
		<Portal idPrefix="tooltip">
			<TooltipOverlay
				{id}
				{preferredPosition}
				activator={activatorNode}
				active={active.value}
				{accessibilityLabel}
				onClose={noop}
				preventInteraction={dismissOnMouseOut}
				{width}
				{padding}
				{borderRadius}
				{zIndexOverride}
				instant={!shouldAnimate}
			>
				<Text as="span" variant="bodyMd">
					{content}
				</Text>
			</TooltipOverlay>
		</Portal>
	{/if}
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
	this={activatorWrapper}
	class={wrapperClassNames}
	onfocus={() => {
		handleOpen();
		handleFocus();
	}}
	onblur={() => {
		originalActive === false;
		handleClose();
		handleBlur();

		if (persistOnClick) {
			togglePersisting();
		}
	}}
	onkeyup={handleKeyUp}
	onmouseleave={handleMouseLeave}
	onmouseover={handleMouseEnterFix}
	onmousedown={persistOnClick ? togglePersisting : undefined}
>
	<div bind:this={activatorContainer} use:setActivator>
		{@render children?.()}
	</div>
	{@render portalMarkup()}
</svelte:element>
