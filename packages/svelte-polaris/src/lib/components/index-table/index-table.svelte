<script lang="ts">
	import IndexProvider from '../index-provider/index-provider.svelte';
	import IndexTableBase from './index-table-base.svelte';
	import type { IndexTableProps } from './types.js';
	let {
		children,
		selectable = true,
		itemCount,
		selectedItemsCount = 0,
		resourceName: passedResourceName,
		loading,
		hasMoreItems,
		condensed = $bindable(),
		onSelectionChange,
		paginatedSelectAllText,
		...restProps
	}: IndexTableProps = $props();
</script>

<IndexProvider
	selectable={selectable && !condensed}
	{itemCount}
	{selectedItemsCount}
	resourceName={passedResourceName}
	{loading}
	{hasMoreItems}
	{condensed}
	{onSelectionChange}
	{paginatedSelectAllText}
>
	<IndexTableBase {...restProps}>
		{@render children?.()}
	</IndexTableBase>
</IndexProvider>
