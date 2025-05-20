<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import type { ActionListSection, MenuGroupDescriptor } from '$utilities/types.js';
	import styles from './action-menu.module.css';
	import Actions from './components/actions/actions.svelte';
	import RollupActions from './components/rollup-actions/rollup-actions.svelte';
	import type { ActionMenuProps } from './types.js';
	let {
		actions = [],
		groups = [],
		rollup,
		rollupActionsLabel,
		onActionRollup
	}: ActionMenuProps = $props();

	function convertGroupToSection({
		title,
		actions,
		disabled
	}: MenuGroupDescriptor): ActionListSection {
		return {
			title,
			items: actions.map((action) => ({
				...action,
				disabled: disabled || action.disabled
			}))
		};
	}

	const actionMenuClassNames = $derived(classNames(styles.ActionMenu, rollup && styles.rollup));
	const rollupSections = $derived(groups.map((group) => convertGroupToSection(group)));
</script>

{#if actions.length > 0 || groups.length > 0}
	<div class={actionMenuClassNames}>
		{#if rollup}
			<RollupActions
				accessibilityLabel={rollupActionsLabel}
				items={actions}
				sections={rollupSections}
			/>
		{:else}
			<Actions {actions} {groups} {onActionRollup} />
		{/if}
	</div>
{/if}
