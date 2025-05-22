<script lang="ts">
	import PositionedOverlay from '$lib/components/positioned-overlay/positioned-overlay.svelte';
	import type { OverlayDetails } from '$lib/components/positioned-overlay/types.js';
	import { applyStyles, classNames } from '$utilities/css.js';
	import { Rect } from '$utilities/geometry.js';
	import { layer } from '$utilities/shared.js';
	import styles from './tooltip-overlay.module.css';
	import type { TooltipOverlayProps } from './types.js';
	let {
		active,
		activator,
		preferredPosition = 'above',
		preventInteraction,
		id,
		children,
		accessibilityLabel,
		width,
		padding,
		borderRadius,
		zIndexOverride,
		instant
	}: TooltipOverlayProps = $props();

	let overlayDetails = $state<OverlayDetails>({
		activatorRect: new Rect({}),
		left: undefined,
		right: undefined,
		desiredHeight: 0,
		positioning: 'below',
		measuring: false,
		chevronOffset: 0
	});

	const tooltipContainerClassName = $derived(
		classNames(
			styles.TooltipOverlay,
			overlayDetails.measuring && styles.measuring,
			!overlayDetails.measuring && styles.measured,
			instant && styles.instant,
			overlayDetails.positioning === 'above' && styles.positionedAbove
		)
	);

	const contentClassName = $derived(classNames(styles.Content, width && styles[width]));

	const contentStyles = $derived(
		overlayDetails.measuring ? undefined : { minHeight: overlayDetails.desiredHeight }
	);

	const style = $derived({
		'--pc-tooltip-chevron-x-pos': `${overlayDetails.chevronOffset}px`,
		'--pc-tooltip-border-radius': borderRadius
			? `var(--p-border-radius-${borderRadius})`
			: undefined,
		'--pc-tooltip-padding':
			padding && padding === 'default'
				? 'var(--p-space-100) var(--p-space-200)'
				: `var(--p-space-${padding})`
	});
</script>

{#snippet tailUpPaths()}
	<path
		d="M18.829 8.171 11.862.921A3 3 0 0 0 7.619.838L0 8.171h1.442l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557h1.387Z"
		fill="var(--p-color-tooltip-tail-up-border)"
	/>
	<path
		d="M17.442 10.171h-16v-2l6.87-6.612a2 2 0 0 1 2.83.055l6.3 6.557v2Z"
		fill="var(--p-color-bg-surface)"
	/>
{/snippet}

{#snippet tailDownPaths()}
	<path
		d="m0 2 6.967 7.25a3 3 0 0 0 4.243.083L18.829 2h-1.442l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2H0Z"
		fill="var(--p-color-tooltip-tail-down-border)"
	/>
	<path
		d="M1.387 0h16v2l-6.87 6.612a2 2 0 0 1-2.83-.055L1.387 2V0Z"
		fill="var(--p-color-bg-surface)"
	/>
{/snippet}

{#snippet tooltipContent()}
	{@const tooltipStyles = { ...style, ...contentStyles }}
	<div style={applyStyles(tooltipStyles)} class={tooltipContainerClassName} {...layer.props}>
		<svg class={styles.Tail} width="19" height="11" fill="none">
            {#if overlayDetails.positioning === 'above'}
                {@render tailDownPaths()}
            {:else}
                {@render tailUpPaths()}
            {/if}
		</svg>
		<div
			{id}
			role="tooltip"
			class={contentClassName}
			style={applyStyles(contentStyles)}
			aria-label={accessibilityLabel ? `Tooltip: ${accessibilityLabel}` : undefined}
		>
			{@render children?.()}
		</div>
	</div>
{/snippet}

{#if active}
	<PositionedOverlay
		bind:overlayDetails
		{active}
		{activator}
		preferredAlignment="center"
		{preferredPosition}
		{preventInteraction}
		{zIndexOverride}>
		{@render tooltipContent?.()}
	</PositionedOverlay>
{/if}
