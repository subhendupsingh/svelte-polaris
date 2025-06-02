<script lang='ts'>
    import { setContext, type Snippet } from "svelte";
	import { SECTION_CONTEXT_KEY } from "./types.js";
    let { children, value }: { children?: Snippet, value: string } = $props();
    setContext(SECTION_CONTEXT_KEY, () => value);
</script>

{@render children?.()}