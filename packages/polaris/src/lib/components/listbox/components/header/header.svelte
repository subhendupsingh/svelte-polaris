<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useSection } from '../section/hooks.js';
	import Box from '$lib/components/box/box.svelte';
	import Text from '$lib/components/text/text.svelte';
	import { useContext } from '$utilities/contexts.js';
	import { SECTION_CONTEXT_KEY } from '../section/types.js';
	import { isSnippet, isString } from '$utilities/is-svelte-component.js';

	let { children }: { children?: Snippet | string } = $props();
	let sectionContext = useContext<string | null>(SECTION_CONTEXT_KEY);
	let sectionId = $derived(sectionContext?.() || '');
</script>

<div aria-hidden={true} id={sectionId}>
	<Box
		paddingBlockStart="200"
		paddingInlineStart="400"
		paddingBlockEnd="200"
		paddingInlineEnd="400"
	>
		{#if isString(children)}
			<Text as="span" variant="headingSm" tone="subdued">
				{children}
			</Text>
		{:else}
			<Text as="span" variant="headingSm" tone="subdued">
				{@render children?.()}
			</Text>
		{/if}
	</Box>
</div>
