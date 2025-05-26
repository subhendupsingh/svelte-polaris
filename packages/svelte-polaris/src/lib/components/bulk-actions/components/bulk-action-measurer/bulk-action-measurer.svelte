<script lang="ts">
	import { instanceOfMenuGroupDescriptor } from '../../utilities.js';
	import BulkActionButton from '../bulk-action-button/bulk-action-button.svelte';
	import styles from '../../bulk-actions.module.css';
	import { ACTION_SPACING, type ActionsMeasurerProps } from './types.js';

	let {
		promotedActions = [],
		disabled,
		buttonSize,
		handleMeasurement: handleMeasurementProp
	}: ActionsMeasurerProps = $props();

	let containerNode = $state<HTMLDivElement | null>(null);
	const activatorLabel = 'More actions';

	const handleMeasurement = () => {
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

	$effect(() => {
		handleMeasurement();
	});

	$effect(() => {
		window.addEventListener('resize', handleMeasurement);
		return () => {
			window.removeEventListener('resize', handleMeasurement);
		};
	});
</script>

{#snippet activator()}
	<BulkActionButton disclosure content={activatorLabel} />
{/snippet}

{#snippet promotedActionsMarkup()}
	{#each promotedActions as action, index}
		{#if instanceOfMenuGroupDescriptor(action)}
			<BulkActionButton disclosure showContentInButton content={action.title} size={buttonSize} />
		{:else}
			<BulkActionButton {disabled} {...action} size={buttonSize} />
		{/if}
	{/each}
{/snippet}

<div class={styles.BulkActionsMeasurerLayout} bind:this={containerNode}>
	{@render promotedActionsMarkup()}
	{@render activator()}
</div>
