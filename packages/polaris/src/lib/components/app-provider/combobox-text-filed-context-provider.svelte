<script lang='ts'>
    import { setContext, type Snippet } from 'svelte';
    import { COMBOBOX_TEXT_FIELD_CONTEXT_KEY, type ComboboxTextFieldType } from '$utilities/combobox/types.js';
    let { children, value }: { children?: Snippet, value?: ComboboxTextFieldType } = $props();
    setContext(COMBOBOX_TEXT_FIELD_CONTEXT_KEY, () => value);
</script>
{@render children?.()}