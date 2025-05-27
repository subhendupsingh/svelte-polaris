<script lang="ts">
	import { noop } from '$utilities/noop.js';
	import styles from '../../tabs.module.css';
	import Item from '../item/item.svelte';
	import type { ListProps } from './types.js';

	let { focusIndex, disclosureTabs, onClick = noop, onKeyPress = noop }: ListProps = $props();

	function handleKeyDown(event: KeyboardEvent) {
		const { key } = event;

		if (key === 'ArrowLeft' || key === 'ArrowRight') {
			event.preventDefault();
			event.stopPropagation();
		}
	}
</script>

{#snippet tabsMarkup()}
	{#each disclosureTabs as { id, content, ...tabProps }, index}
		<Item
			{...tabProps}
			{id}
			focused={index === focusIndex}
			onClick={onClick.bind(null, id)}
		>
			{content}
		</Item>
	{/each}
{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<ul class={styles.List} onkeydown={handleKeyDown} onkeyup={onKeyPress}>
    {@render tabsMarkup()}
</ul>
