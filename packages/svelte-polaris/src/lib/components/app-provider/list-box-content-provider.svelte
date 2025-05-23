<script lang='ts'>
    import { LISTBOX_CONTEXT_KEY, type ListboxContextType } from '$utilities/listbox/types.js';
    import { setContext } from 'svelte';
    import { type Snippet } from 'svelte';
    
    let { children, value }: { children?: Snippet, value?: ListboxContextType } = $props();
    setContext<ListboxContextType|undefined>(LISTBOX_CONTEXT_KEY, value);
</script>

{@render children?.()}