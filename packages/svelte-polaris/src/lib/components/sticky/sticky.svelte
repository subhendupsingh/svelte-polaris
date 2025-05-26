<script lang="ts">
	import { useContext } from '$utilities/contexts.js';
	import { STICKY_MANAGER_CONTEXT_KEY } from '$utilities/sticky-manager/context.js';
	import type { StickyManager } from '$utilities/sticky-manager/sticky-manager.js';
	import StickyInner from './sticky-inner.svelte';
	import type { StickyProps } from './types.js';
	//const stickyManager = useStickyManager();
	const stickyManagerContext = useContext<StickyManager>(STICKY_MANAGER_CONTEXT_KEY)
	let props: StickyProps = $props();
</script>

<StickyInner {...props} stickyManager={stickyManagerContext} />