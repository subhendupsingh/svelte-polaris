<script lang="ts">
	import ActionList from '$lib/components/action-list/action-list.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Popover from '$lib/components/popover/index.js';
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import styles from './rollup-actions.module.css';
	import type { RollupActionsProps } from './types.js';
	import MenuHorizontalIcon from '@shopify/polaris-icons/dist/svg/MenuHorizontalIcon.svg?component';

	let { accessibilityLabel, items = [], sections = [] }: RollupActionsProps = $props();
	const rollupOpen = new UseToggle(false);
	const toggleRollupOpen = rollupOpen.toggle;
</script>

{#if items.length > 0 || sections.length > 0}
	{#snippet activatorMarkup()}
		<div class={styles.RollupActivator}>
			<Button
				icon={MenuHorizontalIcon}
				accessibilityLabel="View actions"
				onClick={toggleRollupOpen}
			/>
		</div>
	{/snippet}

	<Popover
		active={rollupOpen.value}
		preferredAlignment="right"
		onClose={toggleRollupOpen}
		hideOnPrint>
		{#snippet trigger()}
			{@render activatorMarkup()}
		{/snippet}
		<ActionList {items} {sections} onActionAnyItem={toggleRollupOpen} />
	</Popover>
{/if}
