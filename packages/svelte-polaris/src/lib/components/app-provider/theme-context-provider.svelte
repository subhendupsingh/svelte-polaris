<script lang='ts'>
	import { THEME_CONTEXT_KEY } from "$utilities/use-theme.js";
	import type { Theme } from "@shopify/polaris-tokens";
	import { setContext, type Snippet } from "svelte";

    let { value, children }: { value: Theme, children?: Snippet } = $props();
    
    setContext(THEME_CONTEXT_KEY, () => value);
</script>

{@render children?.()}