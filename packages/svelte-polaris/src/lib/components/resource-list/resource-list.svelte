<script lang="ts">
	import { themeDefault, toPx } from '@shopify/polaris-tokens';
	import styles from './resource-list.module.css';
	import {
		LARGE_SPINNER_HEIGHT,
		SMALL_SPINNER_HEIGHT,
		type ResourceListItemData,
		type ResourceListProps
	} from './types.js';
	import { debounce } from '$utilities/debounce.js';
	import { SELECT_ALL_ITEMS } from '$utilities/index-provider/types.js';
	import { applyStyles, classNames } from '$utilities/css.js';
	import BulkActions from '../bulk-actions/bulk-actions.svelte';
	import Select from '../select/select.svelte';
	import type { VueNode } from '$utilities/types.js';
	import { onMount, type Component } from 'svelte';
	import { isSvelteConstruct } from '../page/components/page-header/types.js';
	import Text from '../text/text.svelte';
	import Button from '../button/button.svelte';
	import CheckboxIcon from '@shopify/polaris-icons/dist/svg/CheckboxIcon.svg?component';
	import CheckableButton from '../checkable-button/checkable-button.svelte';
	import Sticky from '../sticky/sticky.svelte';
	import EmptySearchResult from '../empty-search-result/empty-search-result.svelte';
	import Spinner from '../spinner/spinner.svelte';
	import Pagination from '../pagination/pagination.svelte';
	import ResourcelistContextProvider from '../app-provider/resourcelist-context-provider.svelte';

	let {
		items,
		filterControl,
		flushFilters,
		emptyState,
		emptySearchState,
		resourceName: resourceNameProp,
		promotedBulkActions,
		bulkActions,
		selectedItems = [],
		isFiltered,
		selectable,
		hasMoreItems,
		loading,
		headerContent,
		showHeader,
		totalItemsCount,
		sortValue,
		sortOptions,
		alternateTool,
		onSortChange,
		onSelectionChange,
		renderItem,
		idForItem = defaultIdForItem,
		resolveItemId,
		pagination
	}: ResourceListProps = $props();

	function getAllItemsOnPage<TItemType extends ResourceListItemData>(
		items: TItemType[],
		idForItem: (item: TItemType, index: number) => string
	) {
		return items.map((item: TItemType, index: number) => {
			return idForItem(item, index);
		});
	}

	const isBreakpointsXS = () => {
		return typeof window === 'undefined'
			? false
			: window.innerWidth < parseFloat(toPx(themeDefault.breakpoints['breakpoints-sm']) ?? '');
	};

	function defaultIdForItem<TItemType extends ResourceListItemData>(
		item: TItemType,
		index: number
	): string {
		return Object.prototype.hasOwnProperty.call(item, 'id') ? item.id : index.toString();
	}

	let x = $state<number>(0);
	const forceUpdate: (x?: number) => void = () => {
		x++;
	};

	let selectMode = $state(Boolean(selectedItems && selectedItems.length > 0));
	let loadingPosition = $state(0);
	let lastSelected = $state<number>(0);
	let smallScreen = $derived(isBreakpointsXS());
	let checkableButtonRef = $state<HTMLInputElement | null>(null);
	let defaultResourceName = $state({ singular: 'item', plural: 'items' });
	let listRef = $state<HTMLUListElement | null>(null);
	let isSticky = $state(false);

	const handleSelectMode = (selectMode: boolean) => {
		selectMode = selectMode;
		if (!selectMode && onSelectionChange) {
			onSelectionChange([]);
		}
	};

	const handleResize = debounce(
		() => {
			const newSmallScreen = isBreakpointsXS();
			if (selectedItems && selectedItems.length === 0 && selectMode && !newSmallScreen) {
				handleSelectMode(false);
			}

			if (smallScreen !== newSmallScreen) {
				smallScreen = newSmallScreen;
			}
		},
		50,
		{ leading: true, trailing: true, maxWait: 50 }
	);

	$effect(() => {
		if (listRef) {
			handleResize();
			window.addEventListener('resize', handleResize);
		}
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	const isSelectable = $derived(
		Boolean(
			(promotedBulkActions && promotedBulkActions.length > 0) ||
				(bulkActions && bulkActions.length > 0) ||
				selectable
		) && !smallScreen
	);

	let selectAllSelectState = $derived.by((): boolean => {
		let selectState: boolean = false;
		if (!selectedItems || (Array.isArray(selectedItems) && selectedItems.length === 0)) {
			selectState = false;
		} else if (
			selectedItems === SELECT_ALL_ITEMS ||
			(Array.isArray(selectedItems) && selectedItems.length === items.length)
		) {
			selectState = true;
		}
		return selectState;
	});

	const resourceName = $derived(resourceNameProp ? resourceNameProp : defaultResourceName);

	const headerTitle = $derived.by(() => {
		const itemsCount = items.length;
		const resource =
			!loading && ((!totalItemsCount && itemsCount === 1) || totalItemsCount === 1)
				? resourceName.singular
				: resourceName.plural;

		if (loading) {
			return `Loading ${resource}`;
		} else if (totalItemsCount) {
			return `Showing ${itemsCount} of ${totalItemsCount} ${resource}`;
		} else if (headerContent) {
			return headerContent;
		} else {
			return `Showing ${itemsCount} ${resource}`;
		}
	});

	let selectedItemsCount = $derived(
		selectedItems === SELECT_ALL_ITEMS ? `${items.length}+` : selectedItems.length
	);

	$effect(() => {
		if (selectedItems === SELECT_ALL_ITEMS || selectedItems.length > 0) {
			selectedItemsCount =
				selectedItems === SELECT_ALL_ITEMS ? `${items.length}+` : selectedItems.length;
		}
	});

	const selectAllActionsLabel = $derived(`${selectedItemsCount} selected`);

	const bulkActionsAccessibilityLabel = $derived.by(() => {
		const selectedItemsCount = selectedItems.length;
		const totalItemsCount = items.length;
		const allSelected = selectedItemsCount === totalItemsCount;

		if (totalItemsCount === 1 && allSelected) {
			return `Deselect ${resourceName.singular}`;
		} else if (totalItemsCount === 1) {
			return `Select ${resourceName.singular}`;
		} else if (allSelected) {
			return `Deselect all ${items.length} ${resourceName.plural}`;
		} else {
			return `Select all ${items.length} ${resourceName.plural}`;
		}
	});

	const paginatedSelectAllText = $derived.by(() => {
		if (!isSelectable || !hasMoreItems) {
			return '';
		}

		if (selectedItems === SELECT_ALL_ITEMS) {
			return isFiltered
				? `All ${items.length}+ ${resourceName.plural} in this filter are selected`
				: `All ${items.length}+ ${resourceName.plural} in your store are selected`;
		}
	});

	const handleSelectAllItemsInStore = () => {
		const newlySelectedItems =
			selectedItems === SELECT_ALL_ITEMS ? getAllItemsOnPage(items, idForItem) : SELECT_ALL_ITEMS;

		if (onSelectionChange) {
			onSelectionChange(newlySelectedItems);
		}
	};

	const paginatedSelectAllAction = $derived.by(() => {
		if (!isSelectable || !hasMoreItems) {
			return;
		}

		const actionText =
			selectedItems === SELECT_ALL_ITEMS
				? 'Undo'
				: isFiltered
					? `Select all ${items.length}+ ${resourceName.plural} in this filter`
					: `Select all ${items.length}+ ${resourceName.plural} in your store`;

		return {
			content: actionText,
			onAction: handleSelectAllItemsInStore
		};
	});

	const emptySearchResultText = $derived({
		title: `No ${resourceName.plural} found`,
		description: 'Try changing the filters or search term'
	});

	const setLoadingPosition = () => {
		if (listRef != null) {
			if (typeof window === 'undefined') {
				return;
			}

			const overlay = listRef.getBoundingClientRect();
			const viewportHeight = Math.max(
				document.documentElement ? document.documentElement.clientHeight : 0,
				window.innerHeight || 0
			);

			const overflow = viewportHeight - overlay.height;

			const spinnerHeight = items.length === 1 ? SMALL_SPINNER_HEIGHT : LARGE_SPINNER_HEIGHT;

			const spinnerPosition =
				overflow > 0
					? (overlay.height - spinnerHeight) / 2
					: (viewportHeight - overlay.top - spinnerHeight) / 2;

			loadingPosition = spinnerPosition;
		}
	};

	const itemsExist = items.length > 0;

	$effect(() => {
		if (loading) {
			setLoadingPosition();
		}
	});

	$effect(() => {
		if (selectedItems && selectedItems.length > 0 && !selectMode) {
			selectMode = true;
		}
		if ((!selectedItems || selectedItems.length === 0) && !isBreakpointsXS()) {
			selectMode = false;
		}
	});

	onMount(() => {
		forceUpdate();
	});

	/* ;

	$effect(() => {
		forceUpdate();
	}); */

	type TItemType = ResourceListItemData;

	const renderItemWithId = (item: TItemType, index: number) => {
		const id = idForItem(item, index);
		const itemContent = renderItem(item);
		return itemContent;
	};

	const handleMultiSelectionChange = (
		lastSelected: number,
		currentSelected: number,
		resolveItemId: (item: TItemType) => string
	) => {
		const min = Math.min(lastSelected, currentSelected);
		const max = Math.max(lastSelected, currentSelected);
		//@ts-ignore
		return items.slice(min, max + 1).map(resolveItemId);
	};

	const handleSelectionChange = (
		selected: boolean,
		id: string,
		sortOrder: number | undefined,
		shiftKey: boolean
	) => {
		if (selectedItems == null || onSelectionChange == null) {
			return;
		}

		let newlySelectedItems =
			selectedItems === SELECT_ALL_ITEMS ? getAllItemsOnPage(items, idForItem) : [...selectedItems];

		if (sortOrder !== undefined) {
			lastSelected = sortOrder;
		}

		const lastSelectedFromState = lastSelected;

		let selectedIds: string[] = [id];

		if (shiftKey && lastSelectedFromState != null && sortOrder !== undefined && resolveItemId) {
			selectedIds = handleMultiSelectionChange(lastSelectedFromState, sortOrder, resolveItemId);
		}
		newlySelectedItems = [...new Set([...newlySelectedItems, ...selectedIds])];

		if (!selected) {
			for (const selectedId of selectedIds) {
				newlySelectedItems.splice(newlySelectedItems.indexOf(selectedId), 1);
			}
		}

		if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
			handleSelectMode(false);
		} else if (newlySelectedItems.length > 0) {
			handleSelectMode(true);
		}

		if (onSelectionChange) {
			onSelectionChange(newlySelectedItems);
		}
	};

	const handleToggleAll = () => {
		let newlySelectedItems: string[];

		if (
			(Array.isArray(selectedItems) && selectedItems.length === items.length) ||
			selectedItems === SELECT_ALL_ITEMS
		) {
			newlySelectedItems = [];
		} else {
			newlySelectedItems = items.map((item, index) => {
				return idForItem(item, index);
			});
		}

		if (newlySelectedItems.length === 0 && !isBreakpointsXS()) {
			handleSelectMode(false);
		} else if (newlySelectedItems.length > 0) {
			handleSelectMode(true);
		}

		if (onSelectionChange) {
			onSelectionChange(newlySelectedItems);
		}

		// setTimeout ensures execution after the Transition on BulkActions
		setTimeout(() => {
			checkableButtonRef?.focus();
		}, 0);
	};

	const bulkActionClassNames = $derived(
		classNames(styles.BulkActionsWrapper, selectMode && styles.BulkActionsWrapperVisible)
	);

	const needsHeader = $derived(
		isSelectable || (sortOptions && sortOptions.length > 0) || alternateTool
	);

	const showEmptyState = $derived(emptyState && !itemsExist && !loading);

	const showEmptySearchState = $derived(
		!showEmptyState && filterControl && !itemsExist && !loading
	);

	const headerClassName = $derived(
		classNames(
			styles.HeaderWrapper,
			sortOptions && sortOptions.length > 0 && !alternateTool && styles['HeaderWrapper-hasSort'],
			alternateTool && styles['HeaderWrapper-hasAlternateTool'],
			isSelectable && styles['HeaderWrapper-hasSelect'],
			loading && styles['HeaderWrapper-disabled'],
			isSelectable && selectMode && styles['HeaderWrapper-inSelectMode'],
			isSticky && styles['HeaderWrapper-isSticky']
		)
	);

	const defaultTopPadding = 8;
	const topPadding = $derived(loadingPosition > 0 ? loadingPosition : defaultTopPadding);
	const spinnerStyle = $derived({ paddingTop: `${topPadding}px` });
	const spinnerSize = $derived(items.length < 2 ? 'small' : 'large');

	const className = $derived(
		classNames(styles.ItemWrapper, loading && styles['ItemWrapper-isLoading'])
	);

	const resourceListClassName = $derived(
		classNames(
			styles.ResourceList,
			loading && styles.disabledPointerEvents,
			selectMode && styles.disableTextSelection
		)
	);

	const context = $derived({
		selectable: isSelectable,
		selectedItems,
		selectMode,
		hasBulkActions: Boolean(bulkActions),
		resourceName,
		loading,
		onSelectionChange: handleSelectionChange
	});
</script>

{#snippet bulkActionsMarkup()}
	{#if isSelectable}
		<div class={bulkActionClassNames}>
			<BulkActions
				{selectMode}
				onSelectModeToggle={handleSelectMode}
				label={selectAllActionsLabel}
				{paginatedSelectAllAction}
				{paginatedSelectAllText}
				promotedActions={promotedBulkActions}
				actions={bulkActions}
				disabled={loading}
				accessibilityLabel={bulkActionsAccessibilityLabel}
				selected={selectAllSelectState}
				onToggleAll={handleToggleAll}
				bind:ref={checkableButtonRef}
				buttonSize="medium"
			/>
		</div>
	{/if}
{/snippet}

{#snippet filterControlMarkup()}
	<div class={classNames(!flushFilters && styles.FiltersWrapper)}>
		{@render filterControl?.()}
	</div>
{/snippet}

{#snippet renderVueNode(vueNode: VueNode)}
	{#if isSvelteConstruct(vueNode)}
		{@render vueNode()}
	{:else}
		{vueNode}
	{/if}
{/snippet}

{#snippet sortingSelectMarkup()}
	{#if sortOptions && sortOptions.length > 0 && !alternateTool}
		<div class={styles.SortWrapper}>
			<Select
				label="Sort by"
				labelInline={!smallScreen}
				labelHidden={smallScreen}
				options={sortOptions}
				onChange={onSortChange}
				value={sortValue}
				disabled={selectMode}
			/>
		</div>
	{/if}
{/snippet}

{#snippet alternateToolMarkup()}
	{#if alternateTool && !sortOptions}
		<div class={styles.AlternateToolWrapper}>
			{@render renderVueNode(alternateTool)}
		</div>
	{/if}
{/snippet}

{#snippet headerTitleMarkup()}
	<div class={styles.HeaderTitleWrapper}>
		<Text as="span" variant="bodyMd">
			{headerTitle}
		</Text>
	</div>
{/snippet}

{#snippet selectButtonMarkup()}
	{#if isSelectable}
		<div class={styles.SelectButtonWrapper}>
			<Button disabled={selectMode} icon={CheckboxIcon} onClick={() => handleSelectMode(true)}>
				Select
			</Button>
		</div>
	{/if}
{/snippet}

{#snippet checkableButtonMarkup()}
	{#if isSelectable}
		<div class={styles.CheckableButtonWrapper}>
			<CheckableButton
				accessibilityLabel={bulkActionsAccessibilityLabel}
				label={headerTitle}
				onToggleAll={handleToggleAll}
				disabled={loading}
				ref={checkableButtonRef}
				selected={selectAllSelectState}
			/>
		</div>
	{/if}
{/snippet}

{#snippet headerWrapperOverlay()}
	{#if loading}
		<div class={styles['HeaderWrapper-overlay']}></div>
	{/if}
{/snippet}

{#snippet headerMarkup()}
	{#if !showEmptyState && showHeader !== false && !showEmptySearchState && (showHeader || needsHeader) && listRef}
		<div class={styles.HeaderOuterWrapper}>
			<Sticky bind:isSticky boundingElement={listRef}>
				<div class={headerClassName}>
					{@render headerWrapperOverlay()}
					<div class={styles.HeaderContentWrapper}>
						{@render headerTitleMarkup()}
						{@render checkableButtonMarkup()}
						{@render alternateToolMarkup()}
						{@render sortingSelectMarkup()}
						{@render selectButtonMarkup()}
					</div>
					{@render bulkActionsMarkup()}
				</div>
			</Sticky>
		</div>
	{/if}
{/snippet}

{#snippet emptySearchStateMarkup()}
	{#if showEmptySearchState}
		{#if emptySearchState}
			{@render emptySearchState()}
		{:else}
			<div class={styles.EmptySearchResultWrapper}>
				<EmptySearchResult {...emptySearchResultText} withIllustration />
			</div>
		{/if}
	{/if}
{/snippet}

{#snippet emptyStateMarkup()}
	{#if showEmptyState}
		{@render emptyState?.()}
	{/if}
{/snippet}

{#snippet loadingOverlay()}
	{#if loading}
		<li class={styles.SpinnerContainer} style={applyStyles(spinnerStyle)}>
			<Spinner size={spinnerSize} accessibilityLabel="Items are loading" />
		</li>
		<li class={styles.LoadingOverlay}></li>
	{/if}
{/snippet}

{#snippet loadingWithoutItemsMarkup()}
	{#if loading && !itemsExist}
		<div class={className} tabIndex={-1}>
			{@render loadingOverlay()}
		</div>
	{/if}
{/snippet}

{#snippet listMarkup()}
	{#if itemsExist}
		<ul class={resourceListClassName} bind:this={listRef} aria-live="polite" aria-busy={loading}>
			{@render loadingOverlay()}
			<!-- {items.map(renderItemWithId)} -->
			{#each items as item}
				{@render renderItem(item)}
			{/each}
		</ul>
	{/if}
{/snippet}

{#snippet paginationMarkup()}
	{#if pagination}
		<div class={styles.PaginationWrapper}>
			<Pagination type="table" {...pagination} />
		</div>
	{/if}
{/snippet}

<ResourcelistContextProvider value={context}>
	{@render filterControlMarkup()}
	<div class={styles.ResourceListWrapper}>
		{@render headerMarkup()}
		{@render listMarkup()}
		{@render emptySearchStateMarkup()}
		{@render emptyStateMarkup()}
		{@render loadingWithoutItemsMarkup()}
		{@render paginationMarkup()}
	</div>
</ResourcelistContextProvider>
