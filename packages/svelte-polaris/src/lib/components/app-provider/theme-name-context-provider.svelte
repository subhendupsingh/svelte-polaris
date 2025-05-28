<script lang='ts'>
    import { THEME_NAME_CONTEXT_KEY } from "$utilities/use-theme.js";
	import type { ThemeName } from "@shopify/polaris-tokens";
    import { setContext, type Snippet } from "svelte";

    let { children, value }: { children?: Snippet, value: ThemeName } = $props();

    setContext(THEME_NAME_CONTEXT_KEY, () => value);
</script>

{@render children?.()}