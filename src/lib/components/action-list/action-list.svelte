<script lang="ts">
	import type { ActionListSection } from '$utilities/types.js';
	import Box from '../box/box.svelte';
	import Section from './components/action-list-section/action-list-section.svelte';
	import { FILTER_ACTIONS_THRESHOLD, type ActionListProps } from './types.js';

	let {
		items,
		sections = [],
		actionRole,
		allowFiltering,
		onActionAnyItem,
		filterLabel
	}: ActionListProps = $props();

	//@ts-ignore
	let finalSections: readonly ActionListSection[] = $derived.by(() => {
		if (items) {
			return [{ items }, ...sections];
		} else if (sections) {
			return sections;
		}
		return [];
	});

	const isFilterable = $derived(
		finalSections?.some((section) => section.items.some((item) => typeof item.content === 'string'))
	);

	const hasMultipleSections = $derived(finalSections.length > 1);
	const elementRole = $derived(
		hasMultipleSections && actionRole === 'menuitem' ? 'menu' : undefined
	);
	const elementTabIndex = $derived(
		hasMultipleSections && actionRole === 'menuitem' ? -1 : undefined
	);

	let searchText = $state('');
	const filteredSections = $derived(
		finalSections?.map((section) => ({
			...section,
			items: section.items.filter(({ content }) =>
				typeof content === 'string'
					? content?.toLowerCase().includes(searchText.toLowerCase())
					: content
			)
		}))
	);

	const totalActions = $derived(
		finalSections?.reduce((acc: number, section) => acc + section.items.length, 0) || 0
	);

	const hasManyActions = $derived(totalActions >= FILTER_ACTIONS_THRESHOLD);
	const totalFilteredActions = $derived.by(() => {
		const totalSectionItems =
			filteredSections?.reduce((acc: number, section) => acc + section.items.length, 0) || 0;

		return totalSectionItems;
	});
</script>

{#snippet sectionMarkup()}
	{#each filteredSections as section, index}
		{#if section.items.length > 0}
			<Section
				{section}
				{hasMultipleSections}
				{actionRole}
				{onActionAnyItem}
				isFirst={index === 0}
			/>
		{/if}
	{/each}
{/snippet}

{#if allowFiltering && hasManyActions && isFilterable}
	<Box padding="200" paddingBlockEnd={totalFilteredActions > 0 ? '0' : '200'}>
		<!-- <TextField
			clearButton
			labelHidden
			label={filterLabel
				? filterLabel
				: i18n.translate('Polaris.ActionList.SearchField.placeholder')}
			placeholder={filterLabel
				? filterLabel
				: i18n.translate('Polaris.ActionList.SearchField.placeholder')}
			autoComplete="off"
			value={searchText}
			onChange={(value) => setSearchText(value)}
			onClearButtonClick={() => setSearchText('')}
		/> -->

		Implement TextField
	</Box>
{/if}

<Box as={hasMultipleSections ? 'ul' : 'div'} role={elementRole} tabIndex={elementTabIndex}>
	{@render sectionMarkup()}
</Box>
