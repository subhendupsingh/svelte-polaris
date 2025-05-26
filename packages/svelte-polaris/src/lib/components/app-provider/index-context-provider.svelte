<script lang='ts'>
	import { INDEX_CONTEXT_KEY } from "$utilities/index-provider/hooks.js";
	import { setContext, type Snippet } from "svelte";
    import type { IndexContextType } from "$utilities/index-provider/context.js";

    let { children, value }: { children?: Snippet, value: IndexContextType } = $props();

    setContext(INDEX_CONTEXT_KEY, () => value)
</script>

{@render children?.()}