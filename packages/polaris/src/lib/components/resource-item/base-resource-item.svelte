<script lang="ts">
	import { SELECT_ALL_ITEMS } from '$utilities/index-provider/types.js';
	import type { ResourceListSelectedItems, SvelteNode } from '$utilities/types.js';
	import type { Alignment, CombinedProps, State } from './types.js';
	import Checkbox from '../checkbox/checkbox.svelte';
	import styles from './resource-item.module.css';
	import InlineStack from '../inline-stack/inline-stack.svelte';
	import { classNames } from '$utilities/css.js';
	import UnstyledLink from '../unstyled-link/unstyled-link.svelte';
	import Box from '../box/box.svelte';
	import InlineGrid from '../inline-grid/inline-grid.svelte';
	import type { InlineStackProps } from '../inline-stack/types.js';
	import ButtonGroup from '../button-group/button-group.svelte';
	import ButtonFrom from '../button/button-from.svelte';
	import Popover from '../popover/popover.svelte';
	import ActionList from '../action-list/action-list.svelte';
	import Button from '../button/button.svelte';
	import MenuHorizontalIcon from '@shopify/polaris-icons/dist/svg/MenuHorizontalIcon.svg?component';
	import { isSvelteConstruct } from '../page/components/page-header/types.js';

	let {
		id,
		children,
		url,
		external,
		media,
		shortcutActions,
		ariaControls,
		ariaExpanded,
		persistActions = false,
		accessibilityLabel,
		name,
		context,
		verticalAlignment,
		dataHref,
		breakpoints,
		onMouseOver,
		disabled,
		sortOrder,
		onClick,
		onMouseOut
	}: CombinedProps = $props();

	const {
		selectable,
		selectMode,
		hasBulkActions,
		loading,
		resourceName,
		onSelectionChange,
		selectedItems
	} = $derived(context);

	function isSelected(id: string, selectedItems?: ResourceListSelectedItems) {
		return Boolean(
			selectedItems &&
				((Array.isArray(selectedItems) && selectedItems.includes(id)) ||
					selectedItems === SELECT_ALL_ITEMS)
		);
	}

	let states: State = $derived({
		actionsMenuVisible: false,
		focused: false,
		focusedInner: false,
		selected: isSelected(id, selectedItems)
	});

	let node: HTMLDivElement | null = null;
	let overlayRef = $state<HTMLAnchorElement>();
	let buttonOverlay = $state<HTMLButtonElement>();
	const { actionsMenuVisible, focused, focusedInner, selected } = $derived(states);
	const checkboxAccessibilityLabel = name || accessibilityLabel || 'checkbox';

	$effect(() => {
		const newSelected = isSelected(id, selectedItems);
		if (states.selected !== newSelected) {
			states.selected = newSelected;
		}
	});

	function stopPropagation(event: Event) {
		event.stopPropagation();
	}

	function handleLargerSelectionArea(event: Event) {
		event.stopPropagation();
		handleSelection(states.selected, (event as MouseEvent).shiftKey);
	}

	const className = $derived(
		classNames(
			styles.ResourceItem,
			focused && styles.focused,
			selectable && styles.selectable,
			selected && styles.selected,
			selectMode && styles.selectMode,
			persistActions && styles.persistActions,
			focusedInner && styles.focusedInner,
			disabled && styles.disabled
		)
	);

	const listItemClassName = $derived(
		classNames(
			styles.ListItem,
			focused && !focusedInner && styles.focused,
			hasBulkActions && styles.hasBulkActions,
			selected && styles.selected,
			selectable && styles.selectable
		)
	);

	const tabIndex = $derived(loading ? -1 : 0);
	const ariaLabel = $derived(
		accessibilityLabel ||
			`View details for ${name || (resourceName && resourceName.singular) || ''}`
	);

	function getAlignment(alignment?: Alignment): InlineStackProps['blockAlign'] {
		switch (alignment) {
			case 'leading':
				return 'start';
			case 'trailing':
				return 'end';
			case 'center':
				return 'center';
			case 'fill':
				return 'stretch';
			case 'baseline':
				return 'baseline';
			default:
				return 'start';
		}
	}

	const handleFocus = (event: FocusEvent) => {
		if (event.target === buttonOverlay || (node && event.target === overlayRef)) {
			states.focused = true;
			states.focusedInner = false;
		} else if (node && node.contains(event.target as Node)) {
			states.focused = true;
			states.focusedInner = true;
		}
	};

	const handleBlur = ({ relatedTarget }: FocusEvent) => {
		if (node && relatedTarget instanceof Node && node.contains(relatedTarget)) {
			return;
		}

		states.focused = false;
		states.focusedInner = false;
	};

	const handleMouseOut = () => {
		states.focused && (states.focused = false);
		states.focusedInner && (states.focusedInner = false);
		if (onMouseOut) {
			onMouseOut();
		}
	};

	const handleSelection = (value: boolean, shiftKey: boolean) => {
		if (id == null || onSelectionChange == null) {
			return;
		}

		states.focused = value;
		states.focusedInner = value;
		onSelectionChange?.(value, id, sortOrder, shiftKey);
	};

	const handleClick = (event: MouseEvent) => {
		stopPropagation(event);
		const { ctrlKey, metaKey } = event;
		const anchor = node && node.querySelector('a');

		if (selectMode) {
			handleLargerSelectionArea(event);
			return;
		}

		if (anchor === event.target) {
			return;
		}

		if (onClick) {
			onClick(id);
		}

		if (url && (ctrlKey || metaKey)) {
			window.open(url, '_blank');
			return;
		}

		if (url && anchor) {
			anchor.click();
		}
	};

	// This fires onClick when there is a URL on the item
	const handleKeyUp = (event: KeyboardEvent) => {
		const { key } = event;

		if (key === 'Enter' && url && !selectMode && !disabled) {
			onClick?.();
		}
	};

	const handleActionsClick = () => {
		states.actionsMenuVisible = !states.actionsMenuVisible;
	};

	const handleCloseRequest = () => {
		states.actionsMenuVisible = false;
	};
