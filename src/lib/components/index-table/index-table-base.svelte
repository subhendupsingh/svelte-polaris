<script lang="ts">
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import { classNames } from '$utilities/css.js';
	import { debounce } from '$utilities/debounce.js';
	import {
		INDEX_CONTEXT_KEY,
		INDEX_SELECTION_CHANGE_CONTEXT_KEY
	} from '$utilities/index-provider/hooks.js';
	import {
		SELECT_ALL_ITEMS,
		SelectionType,
		type HandleSelectionChange
	} from '$utilities/index-provider/types.js';
	import styles from './index-table.module.css';
	import {
		SCROLL_BAR_DEBOUNCE_PERIOD,
		SCROLL_BAR_PADDING,
		type IndexTableBaseProps,
		type TableHeadingRect
	} from './types.js';
	import { getTableHeadingsBySelector } from './utilities/utilities.js';
	import { onMount } from 'svelte';
	import Spinner from '../spinner/spinner.svelte';
	import Sticky from '../sticky/sticky.svelte';
	import BulkActions from '../bulk-actions/bulk-actions.svelte';
	import EmptySearchResult from '../empty-search-result/empty-search-result.svelte';
	import EventListener from '../event-listener/event-listener.svelte';
	import ScrollContainer from './components/scrollcontainer/scrollcontainer.svelte';
	import Pagination from '../pagination/pagination.svelte';
	import RenderHeading from './render-heading.svelte';
	import { useContext } from '$utilities/contexts.js';
	import type { IndexContextType } from '$utilities/index-provider/context.js';
	let {
		headings,
		bulkActions = [],
		promotedBulkActions = [],
		children,
		emptyState,
		sort,
		paginatedSelectAllActionText,
		lastColumnSticky = false,
		sortable,
		sortDirection,
		defaultSortDirection = 'descending',
		sortColumnIndex,
		onSort,
		sortToggleLabels,
		hasZebraStriping,
		pagination,
		isSticky,
		...restProps
	}: IndexTableBaseProps = $props();

	/* const {
		loading,
		bulkSelectState,
		resourceName,
		bulkActionsAccessibilityLabel,
		selectMode,
		selectable = restProps.selectable,
		paginatedSelectAllText,
		itemCount,
		hasMoreItems,
		selectedItemsCount,
		condensed
	} = useIndexValue(); */

	const indexValueContext = useContext<IndexContextType>(INDEX_CONTEXT_KEY);
	const {
		loading,
		bulkSelectState,
		resourceName,
		bulkActionsAccessibilityLabel,
		selectMode,
		selectable = restProps.selectable,
		paginatedSelectAllText,
		itemCount,
		hasMoreItems,
		selectedItemsCount,
		condensed
	} = $derived(indexValueContext());

	//const handleSelectionChange = useIndexSelectionChange();
	const handleSelectionChangeContext = useContext<HandleSelectionChange>(
		INDEX_SELECTION_CHANGE_CONTEXT_KEY
	);
	const handleSelectionChange = $derived(handleSelectionChangeContext());
	const hasMoreLeftColumns = new UseToggle(false);
	const toggleHasMoreLeftColumns = hasMoreLeftColumns.toggle;

	let tablePosition = $state({ top: 0, left: 0 });
	let tableHeadingRects = $state<TableHeadingRect[]>([]);

	let scrollableContainerElement = $state<HTMLDivElement>();
	let tableElement = $state<HTMLTableElement | null>(null);
	let tableBodyElement = $state<Element | null>(null);
	let condensedListElement = $state<HTMLUListElement | null>(null);

	let tableInitialized = $state(false);
	let stickyWrapper = $state<HTMLElement | null>(null);
	let hideScrollContainer = $state<boolean>(true);

	let tableHeadings = $state<HTMLElement[]>([]);
	let stickyTableHeadings = $state<HTMLElement[]>([]);
	let stickyHeaderWrapperElement = $state<HTMLDivElement | null>(null);
	let stickyHeaderElement = $state<HTMLDivElement | null>(null);
	let scrollBarElement = $state<HTMLDivElement | null>(null);
	let scrollContainerElement = $state<HTMLDivElement | null>(null);
	let scrollingWithBar = $state(false);
	let scrollingContainer = $state(false);
	let renderAfterSelectEvent = $state(false);
	let lastSelectedItemsCount = $state<number | 'All'>(0);
	let hasSelected = $state(false);
	let selectedItemsCountValue = $derived(
		selectedItemsCount === SELECT_ALL_ITEMS ? `${itemCount}+` : selectedItemsCount
	);

	function getPaginatedSelectAllAction() {
		if (!selectable || !hasMoreItems) {
			return;
		}

		const customActionText =
			paginatedSelectAllActionText ??
			`Select all ${itemCount}+ ${resourceName.plural.toLocaleLowerCase()}`;

		const actionText = selectedItemsCount === SELECT_ALL_ITEMS ? 'Undo' : customActionText;

		return {
			content: actionText,
			onAction: handleSelectAllItemsInStore
		};
	}

	function handleSelectModeToggle() {
		handleSelectionChange(SelectionType.All, false);
	}

	let selectAllActionsLabel = $derived(`${selectedItemsCountValue} selected`);
	let paginatedSelectAllAction = $derived(getPaginatedSelectAllAction());

	const handleTogglePage = () => {
		handleSelectionChange(SelectionType.Page, Boolean(!bulkSelectState));
	};

	$effect(() => {
		if (selectedItemsCount === SELECT_ALL_ITEMS || selectedItemsCount > 0) {
			selectedItemsCountValue =
				selectedItemsCount === SELECT_ALL_ITEMS ? `${itemCount}+` : selectedItemsCount;
		}
	});

	$effect(() => {
		if (selectedItemsCount !== lastSelectedItemsCount) {
			renderAfterSelectEvent = true;
			lastSelectedItemsCount = selectedItemsCount;
		}

		if (!hasSelected && selectedItemsCount !== 0) {
			hasSelected = true;
		}
	});

	const tableBodyRef = (node: Element | null) => {
		if (node !== null && !tableInitialized) {
			tableInitialized = true;
		}
		tableBodyElement = node;
	};

	const handleSelectAllItemsInStore = () => {
		handleSelectionChange(
			selectedItemsCount === SELECT_ALL_ITEMS ? SelectionType.Page : SelectionType.All,
			true
		);
	};

	const resizeTableHeadings = debounce(() => {
		if (!tableElement || !scrollableContainerElement) {
			return;
		}

		const boundingRect = scrollableContainerElement.getBoundingClientRect();
		tablePosition = {
			top: boundingRect.top,
			left: boundingRect.left
		};

		tableHeadingRects = tableHeadings.map((heading) => ({
			offsetWidth: heading.offsetWidth || 0,
			offsetLeft: heading.offsetLeft || 0
		}));

		if (tableHeadings.length === 0) {
			return;
		}

		// update left offset for first column
		if (selectable && tableHeadings.length > 1) {
			tableHeadings[1].style.left = `${tableHeadingRects[0].offsetWidth}px`;
			if (stickyTableHeadings.length) {
				stickyTableHeadings[1].style.left = `${tableHeadingRects[0].offsetWidth}px`;
			}
		}

		// update sticky header min-widths to match table widths
		if (stickyTableHeadings.length) {
			stickyTableHeadings.forEach((heading, index) => {
				heading.style.minWidth = `${tableHeadingRects[index]?.offsetWidth || 0}px`;
			});
		}
	});

	const resizeTableScrollBar = () => {
		if (scrollBarElement && tableElement && tableInitialized) {
			scrollBarElement.style.setProperty(
				'--pc-index-table-scroll-bar-content-width',
				`${tableElement.offsetWidth - SCROLL_BAR_PADDING}px`
			);

			hideScrollContainer = scrollContainerElement?.offsetWidth === tableElement?.offsetWidth;
		}
	};

	const debounceResizeTableScrollbar = debounce(resizeTableScrollBar, SCROLL_BAR_DEBOUNCE_PERIOD, {
		trailing: true
	});

	let canScrollRight = $state(true);

	const handleCanScrollRight = debounce(() => {
		if (!lastColumnSticky || !tableElement || !scrollableContainerElement) {
			return;
		}

		const tableRect = tableElement.getBoundingClientRect();
		const scrollableRect = scrollableContainerElement.getBoundingClientRect();

		canScrollRight = tableRect.width > scrollableRect.width;
	});

	let canFitStickyColumn = $state(true);

	const handleCanFitStickyColumn = () => {
		if (!scrollableContainerElement || !tableHeadings.length) {
			return;
		}
		const scrollableRect = scrollableContainerElement.getBoundingClientRect();
		const checkboxColumnWidth = selectable ? tableHeadings[0].getBoundingClientRect().width : 0;
		const firstStickyColumnWidth = tableHeadings[selectable ? 1 : 0].getBoundingClientRect().width;
		const lastColumnIsNotTheFirst = selectable ? tableHeadings.length > 2 : 1;
		// Don't consider the last column in the calculations if it's not sticky
		const lastStickyColumnWidth =
			lastColumnSticky && lastColumnIsNotTheFirst
				? tableHeadings[tableHeadings.length - 1].getBoundingClientRect().width
				: 0;
		// Secure some space for the remaining columns to be visible
		const restOfContentMinWidth = 100;
		canFitStickyColumn =
			scrollableRect.width >
			firstStickyColumnWidth + checkboxColumnWidth + lastStickyColumnWidth + restOfContentMinWidth;
	};

	$effect(() => {
		if (tableInitialized) {
			handleCanFitStickyColumn();
		}
	});

	const handleResize = () => {
		// hide the scrollbar when resizing
		scrollBarElement?.style.setProperty('--pc-index-table-scroll-bar-content-width', `0px`);

		resizeTableHeadings();
		debounceResizeTableScrollbar();
		handleCanScrollRight();
		handleCanFitStickyColumn();
	};

	const handleScrollContainerScroll = (canScrollLeft: boolean, canScrollRight: boolean) => {
		if (!scrollableContainerElement || !scrollBarElement) {
			return;
		}

		if (!scrollingWithBar) {
			scrollingContainer = true;
			scrollBarElement.scrollLeft = scrollableContainerElement.scrollLeft;
		}
		scrollingWithBar = false;

		if (stickyHeaderElement) {
			stickyHeaderElement.scrollLeft = scrollableContainerElement.scrollLeft;
		}

		if ((canScrollLeft && !hasMoreLeftColumns) || (!canScrollLeft && hasMoreLeftColumns)) {
			toggleHasMoreLeftColumns();
		}

		canScrollRight = canScrollRight;
	};

	const handleScrollBarScroll = () => {
		if (!scrollableContainerElement || !scrollBarElement) {
			return;
		}

		if (!scrollingContainer) {
			scrollingWithBar = true;
			scrollableContainerElement.scrollLeft = scrollBarElement.scrollLeft;
		}
		scrollingContainer = false;
	};

	$effect(() => {
		resizeTableScrollBar();
		stickyWrapper = condensed ? condensedListElement : tableElement;
	});

	onMount(() => {
		tableHeadings = getTableHeadingsBySelector(tableElement, '[data-index-table-heading]');

		stickyTableHeadings = getTableHeadingsBySelector(
			stickyHeaderWrapperElement,
			'[data-index-table-sticky-heading]'
		);
		resizeTableHeadings();
	});

	function handleSelectPage(checked: boolean) {
		handleSelectionChange(SelectionType.Page, checked);
	}

	const stickyTableClassNames = $derived(
		classNames(
			styles.StickyTable,
			hasMoreLeftColumns && styles['StickyTable-scrolling'],
			condensed && styles['StickyTable-condensed']
		)
	);

	const shouldShowActions = $derived(!condensed || selectedItemsCount);
	const promotedActions = $derived(shouldShowActions ? promotedBulkActions : []);
	const actions = $derived(shouldShowActions ? bulkActions : []);

	const stickyHeaderClassNames = $derived(
		classNames(
			styles.StickyTableHeader,
			isSticky && styles['StickyTableHeader-isSticky'],
			// Has a sticky left column enabled
			canFitStickyColumn && styles['StickyTableHeader-sticky'],
			// ie; is scrolled to the right
			hasMoreLeftColumns && styles['StickyTableHeader-scrolling'],
			// Has a sticky right column enabled
			canFitStickyColumn && lastColumnSticky && styles['StickyTableHeader-sticky-last'],
			// ie; is scrolled to the left
			canFitStickyColumn &&
				lastColumnSticky &&
				canScrollRight &&
				styles['StickyTableHeader-sticky-scrolling']
		)
	);

	const bulkActionsClassName = $derived(
		classNames(
			styles.BulkActionsWrapper,
			selectMode && styles.BulkActionsWrapperVisible,
			condensed && styles['StickyTableHeader-condensed'],
			isSticky && styles['StickyTableHeader-isSticky']
		)
	);

	const scrollBarWrapperClassNames = $derived(
		classNames(
			styles.ScrollBarContainer,
			pagination && styles.ScrollBarContainerWithPagination,
			condensed && styles.scrollBarContainerCondensed,
			hideScrollContainer && styles.scrollBarContainerHidden
		)
	);

	const scrollBarClassNames = $derived(
		classNames(tableElement && tableInitialized && styles.ScrollBarContent)
	);

	onMount(() => {
		resizeTableScrollBar();
	});

	const isSortable = $derived(sortable?.some((value) => value));

	const tableClassNames = $derived(
		classNames(
			styles.Table,
			hasMoreLeftColumns && styles['Table-scrolling'],
			selectMode && styles.disableTextSelection,
			!selectable && styles['Table-unselectable'],
			canFitStickyColumn && styles['Table-sticky'],
			isSortable && styles['Table-sortable'],
			canFitStickyColumn && lastColumnSticky && styles['Table-sticky-last'],
			canFitStickyColumn && lastColumnSticky && canScrollRight && styles['Table-sticky-scrolling'],
			hasZebraStriping && styles.ZebraStriping
		)
	);

	const condensedClassNames = $derived(
		classNames(styles.CondensedList, hasZebraStriping && styles.ZebraStriping)
	);
