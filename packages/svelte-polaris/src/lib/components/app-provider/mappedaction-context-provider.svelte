<script lang='ts'>
	import { MAPPED_ACTION_CONTEXT_KEY, type MappedActionContextType } from '$utilities/listbox/types.js';
	import { setContext, type Snippet } from 'svelte';

    let { value, children }: { value: MappedActionContextType; children?: Snippet } = $props();
    
    setContext<MappedActionContextType>(MAPPED_ACTION_CONTEXT_KEY, value);
</script>

{@render children?.()}