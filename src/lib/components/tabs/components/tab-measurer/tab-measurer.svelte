<script lang="ts">
	import { onMount } from 'svelte';
	import type { TabMeasurerProps } from './types.js';
	import { noop } from '$utilities/noop.js';
	import styles from '../../tabs.module.css';
	import { classNames } from '$utilities/css.js';
	import Tab from '../tab/tab.svelte';

	let {
		selected,
		tabs,
		activator,
		tabToFocus,
		siblingTabHasFocus,
		handleMeasurement: handleMeasurementProp
	}: TabMeasurerProps = $props();

	let containerNode = $state<HTMLDivElement | null>(null);
	let animationFrame = $state<number | null>(null);
	const classname = $derived(classNames(styles.Tabs, styles.TabsMeasurer));

	const handleMeasurement = () => {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}

		animationFrame = requestAnimationFrame(() => {
			if (!containerNode) {
				return;
			}

			const containerWidth = containerNode.offsetWidth - 20 - 28;
			const hiddenTabNodes = containerNode.children;
			const hiddenTabNodesArray = Array.from(hiddenTabNodes);
			const hiddenTabWidths = hiddenTabNodesArray.map((node) => {
				const buttonWidth = Math.ceil(node.getBoundingClientRect().width);
				return buttonWidth + 4;
			});
			const disclosureWidth = hiddenTabWidths.pop() || 0;

			handleMeasurementProp({
				containerWidth,
				disclosureWidth,
				hiddenTabWidths
			});
		});
	};

	/* $effect(() => {
		handleMeasurement();
	}); */

	onMount(() => {
		handleMeasurement();
	});
</script>

{#snippet tabsMarkup()}
	{#each tabs as tab, index}
		<Tab
			measuring
			id={`${tab.id}Measurer`}
			{siblingTabHasFocus}
			focused={index === tabToFocus}
			selected={index === selected}
			url={tab.url}
			content={tab.content}
			onTogglePopover={noop}
			onToggleModal={noop}
		/>
	{/each}
{/snippet}

<div class={classname} bind:this={containerNode}>
	{@render tabsMarkup()}
	{@render activator()}
</div>
