<script lang='ts'>
	import { SCROLLABLE_CONTEXT_KEY, useContext, type ScrollToPositionFn } from "$utilities/contexts.js";

    let anchorNode = $state<HTMLAnchorElement|undefined>()
    const id = $props.id();
    const scrollToPosition = useContext<ScrollToPositionFn>(SCROLLABLE_CONTEXT_KEY);
    let scrollToPositionFn = $derived(scrollToPosition())

    $effect(() => {
        if (!scrollToPositionFn || !anchorNode) {
            return;
        }
        
        scrollToPositionFn?.(anchorNode.offsetTop);
    })
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<!-- svelte-ignore a11y_missing_attribute -->
<a id={id} bind:this={anchorNode}></a>