<script lang="ts">
	import { classNames, variationName } from '$utilities/css.js';
	import styles from './tag.module.css';
	import type { TagProps } from './types.js';
	import Text from '$lib/components/text/text.svelte';
	import { handleMouseUpByBlurring } from '$utilities/focus.js';
	import Icon from '../icon/icon.svelte';
	import XSmallIcon from '@shopify/polaris-icons/dist/svg/XSmallIcon.svg?component';
	let {
		children,
		disabled = false,
		onClick,
		onRemove,
		accessibilityLabel,
		url,
		size
	}: TagProps = $props();

	const segmented = $derived(onRemove && url);
	const className = $derived(
		classNames(
			styles.Tag,
			disabled && styles.disabled,
			onClick && styles.clickable,
			onRemove && styles.removable,
			url && !disabled && styles.linkable,
			segmented && styles.segmented,
			size && styles[variationName('size', size)]
		)
	);
</script>

{#snippet tagText()}
	<Text as="span" variant="bodySm" truncate>
		<span
			title={accessibilityLabel
				? accessibilityLabel
				: typeof children === 'string'
					? children
					: undefined}
			class={styles.Text}
		>
			{@render children?.()}
		</span>
	</Text>
{/snippet}

{#snippet removeButton()}
	{#if onRemove}
		<button
			type="button"
			class={classNames(styles.Button, segmented && styles.segmented)}
			onclick={onRemove}
			onmouseup={handleMouseUpByBlurring}
			{disabled}
		>
			<Icon source={XSmallIcon} />
		</button>
	{/if}
{/snippet}

{#snippet tagContent()}
	{#if url && !disabled}
		<a class={classNames(styles.Link, segmented && styles.segmented)} href={url}>
			{@render tagText()}
		</a>
	{:else}
		{@render tagText()}
	{/if}
{/snippet}

{#if onClick}
	<button
		type="button"
		class={className}
		{disabled}
		onclick={onClick}
		aria-label={accessibilityLabel}
	>
		{@render tagText()}
	</button>
{:else}
	<span class={className} aria-disabled={disabled}>
		{@render tagContent()}
		{#if size === 'large'}
			<span class={styles.overlay}></span>
		{/if}
		{@render removeButton()}
	</span>
{/if}
