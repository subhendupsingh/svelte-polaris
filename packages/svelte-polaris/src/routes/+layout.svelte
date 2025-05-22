<script lang="ts">
	import PolarisStyles from '$lib/components/polaris-styles.svelte';
	import MediaQueryProvider from '$lib/components/app-provider/app-provider.svelte';
	import PortalscontextProvider from '$lib/components/app-provider/portalscontext-provider.svelte';
	import EphemeralPresenceManager from '$lib/components/app-provider/ephemeral-presence-manager.svelte';
	let { children } = $props();
</script>

<PolarisStyles />

<MediaQueryProvider>
	<PortalscontextProvider>
		<EphemeralPresenceManager>
			{@render children()}
		</EphemeralPresenceManager>
	</PortalscontextProvider>
</MediaQueryProvider>
