<script lang='ts'>
    import BlockStack from '$lib/components/block-stack/block-stack.svelte';
    import type { FormLayoutProps } from './types.js';
    let { children }: FormLayoutProps = $props();
</script>

<BlockStack gap="400">
    {@render children?.()}
</BlockStack>
