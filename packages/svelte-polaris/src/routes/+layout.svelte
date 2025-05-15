<script lang="ts">
	import PolarisStyles from '$lib/components/polaris-styles.svelte';
	let { children } = $props();
</script>

<PolarisStyles />
{@render children()}
