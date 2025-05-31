<script lang="ts">
	import { setContext } from 'svelte';
	import { STICKY_MANAGER_CONTEXT_KEY } from '$lib/utilities/sticky-manager/context.js';
	import { type Snippet } from 'svelte';
	import type { StickyManager } from '$utilities/sticky-manager/sticky-manager.js';

	let { children, value }: { children?: Snippet, value: StickyManager } = $props();

	setContext(STICKY_MANAGER_CONTEXT_KEY, () => value);
</script>

{#if children}
	{@render children()}
{/if}