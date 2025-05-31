<script lang="ts">
	import { applyStyles, classNames } from '$utilities/css.js';
	import styles from './filters.module.css';
	import {
		defaultFilterStyles,
		defaultStyle,
		transitionFilterStyles,
		transitionStyles,
		type FiltersProps
	} from './types.js';
	import FiltersBar from './components/filter-bar/filter-bar.svelte';
	import Box from '../box/box.svelte';
	import InlineStack from '../inline-stack/inline-stack.svelte';
	import SearchField from './components/search-field/search-field.svelte';

	let {
		queryValue,
		queryPlaceholder,
		focused,
		filters,
		appliedFilters,
		onQueryChange,
		onQueryClear,
		onQueryBlur,
		onQueryFocus,
		onClearAll,
		children,
		disabled,
		hideFilters,
		hideQueryField,
		disableQueryField,
		borderlessQueryField,
		loading,
		disableFilters,
		mountedState,
		onAddFilterClick,
		closeOnChildOverlayClick,
		selectedViewName
	}: FiltersProps = $props();

	const hideFilterBar = $derived(hideFilters || filters.length === 0);

	const mountedStateStyles = $derived(
		mountedState && !hideQueryField
			? {
					...defaultFilterStyles,
					...transitionFilterStyles[mountedState]
				}
			: undefined
	);
</script>

{#snippet queryFieldMarkup()}
	{#if !hideQueryField}
		<div class={styles.Container}>
			<Box padding="200">
				<InlineStack
					align="start"
					blockAlign="center"
					gap={{
						xs: '400',
						md: '300'
					}}
				>
					<div
						class={styles.SearchField}
						style={mountedState
							? applyStyles({
									...defaultStyle,
									...transitionStyles[mountedState]
								})
							: undefined}
					>
						<SearchField
							onChange={onQueryChange}
							onFocus={onQueryFocus}
							onBlur={onQueryBlur}
							onClear={onQueryClear}
							value={queryValue}
							placeholder={queryPlaceholder}
							{focused}
							disabled={disabled || disableQueryField}
							{borderlessQueryField}
							{loading}
							{selectedViewName}
						/>
					</div>
					{@render children?.()}
				</InlineStack>
			</Box>
		</div>
	{/if}
{/snippet}

{#snippet filtersMarkup()}
	{#if !hideFilterBar}
		<FiltersBar
			{filters}
			{appliedFilters}
			{onClearAll}
			{disabled}
			{hideQueryField}
			{disableFilters}
			{onAddFilterClick}
			{closeOnChildOverlayClick}
			{mountedStateStyles}
		>
			{@render children?.()}
		</FiltersBar>
	{/if}
{/snippet}

<div class={classNames(styles.Filters, hideQueryField && styles.hideQueryField)}>
	{@render queryFieldMarkup()}
	{@render filtersMarkup()}
</div>
