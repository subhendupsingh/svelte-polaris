<script lang="ts">
	import { setContext, onMount } from 'svelte';
	import { MEDIA_QUERY_CONTEXT_KEY, type MediaQueryState } from './types.js';

	let mediaQueryState = $state<MediaQueryState>({ 
		isNavigationCollapsed: false, 
		// isMobile: false,
	});

	setContext(MEDIA_QUERY_CONTEXT_KEY, mediaQueryState);

	onMount(() => { 
		if (typeof window !== 'undefined' && window.matchMedia) {
			// Example: Define the media query for when navigation should be considered collapsed
			// This is just an example, adjust the query to your needs.
			const navigationQuery = window.matchMedia('(max-width: 768px)');

			// Function to update the state
			const updateNavigationState = () => {
				mediaQueryState.isNavigationCollapsed = navigationQuery.matches;
			};

			// Listen for changes
			navigationQuery.addEventListener('change', updateNavigationState);

			// Set initial state
			updateNavigationState();

			// Cleanup listener when the component is destroyed
			return () => {
				navigationQuery.removeEventListener('change', updateNavigationState);
			};
		}
	});

	// Get the children slot prop to render content wrapped by this provider
	let { children } = $props(); // [Source 470, 485, 560]
</script>

{@render children()} 