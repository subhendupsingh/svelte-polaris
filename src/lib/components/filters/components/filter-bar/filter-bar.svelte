<script lang="ts">
	import UnstyledButton from '$lib/components/button/unstyled-button.svelte';
	import type { PropsWithChildren } from '$utilities/props-with-children.js';
	import type { ActionListItemDescriptor, FilterInterface } from '$utilities/types.js';
	import styles from '../../filters.module.css';
	import type { FiltersBarProps } from './types.js';
	import Text from '$lib/components/text/text.svelte';
	import PlusIcon from '@shopify/polaris-icons/dist/svg/PlusIcon.svg?component';
	import FilterPill from '../filter-pill/filter-pill.svelte';
	import Popover from '$lib/components/popover/popover.svelte';
	import ActionList from '$lib/components/action-list/action-list.svelte';
	import { classNames } from '$utilities/css.js';
	import Button from '$lib/components/button/button.svelte';
	import Box from '$lib/components/box/box.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';

	let {
		filters,
		appliedFilters,
		onClearAll,
		disabled,
		hideQueryField,
		disableFilters,
		mountedStateStyles,
		onAddFilterClick,
		closeOnChildOverlayClick,
		children,
	}: PropsWithChildren<FiltersBarProps> = $props();


	let popoverActive = $state(false);
	let hasMounted = $state(false);

	const togglePopoverActive = () => (popoverActive = !popoverActive);

	const handleAddFilterClick = () => {
		onAddFilterClick?.();
		togglePopoverActive();
	};

	const appliedFilterKeys = $derived(appliedFilters?.map(({ key }) => key));

	const pinnedFromPropsKeys = $derived(filters.filter(({ pinned }) => pinned).map(({ key }) => key));

	const pinnedFiltersFromPropsAndAppliedFilters = $derived(filters.filter(({ pinned, key }) => {
		const isPinnedOrApplied = Boolean(pinned) || appliedFilterKeys?.includes(key);
		return isPinnedOrApplied;
	}));

	let localPinnedFilters = $derived<string[]>(
		pinnedFiltersFromPropsAndAppliedFilters.map(({ key }) => key)
	);

	$effect(() => {
		localPinnedFilters = pinnedFiltersFromPropsAndAppliedFilters.map(({ key }) => key);
	});

	const pinnedFilters = $derived(
		localPinnedFilters
			.map((key) => filters.find((filter) => filter.key === key))
			.reduce<FilterInterface[]>((acc, filter) => (filter ? [...acc, filter] : acc), [])
	);

	const onFilterClick =
		({ key, onAction }: FilterInterface) =>
		() => {
			// PopoverOverlay will cause a rerender of the component and nuke the
			// popoverActive state, so we set this as a microtask
			setTimeout(() => {
				localPinnedFilters = [...new Set([...localPinnedFilters, key])];
				onAction?.();
				togglePopoverActive();
			}, 0);
		};

	const filterToActionItem = (filter: FilterInterface) => ({
		...filter,
		content: filter.label,
		onAction: onFilterClick(filter)
	});

	const unpinnedFilters = filters.filter(
		(filter) => !pinnedFilters.some(({ key }) => key === filter.key)
	);

	const unsectionedFilters = unpinnedFilters
		.filter((filter) => !filter.section && !filter.hidden)
		.map(filterToActionItem);

	const sectionedFilters = unpinnedFilters
		.filter((filter) => filter.section)
		.reduce(
			(acc, filter) => {
				const filterActionItem = filterToActionItem(filter);
				const sectionIndex = acc.findIndex((section) => section.title === filter.section);

				if (sectionIndex === -1) {
					acc.push({
						title: filter.section!,
						items: [filterActionItem]
					});
				} else {
					acc[sectionIndex].items.push(filterActionItem);
				}

				return acc;
			},
			[] as {
				title: string;
				items: ActionListItemDescriptor[];
			}[]
		);

	const hasOneOrMorePinnedFilters = $derived(pinnedFilters.length >= 1);

	const handleClearAllFilters = () => {
		localPinnedFilters = pinnedFromPropsKeys;
		onClearAll?.();
	};
	const shouldShowAddButton = $derived(
		filters.some((filter) => !filter.pinned) || filters.length !== localPinnedFilters.length
	);

	const appliedFilter = (filterKey: string) => appliedFilters?.find(({ key }) => key === filterKey);

	const handleFilterPillRemove = (filterKey: string) => {
		(localPinnedFilters = localPinnedFilters.filter((key) => {
			const isMatchedFilters = key === filterKey;
			const isPinnedFilterFromProps = pinnedFromPropsKeys.includes(key);
			return !isMatchedFilters || isPinnedFilterFromProps;
		})),
			appliedFilter(filterKey)?.onRemove?.(filterKey);
	};
