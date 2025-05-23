<script lang="ts">
	import Scrollable from '$lib/components/scrollable/scrollable.svelte';
	import { applyStyles, classNames } from '$utilities/css.js';
	import styles from '../../popover.module.css';
	import Section from '../section/section.svelte';
	import type { PaneProps } from './types.js';

	let {
		captureOverscroll = false,
		fixed,
		sectioned,
		children,
		height,
		maxHeight,
		minHeight,
		subdued,
		onScrolledToBottom
	}: PaneProps = $props();

	const className = $derived(
		classNames(
			styles.Pane,
			fixed && styles['Pane-fixed'],
			subdued && styles['Pane-subdued'],
			captureOverscroll && styles['Pane-captureOverscroll']
		)
	);

	const style = $derived({ height, maxHeight, minHeight });
</script>

{#snippet content()}
	{#if sectioned}
		<Section>
			{@render children?.()}
		</Section>
	{:else}
		{@render children?.()}
	{/if}
{/snippet}

{#if fixed}
	<div style={applyStyles(style)} class={className}>
		{@render content()}
	</div>
{:else}
	<Scrollable shadow class={className} {style} {onScrolledToBottom} scrollbarWidth="thin">
		{@render content()}
	</Scrollable>
{/if}
