<script lang="ts">
	import type { PortalsManagerProps } from './types.js';
	import PortalsContainer from './components/portals-container/portals-container.svelte';
	import PortalsContextProvider from '../app-provider/portals-context-provider.svelte';
	let { children, container }: PortalsManagerProps = $props();

	let contextContainer = $derived(container);
</script>

<PortalsContextProvider container={contextContainer}>
	{@render children?.()}
	{#if !container}
		<PortalsContainer bind:ref={contextContainer} />
	{/if}
</PortalsContextProvider>
