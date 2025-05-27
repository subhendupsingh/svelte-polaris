<script lang="ts">
	import type { TabAction, TabPropsWithAddedMethods } from '../../types.js';
	import { classNames } from '$utilities/css.js';
	import styles from '../../tabs.module.css';
	import { focusFirstFocusableNode, handleMouseUpByBlurring } from '$utilities/focus.js';
	import InfoIcon from '@shopify/polaris-icons/dist/svg/InfoIcon.svg?component';
	import DuplicateIcon from '@shopify/polaris-icons/dist/svg/DuplicateIcon.svg?component';
	import EditIcon from '@shopify/polaris-icons/dist/svg/EditIcon.svg?component';
	import LayoutColumns3Icon from '@shopify/polaris-icons/dist/svg/LayoutColumns3Icon.svg?component';
	import DeleteIcon from '@shopify/polaris-icons/dist/svg/DeleteIcon.svg?component';
	import Badge from '$lib/components/badge/badge.svelte';
	import Icon from '$lib/components/icon/icon.svelte';
	import ChevronDownIcon from '@shopify/polaris-icons/dist/svg/ChevronDownIcon.svg?component';
	import UnstyledButton from '$lib/components/button/unstyled-button.svelte';
	import UnstyledLink from '$lib/components/link/link.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import Text from '$lib/components/text/text.svelte';

	let {
		content,
		accessibilityLabel,
		badge,
		id,
		panelID,
		url,
		onAction,
		actions,
		disabled,
		isModalLoading,
		icon,
		siblingTabHasFocus,
		measuring,
		focused,
		selected,
		onToggleModal,
		onTogglePopover,
		viewNames,
		tabIndexOverride,
		disclosureZIndexOverride,
		onFocus,
		ref: node = $bindable()
	}: TabPropsWithAddedMethods & { ref?: HTMLElement } = $props();

	let popoverActive = $state(false);
	let activeModalType = $state<TabAction | null>(null);
	let wasSelected = $state(selected);
	let panelFocused = $state(false);

	function focusPanelID(panelID: string) {
		const panel = document.getElementById(panelID);
		if (panel) {
			panel.focus({ preventScroll: true });
		}
	}

	$effect(() => {
		onTogglePopover(popoverActive);
	});

	$effect(() => {
		onToggleModal(Boolean(activeModalType));
	});

	$effect(() => {
		return () => {
			onToggleModal(false);
			onTogglePopover(false);
		};
	});

	$effect(() => {
		if (measuring) {
			return;
		}

		// Because of timing issues with the render, we may still have the old, in-disclosure version of the tab that has focus. Check for this as a second indicator of focus
		const itemHadFocus = focused || (document.activeElement && document.activeElement.id === id);

		// If we just check for selected, the panel for the active tab will be focused on page load, which we don’t want
		if (itemHadFocus && selected && panelID != null && !panelFocused) {
			focusPanelID(panelID);
			panelFocused = true;
		}

		if (selected && !wasSelected && panelID != null) {
			focusPanelID(panelID);
		} else if (focused && node != null && activeModalType == null && !disabled) {
			focusFirstFocusableNode(node);
		}

		wasSelected = selected;
	});

	let tabIndex: 0 | -1 = $derived.by(() => {
		let newTabindex: 0 | -1 = -1;
		if (selected && !siblingTabHasFocus && !measuring) {
			newTabindex = 0;
		} else if (focused && !measuring) {
			newTabindex = 0;
		} else {
			newTabindex = -1;
		}

		if (tabIndexOverride != null) {
			newTabindex = tabIndexOverride;
		}

		return newTabindex;
	});

	const renameAction = $derived(actions?.find((action) => action.type === 'rename'));
	const duplicateAction = $derived(actions?.find((action) => action.type === 'duplicate'));
	const deleteAction = $derived(actions?.find((action) => action.type === 'delete'));

	const togglePopoverActive = () => {
		if (!actions?.length) {
			return;
		}
		popoverActive = !popoverActive;
	};

	const handleClick = () => {
		if (disabled) {
			return;
		}
		if (selected) {
			togglePopoverActive();
		} else {
			onAction?.();
		}
	};

	const handleModalOpen = (type: TabAction) => {
		activeModalType = type;
	};

	const handleModalClose = () => {
		activeModalType = null;
	};

	const handleSaveRenameModal = async (value: string) => {
		await renameAction?.onPrimaryAction?.(value);

		setTimeout(() => {
			if (node) {
				focusFirstFocusableNode(node);
			}
		}, 250);
	};

	const handleConfirmDeleteView = async () => {
		await deleteAction?.onPrimaryAction?.(content);
		handleModalClose();
	};

	const handleSaveDuplicateModal = async (duplicateName: string) => {
		await duplicateAction?.onPrimaryAction?.(duplicateName);
	};

	const actionContent = {
		rename: {
			icon: InfoIcon,
			content: 'Rename view'
		},
		duplicate: {
			icon: DuplicateIcon,
			content: 'Duplicate view'
		},
		edit: {
			icon: EditIcon,
			content: 'Edit view'
		},
		'edit-columns': {
			icon: LayoutColumns3Icon,
			content: 'Edit columns'
		},
		delete: {
			icon: DeleteIcon,
			content: 'Delete view',
			destructive: true
		}
	};

	const formattedActions = actions?.map(
		({ type, onAction, onPrimaryAction, ...additionalOptions }) => {
			const isModalActivator = !type.includes('edit');
			return {
				...actionContent[type],
				...additionalOptions,
				onAction: () => {
					onAction?.(content);
					togglePopoverActive();
					if (isModalActivator) {
						handleModalOpen(type);
					}
				}
			};
		}
	);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	};

	const tabContainerClassNames = $derived(
		classNames(styles.TabContainer, selected && styles.Underline)
	);

	const urlIfNotDisabledOrSelected = $derived(disabled || selected ? undefined : url);

	const tabClassName = $derived(
		classNames(
			styles.Tab,
			icon && styles['Tab-iconOnly'],
			popoverActive && styles['Tab-popoverActive'],
			selected && styles['Tab-active'],
			selected && actions?.length && styles['Tab-hasActions']
		)
	);

	const isPlainButton = !selected || !actions?.length;
</script>

{#snippet badgeMarkup()}
	{#if badge}
		<Badge tone={selected ? undefined : 'new'}>{badge}</Badge>
	{/if}
{/snippet}

{#snippet disclosureMarkup()}
	{#if selected && actions?.length}
		<div class={classNames(styles.IconWrap)}>
			<Icon source={ChevronDownIcon} />
		</div>
	{/if}
{/snippet}

{#snippet activator()}
	{@const BaseComponent = urlIfNotDisabledOrSelected ? UnstyledLink : UnstyledButton}
	<BaseComponent
		{id}
		class={tabClassName}
		{tabIndex}
		aria-selected={selected}
		aria-controls={panelID}
		aria-label={accessibilityLabel}
		role={tabIndexOverride == null ? 'tab' : undefined}
		{disabled}
		url={urlIfNotDisabledOrSelected}
		{onFocus}
		onMouseUp={handleMouseUpByBlurring}
		onClick={handleClick}
		onKeyDown={handleKeyDown}
	>
		<InlineStack gap="200" align="center" blockAlign="center" wrap={false}>
			<Text as="span" variant="bodySm" fontWeight="medium">
				{@render icon?.()}
				{content}
			</Text>
			{@render badgeMarkup()}
		</InlineStack>
		{@render disclosureMarkup()}
	</BaseComponent>
{/snippet}

<li class={tabContainerClassNames} bind:this={node} role="presentation">
	{@render activator()}
</li>
