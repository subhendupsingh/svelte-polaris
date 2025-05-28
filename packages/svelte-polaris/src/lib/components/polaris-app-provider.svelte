<script lang='ts'>
    import MediaQueryProvider from '$lib/components/app-provider/app-provider.svelte';
	import EphemeralPresenceManager from '$lib/components/app-provider/ephemeral-presence-manager.svelte';
	import StickymanagerProvider from '$lib/components/app-provider/stickymanager-provider.svelte';
    import { StickyManager } from '$utilities/sticky-manager/sticky-manager.js';
	import PortalsManager from '$lib/components/portals-manager/portals-manager.svelte';
    import PolarisStyles from '$lib/components/polaris-styles.svelte';
	import { onMount } from 'svelte';

    let { children } = $props();
    const stickyManager = new StickyManager();

    onMount(() => {
		stickyManager?.setContainer(document);
	});
</script>

<PolarisStyles />

<StickymanagerProvider value={stickyManager}>
	<MediaQueryProvider>
		<PortalsManager>
			<EphemeralPresenceManager>
				{@render children()}
			</EphemeralPresenceManager>
		</PortalsManager>
	</MediaQueryProvider>
</StickymanagerProvider>