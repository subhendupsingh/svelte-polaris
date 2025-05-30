<script lang='ts'>
    import { setContext, type Snippet } from 'svelte';
    import { COMBOBOX_LIST_BOX_OPTION_CONTEXT_KEY, type ComboboxListboxOptionType } from '$utilities/combobox/types.js';
    let { children, value }: { children?: Snippet, value: ComboboxListboxOptionType } = $props();
    setContext(COMBOBOX_LIST_BOX_OPTION_CONTEXT_KEY, () => value);
</script>
{@render children?.()}