<script lang='ts'>
    import { setContext, type Snippet } from 'svelte';
    import { INDEX_SELECTION_CHANGE_CONTEXT_KEY } from '$utilities/index-provider/hooks.js';
    import type { HandleSelectionChange } from '$utilities/index-provider/types.js';

    let { children, value }: { children?: Snippet, value: HandleSelectionChange } = $props();

    setContext(INDEX_SELECTION_CHANGE_CONTEXT_KEY, value)
</script>

{@render children?.()}