<script lang="ts">
	import type { Snippet } from 'svelte';
	import IndexContextProvider from '../app-provider/index-context-provider.svelte';
	import IndexSelectionChangeContextProvider from '../app-provider/index-selection-change-context-provider.svelte';
	import IndexRowContextProvider from '../app-provider/index-row-context-provider.svelte';
	import type { IndexProviderProps } from '$utilities/index-provider/types.js';
	import { useBulkSelectionData, useHandleBulkSelection } from '$utilities/index-provider/hooks.js';

	let {
		children,
		resourceName: passedResourceName,
		loading,
		onSelectionChange,
		selectedItemsCount = 0,
		itemCount,
		hasMoreItems,
		condensed,
		selectable: isSelectableIndex = true,
		paginatedSelectAllText: defaultPaginatedSelectAllText
	}: IndexProviderProps = $props();

	const {
		paginatedSelectAllText,
		bulkActionsLabel,
		bulkActionsAccessibilityLabel,
		resourceName,
		selectMode,
		bulkSelectState
	} = useBulkSelectionData({
		selectedItemsCount,
		itemCount,
		hasMoreItems,
		resourceName: passedResourceName,
		defaultPaginatedSelectAllText
	});

	const handleSelectionChange = useHandleBulkSelection({ onSelectionChange });

	const contextValue = $derived({
		itemCount,
		selectMode: selectMode && isSelectableIndex,
		selectable: isSelectableIndex,
		resourceName,
		loading,
		paginatedSelectAllText,
		hasMoreItems,
		bulkActionsLabel,
		bulkActionsAccessibilityLabel,
		bulkSelectState,
		selectedItemsCount,
		condensed
	});

    const rowContextValue = $derived({
        selectable: isSelectableIndex,
        selectMode: selectMode && isSelectableIndex,
        condensed
    })
</script>

<IndexContextProvider value={contextValue}>
	<IndexRowContextProvider value={rowContextValue}>
		<IndexSelectionChangeContextProvider value={handleSelectionChange}>
			{children}
		</IndexSelectionChangeContextProvider>
	</IndexRowContextProvider>
</IndexContextProvider>
