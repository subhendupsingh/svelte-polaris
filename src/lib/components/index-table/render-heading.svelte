<script lang="ts">
	import { applyStyles, classNames } from '$utilities/css.js';
	import type { NonEmptyArray } from '$utilities/types.js';
	import RenderHeadingContent from './render-heading-content.svelte';
	import type { IndexTableBaseProps, IndexTableHeading, TableHeadingRect } from './types.js';
	import styles from './index-table.module.css';
	import Checkbox from '../checkbox/checkbox.svelte';
	import type { IndexContextType } from '$utilities/index-provider/context.js';
	import { SelectionType, type HandleSelectionChange } from '$utilities/index-provider/types.js';
	import { useContext } from '$utilities/contexts.js';
	import { INDEX_SELECTION_CHANGE_CONTEXT_KEY } from '$utilities/index-provider/hooks.js';

	interface Props extends IndexContextType {
		heading: IndexTableHeading;
		index: number;
		Tag: any;
		tagProps: { [x: string]: unknown };
		id?: string;
		headings: NonEmptyArray<IndexTableHeading>;
		sortable?: IndexTableBaseProps['sortable'];
		selectable?: IndexTableBaseProps['selectable'];
		sortColumnIndex?: IndexTableBaseProps['sortColumnIndex'];
		onSort?: IndexTableBaseProps['onSort'];
		sortDirection?: IndexTableBaseProps['sortDirection'];
		defaultSortDirection?: IndexTableBaseProps['defaultSortDirection'];
		sortToggleLabels?: IndexTableBaseProps['sortToggleLabels'];
	}

	let {
		heading,
		index,
		Tag,
		tagProps,
		id,
		headings,
		sortable,
		selectable,
		sortColumnIndex,
		onSort,
		sortDirection,
		defaultSortDirection,
		sortToggleLabels,
		resourceName,
		bulkSelectState
	}: Props = $props();

	let tableHeadingRects = $state<TableHeadingRect[]>([]);
	const isSecond = index === 0;
	const isLast = index === headings.length - 1;
	const hasSortable = sortable?.some((value) => value === true);
	const headingAlignment = heading.alignment || 'start';
	const headingContentClassName = classNames(
		styles.TableHeading,
		headingAlignment === 'center' && styles['TableHeading-align-center'],
		headingAlignment === 'end' && styles['TableHeading-align-end'],
		hasSortable && styles['TableHeading-sortable'],
		isSecond && styles['TableHeading-second'],
		isLast && !heading.hidden && styles['TableHeading-last'],
		!selectable && styles['TableHeading-unselectable'],
		heading.flush && styles['TableHeading-flush']
	);

	const stickyPositioningStyle =
		selectable !== false && isSecond && tableHeadingRects && tableHeadingRects.length > 0
			? { left: tableHeadingRects[0].offsetWidth }
			: undefined;

	const checkboxClassName = $derived(
		classNames(styles.TableHeading, hasSortable && styles['TableHeading-sortable'], index === 0 && styles['TableHeading-first'])
	);

	const useIndexSelectionChange = useContext<HandleSelectionChange>(INDEX_SELECTION_CHANGE_CONTEXT_KEY);
	const handleSelectionChange = $derived(useIndexSelectionChange());

	function handleSelectPage(checked: boolean) {
		handleSelectionChange(SelectionType.Page, checked);
	}

</script>

{#snippet headingContent()}
	<svelte:element
		this={Tag}
		{id}
		class={headingContentClassName}
		style={applyStyles(stickyPositioningStyle)}
		{...tagProps}
	>
		<RenderHeadingContent
			{heading}
			{index}
			{sortColumnIndex}
			{onSort}
			{sortDirection}
			{defaultSortDirection}
			{sortToggleLabels}
			{selectable}
			{sortable}
		/>
	</svelte:element>
{/snippet}

{#snippet renderCheckboxContent()}
	<div class={styles.ColumnHeaderCheckboxWrapper}>
		<Checkbox
			label={`Select all ${resourceName.plural}`}
			labelHidden
			onChange={handleSelectPage}
			checked={bulkSelectState}
		/>
	</div>
{/snippet}

{#snippet checkboxContent()}
	<svelte:element this={Tag} class={checkboxClassName} {...tagProps}>
		{@render renderCheckboxContent()}
	</svelte:element>
{/snippet}

{#if index !== 0 || !selectable}
	{@render headingContent()}
{:else}
	{@render checkboxContent()}
	{@render headingContent()}
{/if}
