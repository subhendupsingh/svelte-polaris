<script lang="ts">
	import PolarisStyles from '$lib/components/polaris-styles.svelte';
	import MediaQueryProvider from '$lib/components/app-provider/app-provider.svelte';
	let { children } = $props();
</script>

<PolarisStyles />

<MediaQueryProvider>
	{@render children()}
</MediaQueryProvider>
