<script lang="ts">
	import type { TooltipOverlayProps } from '../tooltip/components/tooltip-overlay/types.js';
	import type { BorderRadius, Padding } from '../tooltip/types.js';
	import type { IndexTableBaseProps, IndexTableHeading, IndexTableSortDirection } from './types.js';
	import Text from '../text/text.svelte';
	import InlineStack from '../inline-stack/inline-stack.svelte';
	import Badge from '../badge/badge.svelte';
	import { applyStyles, classNames } from '$utilities/css.js';
	import styles from './index-table.module.css';
	import Tooltip from '../tooltip/tooltip.svelte';
	import UnstyledButton from '../button/unstyled-button.svelte';
	import SortAscendingIcon from '@shopify/polaris-icons/dist/svg/SortAscendingIcon.svg?component';
	import SortDescendingIcon from '@shopify/polaris-icons/dist/svg/SortDescendingIcon.svg?component';
	import { useContext } from '$utilities/contexts.js';
	import { INDEX_CONTEXT_KEY } from '$utilities/index-provider/hooks.js';
	import type { IndexContextType } from '$utilities/index-provider/context.js';

	interface Props {
		heading: IndexTableHeading;
		index: number;
		sortColumnIndex?: IndexTableBaseProps['sortColumnIndex'];
		onSort?: IndexTableBaseProps['onSort'];
		sortDirection?: IndexTableBaseProps['sortDirection'];
		defaultSortDirection?: IndexTableBaseProps['defaultSortDirection'];
		sortToggleLabels?: IndexTableBaseProps['sortToggleLabels'];
		selectable?: IndexTableBaseProps['selectable'];
		sortable?: IndexTableBaseProps['sortable'];
	}

	let {
		heading,
		index,
		sortColumnIndex,
		onSort,
		sortDirection,
		defaultSortDirection = 'descending',
		sortToggleLabels,
		sortable
	}: Props = $props();
	let renderAfterSelectEvent = $state(false);
	let hasSelected = $state(false);
	let lastSortedColumnIndex = $state<number | undefined>(sortColumnIndex);
	let newDirection: IndexTableSortDirection = heading.defaultSortDirection ?? defaultSortDirection;

	const defaultTooltipProps = $derived({
		width: heading.tooltipWidth ?? 'default',
		activatorWrapper: 'div',
		dismissOnMouseOut: true,
		persistOnClick: heading.tooltipPersistsOnClick
	});

	const defaultHeaderTooltipProps = $derived({
		...defaultTooltipProps,
		padding: '400' as Padding,
		borderRadius: '200' as BorderRadius,
		content: heading.tooltipContent ?? '',
		preferredPosition: 'above' as TooltipOverlayProps['preferredPosition']
	});

	const style = $derived({
		'--pc-index-table-heading-extra-padding-right': heading.paddingBlockEnd
			? `var(--p-space-${heading.paddingBlockEnd})`
			: '0'
	});

	function handleSortHeadingClick(index: number, direction: IndexTableSortDirection) {
		renderAfterSelectEvent = false;
		hasSelected = false;
		lastSortedColumnIndex = sortColumnIndex;
		onSort?.(index, direction);
	}

	const useIndexValue = useContext<IndexContextType>(INDEX_CONTEXT_KEY);
	const {
		selectMode,
		selectedItemsCount,
	} = $derived(useIndexValue()!);
	const isCurrentlySorted = index === sortColumnIndex;
	const tooltipDirection = isCurrentlySorted ? sortDirection! : newDirection;
	const sortTooltipContent = sortToggleLabels?.[index][tooltipDirection];
	const isPreviouslySorted = $derived(!isCurrentlySorted && index === lastSortedColumnIndex);
	const isRenderAfterSelectEvent = $derived(
		renderAfterSelectEvent || (!hasSelected && selectedItemsCount !== 0)
	);

	const defaultSortButtonProps = $derived({
		onClick: () => handleSortHeadingClick(index, newDirection),
		className: classNames(
			styles.TableHeadingSortButton,
			!isCurrentlySorted &&
				heading?.alignment === 'end' &&
				styles['TableHeadingSortButton-heading-align-end'],
			isCurrentlySorted &&
				heading?.alignment === 'end' &&
				styles['TableHeadingSortButton-heading-align-end-currently-sorted'],
			isPreviouslySorted &&
				!isRenderAfterSelectEvent &&
				heading?.alignment === 'end' &&
				styles['TableHeadingSortButton-heading-align-end-previously-sorted']
		),
		tabIndex: selectMode ? -1 : 0
	});

	const isAscending = sortDirection === 'ascending';

	let SourceComponent = $derived.by(() => {
		let component = newDirection === 'ascending' ? SortAscendingIcon : SortDescendingIcon;
		if (isCurrentlySorted) {
			newDirection = isAscending ? 'descending' : 'ascending';
			component = sortDirection === 'ascending' ? SortAscendingIcon : SortDescendingIcon;
		}
		return component;
	});
