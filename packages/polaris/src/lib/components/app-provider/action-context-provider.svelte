<script lang='ts'>
	import { ACTION_CONTEXT_KEY } from "$utilities/listbox/types.js";
	import { setContext } from "svelte";
	import { type Snippet } from "svelte";

    let { children, value }: { children?: Snippet, value?: boolean } = $props();
    
    setContext(ACTION_CONTEXT_KEY, () => value || false);
</script>

{@render children?.()}