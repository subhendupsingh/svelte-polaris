<script lang='ts'>
    import { setContext, type Snippet } from 'svelte';
    import { SCROLL_CONTEXT_KEY } from '$utilities/index-table/context.js';
    import type { ScrollContextType } from '$utilities/index-table/context.js';

    let { children, value }: { children?: Snippet, value: ScrollContextType } = $props();

    setContext(SCROLL_CONTEXT_KEY, value)
</script>

{@render children?.()}