</script>

{#snippet addFilterActivator()}
	<div>
		<UnstyledButton
			type="button"
			class={styles.AddFilter}
			onClick={handleAddFilterClick}
			aria-label="Add filter"
			disabled={disabled ||
				(unsectionedFilters.length === 0 && sectionedFilters.length === 0) ||
				disableFilters}
		>
			<Text as="span" variant="bodySm" tone={disabled ? 'disabled' : 'base'}>Add filter</Text>
			<PlusIcon />
		</UnstyledButton>
	</div>
{/snippet}

{#snippet pinnedFiltersMarkup()}
	{#each pinnedFilters as { key: filterKey, ...pinnedFilter }}
		{@const appliedFilterz = appliedFilter(filterKey)}
		<FilterPill
			key={filterKey}
			{...pinnedFilter}
			initialActive={hasMounted && !pinnedFilter.pinned && !appliedFilterz}
			unsavedChanges={appliedFilterz?.unsavedChanges}
			label={appliedFilterz?.label || pinnedFilter.label}
			{filterKey}
			selected={appliedFilterKeys?.includes(filterKey)}
			onRemove={(filterKey) => handleFilterPillRemove(filterKey)}
			disabled={pinnedFilter.disabled || disableFilters}
			{closeOnChildOverlayClick}
		/>
	{/each}
{/snippet}

{#snippet addButton()}
	{#if shouldShowAddButton}
		<div
			class={classNames(
				styles.AddFilterActivator,
				hasOneOrMorePinnedFilters && styles.AddFilterActivatorMultiple
			)}
		>
			<Popover
				active={popoverActive && !disabled}
				onClose={togglePopoverActive}
				trigger={addFilterActivator}
			>
				<ActionList actionRole="menuitem" items={unsectionedFilters} sections={sectionedFilters} />
			</Popover>
		</div>
	{/if}
{/snippet}

{#snippet clearAllMarkup()}
	{#if appliedFilters?.length}
		<div
			class={classNames(
				styles.ClearAll,
				hasOneOrMorePinnedFilters && shouldShowAddButton && styles.MultiplePinnedFilterClearAll
			)}
		>
			<Button size="micro" onClick={handleClearAllFilters} variant="monochromePlain">
				Clear all
			</Button>
		</div>
	{/if}
{/snippet}

<div
	class={classNames(
		styles.FiltersWrapper,
		shouldShowAddButton && hasOneOrMorePinnedFilters && styles.FiltersWrapperWithAddButton
	)}
	aria-live="polite"
	style={mountedStateStyles}
>
	<div class={classNames(styles.FiltersInner)}>
		<div class={classNames(styles.FiltersStickyArea)}>
			{@render pinnedFiltersMarkup()}
			{@render addButton()}
			{@render clearAllMarkup()}
		</div>
	</div>
	{#if hideQueryField}
		<Box paddingInlineEnd="300" paddingBlockStart="200" paddingBlockEnd="200">
			<InlineStack
				align="start"
				blockAlign="center"
				gap={{
					xs: '400',
					md: '300'
				}}
			>
				{@render children?.()}
			</InlineStack>
		</Box>
	{/if}
</div>
