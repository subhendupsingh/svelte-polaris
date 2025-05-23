<script lang='ts'>
	import { setContext, type Snippet } from 'svelte';
    import { INDEX_ROW_CONTEXT_KEY } from '$utilities/index-provider/hooks.js';
    import type { IndexRowContextType } from '$utilities/index-provider/context.js';

    let { children, value }: { children?: Snippet, value: IndexRowContextType } = $props();

    setContext(INDEX_ROW_CONTEXT_KEY, value)
</script>

{@render children?.()}