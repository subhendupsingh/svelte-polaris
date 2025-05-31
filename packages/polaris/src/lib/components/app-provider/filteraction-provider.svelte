<script lang="ts">
	import { setContext } from 'svelte'; // [cite: 199]
	import type { Snippet } from 'svelte'; // For typing the children snippet [cite: 560]
	import { FILTER_ACTIONS_CONTEXT_KEY } from './types.js';

	// Define the props for this provider component
	interface Props {
		filterActions: boolean;
		children: Snippet; // In Svelte 5, children/slots are passed as snippets [cite: 560, 561]
	}

	const { filterActions, children }: Props = $props(); // [cite: 449, 470, 485]

	// Provide the 'filterActions' value using the defined context key.
	// The 'filterActions' prop itself is reactive if passed from a reactive source.
	setContext(FILTER_ACTIONS_CONTEXT_KEY, () => filterActions); // [cite: 200]
</script>

{@render children()}