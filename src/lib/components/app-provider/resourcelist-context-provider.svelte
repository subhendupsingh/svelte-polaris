<script lang='ts'>
	import type { ResourceListContextType } from "$utilities/types.js";
	import { setContext, type Snippet } from "svelte";
	import { RESOURCE_LIST_CONTEXT_KEY } from "./types.js";

    let { children, value }: { children?: Snippet, value: ResourceListContextType } = $props();

    setContext(RESOURCE_LIST_CONTEXT_KEY, () => value);
</script>

{@render children?.()}