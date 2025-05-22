<script lang="ts">
	import PolarisStyles from '$lib/components/polaris-styles.svelte';
	import MediaQueryProvider from '$lib/components/app-provider/app-provider.svelte';
	import PortalscontextProvider from '$lib/components/app-provider/portalscontext-provider.svelte';
	let { children } = $props();
</script>

<PolarisStyles />

<MediaQueryProvider>
	<PortalscontextProvider>
		{@render children()}
	</PortalscontextProvider>
</MediaQueryProvider>
