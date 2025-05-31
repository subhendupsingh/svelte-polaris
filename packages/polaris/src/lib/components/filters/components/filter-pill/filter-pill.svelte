<script lang="ts">
	import Icon from '$lib/components/icon/icon.svelte';
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import { classNames } from '$utilities/css.js';
	import ChevronDownIcon from '@shopify/polaris-icons/dist/svg/ChevronDownIcon.svg?component';
	import styles from './filter-pill.module.css';
	import type { FilterPillProps } from './types.js';
	import Box from '$lib/components/box/box.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import Text from '$lib/components/text/text.svelte';
	import Button from '$lib/components/button/button.svelte';
	import XSmallIcon from '@shopify/polaris-icons/dist/svg/XSmallIcon.svg?component';
	import UnstyledButton from '$lib/components/button/unstyled-button.svelte';
	import Popover from '$lib/components/popover/index.js';
	import BlockStack from '$lib/components/block-stack/block-stack.svelte';
	import { getContext, type Snippet } from 'svelte';
	import type { VueNode } from '$utilities/types.js';
	import { isSvelteConstruct } from '$lib/components/page/components/page-header/types.js';

	let {
		unsavedChanges = false,
		filterKey,
		label,
		filter,
		disabled,
		hideClearButton,
		selected,
		initialActive,
		disclosureZIndexOverride,
		closeOnChildOverlayClick,
		onRemove,
		onClick
	}: FilterPillProps = $props();

	let elementRef = $state<HTMLDivElement>();
	const focused = new UseToggle(false);
	const setFocusedTrue = focused.setTrue;
	const setFocusedFalse = focused.setFalse;
	let popoverActive = $derived(initialActive);

	const setScroll = (node: Node) => {
		if (!node || !popoverActive) {
			return;
		}

		const parent = node.parentElement?.parentElement;

		if (!parent) {
			return;
		}

		parent.scroll?.({
			left: (node as HTMLElement).offsetLeft
		});
	};

	const togglePopoverActive = () => {
		if (filter) {
			popoverActive = !popoverActive;
		}

		if (onClick) {
			onClick(filterKey);
		}
	};

	const handlePopoverClose = () => {
		togglePopoverActive();
		if (!selected) {
			onRemove?.(filterKey);
		}
	};

	const handleClear = () => {
		if (onRemove) onRemove(filterKey);
		popoverActive = false;
	};

	const buttonClasses = $derived(
		classNames(
			styles.FilterButton,
			selected && styles.ActiveFilterButton,
			popoverActive && styles.FocusFilterButton,
			focused && styles.focusedFilterButton
		)
	);

	const clearButtonClassNames = $derived(classNames(styles.PlainButton, styles.clearButton));

	const toggleButtonClassNames = $derived(classNames(styles.PlainButton, styles.ToggleButton));
</script>

{#snippet disclosureMarkup()}
	{#if !selected}
		<div class={styles.IconWrapper}>
			<Icon source={ChevronDownIcon} tone="base" />
		</div>
	{/if}
{/snippet}

{#snippet labelMarkup()}
	<Box paddingInlineStart={unsavedChanges ? '0' : '050'}>
		<InlineStack>
			<Text variant="bodySm" as="span">
				{label}
			</Text>
		</InlineStack>
	</Box>
{/snippet}

{#snippet unsavedPip()}
	{#if unsavedChanges}
		<Box paddingInlineEnd="150">
			<Box background="bg-fill-emphasis" borderRadius="050" width="6px" minHeight="6px" />
		</Box>
	{/if}
{/snippet}

{#snippet removeFilterButtonMarkup()}
	{#if selected}
		<UnstyledButton
			onClick={handleClear}
			class={clearButtonClassNames}
			type="button"
			aria-label="Clear"
		>
			<div class={styles.IconWrapper}>
				<Icon source={XSmallIcon} tone="base" />
			</div>
		</UnstyledButton>
	{/if}
{/snippet}

{#snippet activator()}
	<div class={buttonClasses}>
		<InlineStack gap="0" wrap={false}>
			<UnstyledButton
				onFocus={setFocusedTrue}
				onBlur={setFocusedFalse}
				onClick={togglePopoverActive}
				class={toggleButtonClassNames}
				type="button"
				accessibilityLabel={unsavedChanges ? `Unsaved changes - ${label}` : label}
			>
				<InlineStack wrap={false} align="center" blockAlign="center" gap="0">
					{@render unsavedPip()}
					{@render labelMarkup()}
					{@render disclosureMarkup()}
				</InlineStack>
			</UnstyledButton>

			{@render removeFilterButtonMarkup()}
		</InlineStack>
	</div>
{/snippet}

{#snippet clearButtonMarkup()}
	{#if !hideClearButton}
		<div class={styles.ClearButtonWrapper}>
			<Button onClick={handleClear} variant="plain" disabled={!selected} textAlign="left">
				Clear
			</Button>
		</div>
	{/if}
{/snippet}

{#snippet renderVueNode(vueNode: VueNode)}
	{#if isSvelteConstruct(vueNode)}
		{@render vueNode()}
	{:else}
		{vueNode}
	{/if}
{/snippet}

{#if !disabled}
	<div use:setScroll bind:this={elementRef}>
		<Popover
			active={popoverActive}
			onClose={handlePopoverClose}
			preferredAlignment="left"
			zIndexOverride={disclosureZIndexOverride}
			preventCloseOnChildOverlayClick={!closeOnChildOverlayClick}
		>
			{#snippet trigger()}
				{@render activator()}
			{/snippet}

			<div class={styles.PopoverWrapper}>
				<Popover.Section>
					<BlockStack gap="100">
						{@render renderVueNode(filter)}
						{@render clearButtonMarkup()}
					</BlockStack>
				</Popover.Section>
			</div>
		</Popover>
	</div>
{/if}
