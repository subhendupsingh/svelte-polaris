<script lang="ts">
	import type { EmptySearchResultProps } from './types.js';
	import Image from '../image/image.svelte';
	import Text from '../text/text.svelte';
	import BlockStack from '../block-stack/block-stack.svelte';
	let { title, description, withIllustration }: EmptySearchResultProps = $props();
	const altText = 'Empty search results';
</script>

{#snippet descriptionMarkup()}
	{#if description}
		<p>{description}</p>
	{/if}
{/snippet}

{#snippet illustrationMarkup()}
	{#if withIllustration}
		<Image alt={altText} source="empty-search.svg" draggable={false} />
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
