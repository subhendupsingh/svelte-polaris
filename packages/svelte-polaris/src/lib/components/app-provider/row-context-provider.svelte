<script lang='ts'>
    import { setContext, type Snippet } from 'svelte';
    import { ROW_CONTEXT_KEY } from '$utilities/index-table/context.js';
    import type { RowContextType } from '$utilities/index-table/context.js';

    let { children, value }: { children?: Snippet, value: RowContextType } = $props();

    setContext(ROW_CONTEXT_KEY, value)
</script>

{@render children?.()}
