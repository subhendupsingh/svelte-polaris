<script lang="ts">
	import ActionList from '$lib/components/action-list/action-list.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Popover from '$lib/components/popover/popover.svelte';
	import { useToggle } from '$lib/use/use-toggle.svelte.js';
	import styles from './rollup-actions.module.css';
	import type { RollupActionsProps } from './types.js';
	import MenuHorizontalIcon from '@shopify/polaris-icons/dist/svg/MenuHorizontalIcon.svg?component';

	let { accessibilityLabel, items = [], sections = [] }: RollupActionsProps = $props();
	const { value: rollupOpen, toggle: toggleRollupOpen } = useToggle(false);
</script>

{#if items.length > 0 || sections.length > 0}
	{#snippet activatorMarkup(props: any)}
		<div class={styles.RollupActivator}>
			<Button
				icon={MenuHorizontalIcon}
				accessibilityLabel="View actions"
				onClick={toggleRollupOpen}
				{...props}
			/>
		</div>
	{/snippet}

	<Popover
		active={rollupOpen}
		preferredAlignment="end"
		onClose={toggleRollupOpen}
		hideOnPrint>
		{#snippet activator({props})}
			{@render activatorMarkup(props)}
		{/snippet}
		<ActionList {items} {sections} onActionAnyItem={toggleRollupOpen} />
	</Popover>
{/if}
