<script lang="ts">
	import styles from './connected.module.css';
	import type { ConnectedProps } from './types.js';
	import Item from './components/item/connected-item.svelte';
	let { children, left, right }: ConnectedProps = $props();
</script>

{#snippet leftConnectionMarkup()}
	{#if left}
		<Item position="left">{@render left()}</Item>
	{/if}
{/snippet}

{#snippet rightConnectionMarkup()}
	{#if right}
		<Item position="right">{@render right()}</Item>
	{/if}
{/snippet}

<div class={styles.Connected}>
    {@render leftConnectionMarkup()}
    <Item position="primary">{@render children?.()}</Item>
    {@render rightConnectionMarkup()}
</div>
