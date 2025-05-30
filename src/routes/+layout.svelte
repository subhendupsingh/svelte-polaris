<script lang="ts">
	import { PolarisAppProvider } from '$lib/index.js';
	let { children } = $props();
</script>

<PolarisAppProvider>
	{@render children()}
</PolarisAppProvider>

