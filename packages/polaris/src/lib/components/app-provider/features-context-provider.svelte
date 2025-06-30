<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import { FEATURES_CONTEXT_KEY, type FeaturesConfig } from "./types.js";

    let { value, children }: { value?:  FeaturesConfig, children?: Snippet } = $props();
	setContext(FEATURES_CONTEXT_KEY, () => value);
</script>

{@render children?.()}
