<script lang='ts'>
	import ButtonFrom from '../button/button-from.svelte';
	import InlineStack from '../inline-stack/inline-stack.svelte';
    import styles from './page-actions.module.css';
    import type { PageActionsProps } from './types.js';
    let { primaryAction, secondaryActions }: PageActionsProps = $props();
</script>

<div class={styles.PageActions}>
    <InlineStack gap="200" align="end">
        {#if primaryAction}
            {#if typeof primaryAction === 'function'}
                {@render primaryAction?.()}
            {:else}
                <ButtonFrom action={primaryAction} overrides={{ variant: 'primary' }} />
            {/if}
        {/if}
        {#if secondaryActions}
            {#if typeof secondaryActions === 'function'}
                {@render secondaryActions?.()}
            {:else}
                {#each secondaryActions as action}
                    <ButtonFrom action={action} overrides={{ variant: 'secondary' }} />
                {/each}
            {/if}
        {/if}
    </InlineStack>
</div>