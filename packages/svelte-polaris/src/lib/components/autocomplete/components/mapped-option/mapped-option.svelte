<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import type { OptionDescriptor } from '$utilities/types.js';
	import type { Snippet } from 'svelte';
	import styles from './mapped-option.module.css';
	import Listbox from '$lib/components/listbox/index.js';

	type MappedOption = OptionDescriptor & {
		selected: boolean;
		singleSelection: boolean;
	};

	let { label, value, disabled, media, selected, singleSelection }: MappedOption = $props();

	const mediaClassNames = $derived(
		classNames(
			styles.Media,
			disabled && styles.disabledMedia,
			singleSelection && styles.singleSelectionMedia
		)
	);

	const isSnippet = (media: any): media is Snippet => {
		return typeof media === 'function';
	};

	const accessibilityLabel = typeof label === 'string' ? label : undefined;
</script>

{#snippet mediaMarkup()}
	{#if media}
		<div class={mediaClassNames}>
			{#if isSnippet(media)}
				{@render media()}
			{:else}
				{media}
			{/if}
		</div>
	{/if}
{/snippet}

<Listbox.Option {accessibilityLabel} {selected} {value} {disabled}>
	<Listbox.TextOption {selected} {disabled}>
		<div class={styles.Content}>
			{@render mediaMarkup()}
			{label}
		</div>
	</Listbox.TextOption>
</Listbox.Option>