</script>

{#snippet handleMarkup()}
	{#if selectable}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="CheckboxWrapper" onclick={stopPropagation} onchange={handleLargerSelectionArea}>
			<Checkbox
				{id}
				label={checkboxAccessibilityLabel}
				labelHidden
				checked={selected}
				disabled={loading || disabled}
				bleedInlineStart="300"
				bleedInlineEnd="300"
				bleedBlockStart="300"
				bleedBlockEnd="300"
				fill
				labelClassName={styles.CheckboxLabel}
			/>
		</div>
	{/if}
{/snippet}

{#snippet renderSvelteNode(SvelteNode: SvelteNode)}
	{#if isSvelteConstruct(SvelteNode)}
		{@render SvelteNode()}
	{:else}
		{SvelteNode}
	{/if}
{/snippet}

{#snippet ownedMarkup()}
	{#if media || selectable}
		<InlineStack
			gap="300"
			blockAlign={media && selectable ? 'center' : getAlignment(verticalAlignment)}
		>
			{@render handleMarkup()}
			{#if media}
				{@render renderSvelteNode(media)}
			{/if}
		</InlineStack>
	{/if}
{/snippet}

{#snippet actionsMarkup()}
	{#if shortcutActions && !loading}
		{#if persistActions}{/if}
	{/if}
{/snippet}

{#snippet accessibleMarkup()}
	{#if url}
		<UnstyledLink
			aria-describedby={id}
			aria-label={ariaLabel}
			className={styles.Link}
			{url}
			{external}
			{tabIndex}
			{id}
			ref={overlayRef}
		/>
	{:else}
		<button
			class={styles.Button}
			aria-label={ariaLabel}
			aria-controls={ariaControls}
			aria-expanded={ariaExpanded}
			onclick={handleClick}
			tabindex={tabIndex}
			bind:this={buttonOverlay}
		></button>
	{/if}
{/snippet}

{#snippet containerMarkup()}
	<Box
		{id}
		position="relative"
		paddingInlineStart="300"
		paddingInlineEnd="300"
		paddingBlockStart="300"
		paddingBlockEnd="300"
		zIndex="var(--pc-resource-item-content-stacking-order)"
	>
		<InlineGrid columns={{ xs: '1fr auto' }}>
			<InlineGrid columns={{ xs: media || selectable ? 'auto 1fr' : '1fr' }} gap="300">
				{@render ownedMarkup()}
				<InlineStack blockAlign={getAlignment(verticalAlignment)}>
					<Box width="100%" padding="0">
						{@render children?.()}
					</Box>
				</InlineStack>
			</InlineGrid>

			<!-- {@render actionsMarkup()}
			{@render disclosureMarkup()} -->
			{#if shortcutActions && !loading}
				{#if persistActions}
					{#if breakpoints?.lgUp}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div class={styles.Actions} onclick={stopPropagation}>
							<ButtonGroup>
								<ButtonFrom action={shortcutActions[1]} overrides={{ variant: 'tertiary' }} />
							</ButtonGroup>
						</div>
					{/if}

					{#if !selectMode && breakpoints?.lgDown}
						{@const disclosureAccessibilityLabel = name
							? `Actions for ${accessibilityLabel}`
							: `Actions dropdown`}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div onclick={stopPropagation}>
							<Popover onClose={handleCloseRequest} active={actionsMenuVisible}>
								{#snippet trigger()}
									<Button
										accessibilityLabel={disclosureAccessibilityLabel}
										onClick={handleActionsClick}
										variant="tertiary"
										icon={MenuHorizontalIcon}
									/>
								{/snippet}
								<ActionList items={shortcutActions} />
							</Popover>
						</div>
					{/if}
				{:else}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div class={styles.Actions} onclick={stopPropagation}>
						<Box position="absolute" insetBlockStart="400" insetInlineEnd="500">
							<ButtonGroup variant="segmented">
								<ButtonFrom action={shortcutActions[1]} overrides={{ variant: 'tertiary' }} />
							</ButtonGroup>
						</Box>
					</div>
				{/if}
			{/if}
		</InlineGrid>
	</Box>
{/snippet}

<li class={listItemClassName} data-href={dataHref}>
	<div class={styles.ItemWrapper}>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			bind:this={node}
			class={className}
			onclick={disabled ? () => {} : handleClick}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeyup={handleKeyUp}
			onmouseover={onMouseOver}
			onmouseout={handleMouseOut}
			data-href={url}
		>
			{#if !disabled}
				{@render accessibleMarkup()}
			{/if}
			{@render containerMarkup()}
		</div>
	</div>
</li>
