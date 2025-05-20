<script lang="ts">
	import type { MenuGroupDescriptor } from '$utilities/types.js';
	import { onDestroy, onMount } from 'svelte';
	import SecondaryAction from '../../../secondary-action/secondary-action.svelte';
	import styles from '../../actions.module.css';
	import { ACTION_SPACING, type ActionsMeasurerProps } from './types.js';
	import { browser } from '$app/environment';

	let {
		actions = [],
		groups = [],
		handleMeasurement: handleMeasurementProp
	}: ActionsMeasurerProps = $props();

	let defaultRollupGroup: MenuGroupDescriptor = {
		title: 'More actions',
		actions: []
	};

	const handleMeasurement = (containerNode: HTMLDivElement) => {
		const performMeasurement = () => {
			if (!containerNode) {
				return;
			}

			const containerWidth = containerNode.offsetWidth;
			const hiddenActionNodes = containerNode.children;
			const hiddenActionNodesArray = Array.from(hiddenActionNodes);
			const hiddenActionsWidths = hiddenActionNodesArray.map((node) => {
				const buttonWidth = Math.ceil(node.getBoundingClientRect().width);
				return buttonWidth + ACTION_SPACING;
			});
			const disclosureWidth = hiddenActionsWidths.pop() || 0;
			handleMeasurementProp({
				containerWidth,
				disclosureWidth,
				hiddenActionsWidths
			});
		};

		performMeasurement();

		const observer = new ResizeObserver((entries) => {
			// We are observing containerNode, so entries[0] should be it.
			if (entries && entries[0]) {
				const newWidth = entries[0].contentRect.width;
				performMeasurement();
			}
		});

		observer.observe(containerNode);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	};
</script>

{#snippet activator()}
	<SecondaryAction disclosure>{defaultRollupGroup.title}</SecondaryAction>
{/snippet}

{#snippet actionsMarkup()}
	{#each actions as action}
		{@const { content, onAction, ...rest } = action}

		<SecondaryAction onClick={onAction} {...rest}>
			{content}
		</SecondaryAction>
	{/each}
{/snippet}

{#snippet groupsMarkup()}
	{#each groups as group}
		{@const { title, icon } = group}

		<SecondaryAction disclosure {icon}>
			{title}
		</SecondaryAction>
	{/each}
{/snippet}

<div class={styles.ActionsLayoutMeasurer} use:handleMeasurement>
	{@render actionsMarkup()}
	{@render groupsMarkup()}
	{@render activator()}
</div>
