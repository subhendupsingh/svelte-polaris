<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useSection } from '../section/hooks.js';
	import Box from '$lib/components/box/box.svelte';
	import Text from '$lib/components/text/text.svelte';

	let { children }: { children?: Snippet | string } = $props();
	const sectionId = useSection() || '';
</script>

<div aria-hidden={true} id={sectionId}>
	{#if typeof children === 'string'}
		<Box
			paddingBlockStart="200"
			paddingInlineStart="400"
			paddingBlockEnd="200"
			paddingInlineEnd="400"
		>
			<Text as="span" variant="headingSm" tone="subdued">
				{children}
			</Text>
		</Box>
	{/if}
</div>
