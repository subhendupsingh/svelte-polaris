<script lang="ts">
	import { onMount } from 'svelte';
	import type { BulkActionButtonProps } from './types.js';
	import Button from '$lib/components/button/button.svelte';
	import MenuHorizontalIcon from '@shopify/polaris-icons/dist/svg/MenuHorizontalIcon.svg?component';
	import styles from '../../bulk-actions.module.css';
	import Tooltip from '$lib/components/tooltip/tooltip.svelte';
	import Indicator from '$lib/components/indicator/indicator.svelte';

	let {
		handleMeasurement,
		url,
		external,
		onAction,
		content,
		disclosure,
		accessibilityLabel,
		disabled,
		destructive,
		indicator,
		showContentInButton,
		size
	}: BulkActionButtonProps = $props();

	let bulkActionButton = $state<HTMLDivElement | null>(null);

	onMount(() => {
		if (handleMeasurement && bulkActionButton) {
			const width = bulkActionButton.getBoundingClientRect().width;
			handleMeasurement(width);
		}
	});

	const isActivatorForMoreActionsPopover = $derived(disclosure && !showContentInButton);
	const buttonContent = $derived(isActivatorForMoreActionsPopover ? undefined : content);
</script>

{#snippet buttonMarkup()}
	<Button
		{external}
		{url}
		accessibilityLabel={isActivatorForMoreActionsPopover ? content : accessibilityLabel}
		tone={destructive ? 'critical' : undefined}
		disclosure={disclosure && showContentInButton}
		onClick={onAction}
		{disabled}
		{size}
		icon={isActivatorForMoreActionsPopover ? MenuHorizontalIcon : undefined}
	>
		{buttonContent}
	</Button>
{/snippet}

<div class={styles.BulkActionButton} bind:this={bulkActionButton}>
	{#if isActivatorForMoreActionsPopover && content}
		<Tooltip {content} preferredPosition="below">
			{@render buttonMarkup()}
		</Tooltip>
	{:else}
		{@render buttonMarkup()}
	{/if}

	{#if indicator}
		<Indicator />
	{/if}
</div>
