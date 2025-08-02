<script lang="ts">
	import type { EmptySearchResultProps } from './types.js';
	import Text from '../text/text.svelte';
	import BlockStack from '../block-stack/block-stack.svelte';
	import EmptySearchIcon from './empty-search-icon.svelte';
	let { title, description, withIllustration }: EmptySearchResultProps = $props();
</script>

{#snippet descriptionMarkup()}
	{#if description}
		<p>{description}</p>
	{/if}
{/snippet}

{#snippet illustrationMarkup()}
	{#if withIllustration}
		<EmptySearchIcon size="30" />
	{/if}
{/snippet}

<BlockStack align="center">
	{@render illustrationMarkup()}
	<Text variant="headingLg" as="p">
		{title}
	</Text>
	<Text tone="subdued" as="span">
		{@render descriptionMarkup()}
	</Text>
</BlockStack>
