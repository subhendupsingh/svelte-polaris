<script lang="ts">
	import { UseBreakpoints } from '$lib/use/use-breakpoints.svelte.js';
	import { useContext } from '$utilities/contexts.js';
	import type { ResourceListContextType } from '$utilities/types.js';
	import { RESOURCE_LIST_CONTEXT_KEY } from '../app-provider/types.js';
	import BaseResourceItem from './base-resource-item.svelte';
	import type { ResourceItemProps } from './types.js';
	const bp = $derived(new UseBreakpoints());
	let props: ResourceItemProps = $props();

	const context = $derived(useContext<ResourceListContextType>(RESOURCE_LIST_CONTEXT_KEY)?.() ?? {});
</script>

<BaseResourceItem
	{...props}
	breakpoints={bp.breakpoints}
	context={context}
/>
