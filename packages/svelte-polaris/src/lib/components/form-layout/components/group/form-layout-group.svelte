<script lang="ts">
	import BlockStack from '$lib/components/block-stack/block-stack.svelte';
	import Box from '$lib/components/box/box.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import Text from '$lib/components/text/text.svelte';
	import type { GroupProps } from '../../types.js';

	const id = $props.id();
	let helpTextElement = null;
	let titleElement = null;
	let helpTextId: undefined | string = $derived(`${id}-help-text`);
	let titleId: undefined | string = $derived(`${id}-title`);

	let { children, condensed, title, helpText }: GroupProps = $props();
</script>

{#snippet helpTextMarkup()}
	{#if helpText}
		<Box id={helpTextId} color="text-secondary">
			{#if typeof helpText === 'string'}
				{helpText}
			{:else}
				{@render helpText()}
			{/if}
		</Box>
	{/if}
{/snippet}

{#snippet titleMarkup()}
	{#if title}
		<Text as="p" id={titleId}>
			{title}
		</Text>
	{/if}
{/snippet}

<BlockStack role="group" gap="200">
	{@render titleMarkup()}
	<InlineStack gap="300">{@render children?.()}</InlineStack>
	{@render helpTextMarkup()}
</BlockStack>
