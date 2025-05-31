<script lang='ts'>
    import { setContext, type Snippet } from 'svelte';
    import { ROW_HOVERED_CONTEXT_KEY } from '$utilities/index-table/context.js';

    let { children, value }: { children?: Snippet, value: boolean } = $props();

    setContext(ROW_HOVERED_CONTEXT_KEY, () => value)
</script>

{@render children?.()}