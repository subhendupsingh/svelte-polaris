<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import styles from './description-list.module.css';
	import type { DescriptionListProps } from './types.js';
	import Text from '$lib/components/text/text.svelte';

	let { items, gap = 'loose' }: DescriptionListProps = $props();

	const className = $derived(
		classNames(styles.DescriptionList, gap === 'tight' && styles.spacingTight)
	);
</script>

<dl class={className}>
	{#each items as { term, description }, index}
		<dt class={styles.Term}>
			<Text as="span" variant="headingSm">
				{#if typeof term === 'string'}
					{term}
				{:else}
					{@render term()}
				{/if}
			</Text>
		</dt>
		<dd class={styles.Description}>
			{#if typeof description === 'string'}
				{description}
			{:else}
				{@render description()}
			{/if}
		</dd>
	{/each}
</dl>