</script>

{#snippet emptyStateMarkup()}
	{#if emptyState}
		{@render emptyState()}
	{:else}
		<EmptySearchResult
			title={`No ${resourceName.plural.toLocaleLowerCase()} found`}
			description={`Try changing the filters or search term`}
			withIllustration
		/>
	{/if}
{/snippet}

{#snippet scrollBarMarkup()}
	{#if itemCount > 0}
		<div class={scrollBarWrapperClassNames} bind:this={scrollContainerElement}>
			<div onscroll={handleScrollBarScroll} class={styles.ScrollBar} bind:this={scrollBarElement}>
				<div class={scrollBarClassNames}></div>
			</div>
		</div>
	{/if}
{/snippet}

{#snippet sharedMarkup()}
	<EventListener event="resize" handler={handleResize} />
	{@render stickyHeaderMarkup()}
{/snippet}

{#snippet bodyMarkup()}
	{#if condensed}
		{@render sharedMarkup()}
		<ul
			data-selectmode={Boolean(selectMode)}
			class={condensedClassNames}
			bind:this={condensedListElement}
		>
			{@render children?.()}
		</ul>
	{:else}
		{@render sharedMarkup()}
		<ScrollContainer
			bind:scrollableContainerRef={scrollableContainerElement}
			onScroll={handleScrollContainerScroll}
		>
			<table bind:this={tableElement} class={tableClassNames}>
				<thead>
					<tr class={styles.HeadingRow}>{@render headingsMarkup()}</tr>
				</thead>
				<tbody use:tableBodyRef>
					{@render children?.()}
				</tbody>
			</table>
		</ScrollContainer>
	{/if}
{/snippet}

{#snippet tableContentMarkup()}
	{#if itemCount > 0}
		{@render bodyMarkup()}
	{:else}
		<div class={styles.EmptySearchResultWrapper}>
			{@render emptyStateMarkup()}
		</div>
	{/if}
{/snippet}

{#snippet paginationMarkup()}
	{#if pagination}
		<div class={styles.PaginationWrapper}>
			<Pagination type="table" {...pagination} />
		</div>
	{/if}
{/snippet}

{#snippet bulkActionsMarkup()}
	{#if shouldShowActions && !condensed}
		<div class={bulkActionsClassName}>
			<BulkActions
				{selectMode}
				onToggleAll={handleTogglePage}
				{paginatedSelectAllText}
				{paginatedSelectAllAction}
				accessibilityLabel={bulkActionsAccessibilityLabel}
				selected={bulkSelectState}
				{promotedActions}
				{actions}
				onSelectModeToggle={condensed ? handleSelectModeToggle : undefined}
				label={selectAllActionsLabel}
				buttonSize="micro"
			/>
		</div>
	{/if}
{/snippet}

{#snippet headerMarkup()}
	{#if condensed}
		<div
			class={classNames(styles.HeaderWrapper, (!selectable || condensed) && styles.unselectable)}
		>
			{@render loadingMarkup()}
			{@render sort?.()}
		</div>
	{:else}
		<div class={stickyHeaderClassNames} bind:this={stickyHeaderWrapperElement}>
			{@render loadingMarkup()}
			<div class={styles.StickyTableHeadings} bind:this={stickyHeaderElement}>
				{@render stickyHeadingsMarkup()}
			</div>
		</div>
	{/if}
{/snippet}

{#snippet stickyHeaderMarkup()}
	<div class={stickyTableClassNames} role="presentation">
		<Sticky boundingElement={stickyWrapper}>
			{@render headerMarkup()}
			{@render bulkActionsMarkup()}
		</Sticky>
	</div>
{/snippet}

{#snippet loadingMarkup()}
	<div class={classNames(styles.LoadingPanel, loading && styles.LoadingPanelEntered)}>
		<div class={styles.LoadingPanelRow}>
			<Spinner size="small" />
			<span class={styles.LoadingPanelText}>
				Loading {resourceName.plural.toLocaleLowerCase()}
			</span>
		</div>
	</div>
{/snippet}

{#snippet headingsMarkup()}
	{#each headings as heading, index}
		<RenderHeading
			{heading}
			{headings}
			{index}
			Tag="th"
			tagProps={{ 'data-index-table-heading': true }}
			id={heading.id}
			{selectable}
			{sortable}
			{sortColumnIndex}
			{onSort}
			{sortDirection}
			{defaultSortDirection}
			{sortToggleLabels}
			{resourceName}
			{bulkSelectState}
			{selectMode}
			{itemCount}
			{selectedItemsCount}
		/>
		<!-- {@render renderHeading(heading, index, 'th', { 'data-index-table-heading': true }, heading.id)} -->
	{/each}
{/snippet}

{#snippet stickyHeadingsMarkup()}
	{#each headings as heading, index}
		<RenderHeading
			{heading}
			{headings}
			{index}
			Tag="div"
			tagProps={{ 'data-index-table-sticky-heading': true }}
			{selectable}
			{sortable}
			{sortColumnIndex}
			{onSort}
			{sortDirection}
			{defaultSortDirection}
			{sortToggleLabels}
			{resourceName}
			{bulkSelectState}
			{selectMode}
			{itemCount}
			{selectedItemsCount}
		/>
		<!-- {@render renderHeading(heading, index, 'div', { 'data-index-table-sticky-heading': true })} -->
	{/each}
{/snippet}

<div class={styles.IndexTable}>
	<div class={styles.IndexTableWrapper}>
		{#if !condensed}
			{@render loadingMarkup()}
		{/if}
		{@render tableContentMarkup()}
		{@render scrollBarMarkup()}
		{@render paginationMarkup()}
	</div>
</div>
