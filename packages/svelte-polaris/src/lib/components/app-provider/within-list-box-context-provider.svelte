<script lang='ts'>
    import { setContext, type Snippet } from 'svelte';
    import { WITHIN_LISTBOX_CONTEXT_KEY } from '$utilities/listbox/types.js';
    
    let { children, value }: { children?: Snippet, value: boolean } = $props();
    setContext(WITHIN_LISTBOX_CONTEXT_KEY, value);
</script>
{@render children?.()}