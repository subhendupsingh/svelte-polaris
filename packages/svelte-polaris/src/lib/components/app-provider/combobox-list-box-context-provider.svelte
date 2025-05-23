<script lang='ts'>
    import { setContext, type Snippet } from 'svelte';
    import { COMBOBOX_LIST_BOX_CONTEXT_KEY, type ComboboxListboxType } from '$utilities/combobox/types.js';
    let { children, value }: { children?: Snippet, value: ComboboxListboxType } = $props();
    setContext<ComboboxListboxType>(COMBOBOX_LIST_BOX_CONTEXT_KEY, value);
</script>

{@render children?.()}
