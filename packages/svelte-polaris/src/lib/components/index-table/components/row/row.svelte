<script lang="ts">
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import { INDEX_ROW_CONTEXT_KEY, INDEX_SELECTION_CHANGE_CONTEXT_KEY } from '$utilities/index-provider/hooks.js';
	import { SelectionType, type HandleSelectionChange } from '$utilities/index-provider/types.js';
	import styles from '../../index-table.module.css';
	import type { RowProps, TableRowElementType } from './types.js';
	import type { Range } from '../../../../use/use-index-resource-state.svelte.js';
	import { classNames, variationName } from '$utilities/css.js';
	import Cell from '../cell/cell.svelte';
	import Checkbox from '../checkbox/checkbox.svelte';
	import RowContextProvider from '$lib/components/app-provider/row-context-provider.svelte';
	import RowHoveredContextProvider from '$lib/components/app-provider/row-hovered-context-provider.svelte';
	import { useContext } from '$utilities/contexts.js';
	import type { IndexRowContextType } from '$utilities/index-provider/context.js';

	let {
		children,
		hideSelectable,
		selected,
		id,
		position,
		tone,
		disabled,
		selectionRange,
		rowType = 'data',
		accessibilityLabel,
		onNavigation,
		onClick
	}: RowProps = $props();

	const useIndexRow = useContext<IndexRowContextType>(INDEX_ROW_CONTEXT_KEY);
	const { selectable: tableIsSelectable, selectMode, condensed } = $derived(useIndexRow());
	const rowIsSelectable = $derived(tableIsSelectable && !hideSelectable);
	const useIndexSelectionChange = useContext<HandleSelectionChange>(INDEX_SELECTION_CHANGE_CONTEXT_KEY);
	const onSelectionChange = $derived(useIndexSelectionChange());

	let hovered = new UseToggle(false);
	const setHoverIn = hovered.setTrue;
	const setHoverOut = hovered.setFalse;

	const handleInteraction = (event: MouseEvent | KeyboardEvent) => {
		event.stopPropagation();
		let selectionType = SelectionType.Single;

		if (disabled || !rowIsSelectable || ('key' in event && event.key !== ' ') || !onSelectionChange)
			return;

		if (event.shiftKey) {
			selectionType = SelectionType.Multi;
		} else if (selectionRange) {
			selectionType = SelectionType.Range;
		}

		const selection: string | Range = selectionRange ?? id;
		onSelectionChange(selectionType, !selected, selection, position);
	};

	const contextValue = $derived({
		itemId: id,
		selected,
		position,
		onInteraction: handleInteraction,
		disabled
	});

	let primaryLinkElement = $state<HTMLAnchorElement | null>(null);
	let isNavigating = $state<boolean>(false);
	let tableRowRef = $state<TableRowElementType | null>(null);

	let tableRowCallbackRef = (node: TableRowElementType) => {
		tableRowRef = node;

		const el = node?.querySelector('[data-primary-link]');

		if (el) {
			primaryLinkElement = el as HTMLAnchorElement;
		}
	};

	const rowClassName = $derived(
		classNames(
			styles.TableRow,
			rowType === 'subheader' && styles['TableRow-subheader'],
			rowType === 'child' && styles['TableRow-child'],
			rowIsSelectable && condensed && styles.condensedRow,
			selected && styles['TableRow-selected'],
			hovered && !condensed && styles['TableRow-hovered'],
			disabled && styles['TableRow-disabled'],
			tone && styles[variationName('tone', tone)],
			!rowIsSelectable && !onClick && !primaryLinkElement && styles['TableRow-unclickable']
		)
	);

	const RowWrapper = $derived(condensed ? 'li' : 'tr');

	const handleRowClick = (event: MouseEvent) => {
		if ((!disabled && rowIsSelectable) || onClick || primaryLinkElement) {
			if (rowType === 'subheader') return;

			if (!tableRowRef || isNavigating) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();

			if (onClick) {
				onClick();
				return;
			}

			if (primaryLinkElement && !selectMode) {
				isNavigating = true;
				const { ctrlKey, metaKey } = event;

				if (onNavigation) {
					onNavigation(id);
				}

				if ((ctrlKey || metaKey) && primaryLinkElement instanceof HTMLAnchorElement) {
					isNavigating = false;
					window.open(primaryLinkElement.href, '_blank');
					return;
				}

				primaryLinkElement.dispatchEvent(new MouseEvent(event.type, event));
			} else {
				isNavigating = false;
				handleInteraction(event);
			}
		}
	};
</script>

{#snippet checkboxMarkup()}
	{#if hideSelectable}
		<Cell />
	{:else}
		<Checkbox {accessibilityLabel} />
	{/if}
{/snippet}

<RowContextProvider value={contextValue}>
	<RowHoveredContextProvider value={hovered.value}>
		<svelte:element
			this={RowWrapper}
			{id}
			use:tableRowCallbackRef
			class={rowClassName}
			onmouseenter={setHoverIn}
			onmouseleave={setHoverOut}
			onclick={handleRowClick}
			role="row"
			tabindex={rowIsSelectable ? 0 : undefined}
		>
			{#if tableIsSelectable}
				{@render checkboxMarkup?.()}
			{/if}
			{@render children?.()}
		</svelte:element>
	</RowHoveredContextProvider>
</RowContextProvider>
