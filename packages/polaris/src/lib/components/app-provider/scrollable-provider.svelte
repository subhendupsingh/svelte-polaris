<script lang="ts">
	import { setContext } from 'svelte';
	import { SCROLLABLE_CONTEXT_KEY, type ScrollToPositionFn } from '$lib/utilities/contexts.js'; // Assuming you put the key in lib
	import { type Snippet } from 'svelte';
	import { prefersReducedMotion } from '../scrollable/types.js';

	let { children }: { children?: Snippet } = $props();

	let scrollElement: HTMLElement | undefined;

	const scrollTo = (scrollY: number, options: ScrollToOptions = {}) => {
		const optionsBehavior = options.behavior || 'smooth';
		const behavior = prefersReducedMotion() ? 'auto' : optionsBehavior;
		scrollElement?.scrollTo({ top: scrollY, behavior });
	};

	// This makes the `scrollTo` function available to all descendant components
	setContext<ScrollToPositionFn>(SCROLLABLE_CONTEXT_KEY, scrollTo);
</script>

<div bind:this={scrollElement}>
	{#if children}
		{@render children()}
	{/if}
</div>
