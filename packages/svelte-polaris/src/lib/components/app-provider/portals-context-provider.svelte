<script lang="ts">
	import { PORTALS_MANAGER_CONTEXT_KEY } from '$lib/utilities/portals/types.js';
	import { setContext } from 'svelte';
	import { type Snippet } from 'svelte';
	import type { PortalsContainerElement } from '../popover/components/popover-overlay/types.js';

	let { container, children }: { container?: PortalsContainerElement; children: Snippet } =
		$props();

	setContext(PORTALS_MANAGER_CONTEXT_KEY, () => ({ container }));
</script>

{@render children?.()}