</script>

{#snippet headingTitle()}
	<Text as="span" variant="bodySm" fontWeight="medium" visuallyHidden={heading.hidden}>
		{heading.title}
	</Text>
{/snippet}

{#snippet headingContent()}
	{#if heading.new}
		<InlineStack wrap={false} align="center">
			{@render headingTitle()}
			<Badge tone="new">New</Badge>
		</InlineStack>
	{:else}
		{@render headingTitle()}
	{/if}
{/snippet}

{#snippet iconMarkup()}
	<span
		class={classNames(
			styles.TableHeadingSortIcon,
			heading?.alignment === 'end' && styles['TableHeadingSortIcon-heading-align-end'],
			isCurrentlySorted && styles['TableHeadingSortIcon-visible']
		)}
	>
		<SourceComponent focusable="false" aria-hidden="true" className={styles.TableHeadingSortSvg} />
	</span>
{/snippet}

{#snippet sortMarkup()}
	<UnstyledButton {...defaultSortButtonProps}>
		{@render iconMarkup()}
		<span
			class={classNames(
				sortToggleLabels &&
					selectMode &&
					heading.tooltipContent &&
					styles.TableHeadingTooltipUnderlinePlaceholder
			)}
		>
			{@render headingContent()}
		</span>
	</UnstyledButton>
{/snippet}

{#if sortable?.[index]}
	{#if !sortToggleLabels || selectMode}
		<div class={styles.SortableTableHeadingWithCustomMarkup}>
			{@render sortMarkup()}
		</div>
	{:else if !heading.tooltipContent}
		{#if sortTooltipContent}
			<div
				style={applyStyles(style)}
				class={classNames(heading.paddingBlockEnd && styles['TableHeading-extra-padding-right'])}
			>
				<Tooltip {...defaultTooltipProps} content={sortTooltipContent} preferredPosition="above">
					{@render sortMarkup()}
				</Tooltip>
			</div>
		{/if}
	{:else}
		<div
			class={classNames(
				styles.SortableTableHeadingWithCustomMarkup,
				heading.paddingBlockEnd && styles['TableHeading-extra-padding-right']
			)}
			style={applyStyles(style)}
		>
			<UnstyledButton {...defaultSortButtonProps}>
				<Tooltip {...defaultHeaderTooltipProps}>
					<span class={styles.TableHeadingUnderline}>
						{@render headingContent()}
					</span>
				</Tooltip>

				{#if sortTooltipContent}
					<Tooltip {...defaultTooltipProps} content={sortTooltipContent} preferredPosition="above">
						{@render iconMarkup()}
					</Tooltip>
				{/if}
			</UnstyledButton>
		</div>
	{/if}
{:else if heading.tooltipContent}
	<div
		style={applyStyles(style)}
		class={classNames(heading.paddingBlockEnd && styles['TableHeading-extra-padding-right'])}
	>
		<Tooltip {...defaultHeaderTooltipProps} activatorWrapper="span">
			<span class={classNames(styles.TableHeadingUnderline, styles.SortableTableHeaderWrapper)}>
				{@render headingContent()}
			</span>
		</Tooltip>
	</div>
{:else}
	<div
		style={applyStyles(style)}
		class={classNames(heading.paddingBlockEnd && styles['TableHeading-extra-padding-right'])}
	>
		{@render headingContent()}
	</div>
{/if}
