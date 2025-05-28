<script lang="ts">
	import { UseBreakpoints } from '$lib/use/use-breakpoints.svelte.js';
	import { classNames } from '$utilities/css.js';
	import ChevronDownIcon from '@shopify/polaris-icons/dist/svg/ChevronDownIcon.svg?component';
	import Box from '../box/box.svelte';
	import Icon from '../icon/icon.svelte';
	import Popover from '../popover/popover.svelte';
	import List from './components/list/list.svelte';
	import TabMeasurer from './components/tab-measurer/tab-measurer.svelte';
	import Tab from './components/tab/tab.svelte';
	import styles from './tabs.module.css';
	import {
		CREATE_NEW_VIEW_ID,
		type TabMeasurements,
		type TabProps,
		type TabsProps,
		type TabsState
	} from './types.js';
	import Text from '../text/text.svelte';
	import UnstyledButton from '../button/unstyled-button.svelte';
	import PlusIcon from '@shopify/polaris-icons/dist/svg/PlusIcon.svg?component';
	import Panel from './components/panel/panel.svelte';
	import { getVisibleAndHiddenTabIndices } from './utilities.js';

	let {
		tabs,
		children,
		selected = 0,
		newViewAccessibilityLabel,
		canCreateNewView,
		disabled,
		onCreateNewView,
		onSelect,
		fitted,
		disclosureText,
		disclosureZIndexOverride
	}: TabsProps = $props();

	let bp = new UseBreakpoints();
	let breakpoints = $derived(bp.getCurrentBreakpoints());
	let scrollRef = $state<HTMLDivElement | null>(null);
	let wrapRef = $state<HTMLDivElement | null>(null);
	let selectedTabRef = $state<HTMLElement>();

	let states: TabsState = $state({
		disclosureWidth: 0,
		containerWidth: Infinity,
		tabWidths: [],
		visibleTabs: [],
		hiddenTabs: [],
		showDisclosure: false,
		tabToFocus: -1,
		isNewViewModalActive: false,
		modalSubmitted: false,
		isTabsFocused: false,
		isTabPopoverOpen: false,
		isTabModalOpen: false
	});

	let {
		tabToFocus,
		visibleTabs,
		hiddenTabs,
		showDisclosure,
		isNewViewModalActive,
		modalSubmitted,
		disclosureWidth,
		tabWidths,
		containerWidth,
		isTabsFocused,
		isTabModalOpen,
		isTabPopoverOpen
	} = $derived(states);

	let prevModalOpen = $derived(isTabModalOpen);
	let prevPopoverOpen = $derived(isTabPopoverOpen);

	/* $effect(() => {
		const hasModalClosed = prevModalOpen && !isTabModalOpen;
		const hasPopoverClosed = prevPopoverOpen && !isTabPopoverOpen;
		if (hasModalClosed) {
			states.isTabsFocused = true;
			states.tabToFocus = selected;
		} else if (hasPopoverClosed && !isTabModalOpen) {
			states.isTabsFocused = true;
			states.tabToFocus = selected;
		}
	}); */

	const handleTogglePopover = (isOpen: boolean) => {
		states.isTabPopoverOpen = isOpen;
	};

	const handleToggleModal = (isOpen: boolean) => {
		states.isTabModalOpen = isOpen;
	};

	const handleCloseNewViewModal = () => {
		states.isNewViewModalActive = false;
	};

	const handleSaveNewViewModal = async (value: string) => {
		if (!onCreateNewView) {
			return false;
		}
		const hasExecuted = await onCreateNewView?.(value);
		if (hasExecuted) {
			states.modalSubmitted = true;
		}
		return hasExecuted;
	};

	const handleClickNewTab = () => {
		states.isNewViewModalActive = true;
	};

	const handleTabClick = (id: string) => {
		const tab = tabs.find((aTab) => aTab.id === id);
		if (tab == null) {
			return null;
		}
		const selectedIndex = tabs.indexOf(tab);
		onSelect?.(selectedIndex);
	};

	const handleMeasurement = (measurements: TabMeasurements) => {
		const { hiddenTabWidths: tabWidths, containerWidth, disclosureWidth } = measurements;

		const { visibleTabs, hiddenTabs } = getVisibleAndHiddenTabIndices(
			tabs,
			selected,
			disclosureWidth,
			tabWidths,
			containerWidth
		);

		states.visibleTabs = visibleTabs;
		states.hiddenTabs = hiddenTabs;
		states.disclosureWidth = disclosureWidth;
		states.containerWidth = containerWidth;
		states.tabWidths = tabWidths;
	};

	const handleFocus = (event: FocusEvent) => {
		const target = event.target as HTMLElement;
		const isItem = target.classList.contains(styles.Item);
		const isInNaturalDOMOrder = target.closest(`[data-tabs-focus-catchment]`) || isItem;

		const isDisclosureActivator = target.classList.contains(styles.DisclosureActivator);

		if (isDisclosureActivator || !isInNaturalDOMOrder) {
			return;
		}

		states.isTabsFocused = true;
	};

	const handleBlur = (event: FocusEvent) => {
		const target = event.target as HTMLElement;
		const relatedTarget = event.relatedTarget as HTMLElement;
		const isInNaturalDOMOrder = relatedTarget?.closest?.(`.${styles.Tabs}`);
		const targetIsATab = target?.classList?.contains?.(styles.Tab);
		const focusReceiverIsAnItem = relatedTarget?.classList.contains(styles.Item);

		if (!relatedTarget && !isTabModalOpen && !targetIsATab && !focusReceiverIsAnItem) {
			states.tabToFocus = -1;
			return;
		}

		if (!isInNaturalDOMOrder && !isTabModalOpen && !targetIsATab && !focusReceiverIsAnItem) {
			states.tabToFocus = -1;
			return;
		}

		states.isTabsFocused = false;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (isTabPopoverOpen || isTabModalOpen || isNewViewModalActive) {
			return;
		}
		const { key } = event;

		if (key === 'ArrowLeft' || key === 'ArrowRight') {
			event.preventDefault();
			event.stopPropagation();
		}
	};

	$effect(() => {
		const { visibleTabs, hiddenTabs } = getVisibleAndHiddenTabIndices(
			tabs,
			selected,
			disclosureWidth,
			tabWidths,
			containerWidth
		);

		states.visibleTabs = visibleTabs;
		states.hiddenTabs = hiddenTabs;
	});

	const moveToActiveTab = (offsetLeft: number) => {
		setTimeout(() => {
			if (scrollRef && typeof scrollRef.scroll === 'function') {
				const scrollRefOffset = wrapRef?.offsetLeft || 0;
				scrollRef.scroll({
					left: offsetLeft - scrollRefOffset
				});
			}
		}, 0);
	};

	const moveToSelectedTab = () => {
		const activeButton = selectedTabRef?.querySelector(`.${styles['Tab-active']}`) as HTMLElement;
		if (activeButton) {
			moveToActiveTab(activeButton.offsetLeft);
		}
	};

	$effect(() => {
		if (breakpoints?.mdDown) {
			moveToSelectedTab();
		}
	});

	$effect(() => {
		if (isTabsFocused && !showDisclosure) {
			const tabToFocus = selected;
			states.tabToFocus = tabToFocus;
		}
	});

	const handleKeyPress = (event: KeyboardEvent) => {
		const { showDisclosure, visibleTabs, hiddenTabs, tabToFocus, isNewViewModalActive } = states;
		if (isTabModalOpen || isTabPopoverOpen || isNewViewModalActive) {
			return;
		}
		const key = event.key;
		const tabsArrayInOrder =
			showDisclosure || breakpoints?.mdDown ? visibleTabs.concat(hiddenTabs) : [...visibleTabs];

		let newFocus = tabsArrayInOrder.indexOf(tabToFocus);

		if (key === 'ArrowRight') {
			newFocus += 1;

			if (newFocus === tabsArrayInOrder.length) {
				newFocus = 0;
			}
		}

		if (key === 'ArrowLeft') {
			if (newFocus === -1 || newFocus === 0) {
				newFocus = tabsArrayInOrder.length - 1;
			} else {
				newFocus -= 1;
			}
		}

		const buttonToFocus = tabsArrayInOrder[newFocus];

		if (buttonToFocus != null) {
			states.tabToFocus = buttonToFocus;
		}
	};

	const handleDisclosureActivatorClick = () => {
		states.showDisclosure = !states.showDisclosure;
		states.tabToFocus = hiddenTabs[0];
	};

	const handleClose = () => {
		states.showDisclosure = false;
	};

	const handleListTabClick = (id: string) => {
		handleTabClick(id);
		handleClose();
		states.isTabsFocused = true;
	};

	const createViewA11yLabel = newViewAccessibilityLabel || 'Create new view';

	const tabsToShow = $derived(breakpoints?.mdDown ? [...visibleTabs, ...hiddenTabs] : visibleTabs);

	const disclosureActivatorVisible = $derived(
		visibleTabs.length < tabs.length && !breakpoints?.mdDown
	);

	const classname = $derived(
		classNames(styles.Tabs, fitted && styles.fitted, disclosureActivatorVisible && styles.fillSpace)
	);

	const wrapperClassNames = $derived(
		classNames(styles.Wrapper, canCreateNewView && styles.WrapperWithNewButton)
	);

	const disclosureTabClassName = $derived(
		classNames(styles.DisclosureTab, disclosureActivatorVisible && styles['DisclosureTab-visible'])
	);

	const disclosureButtonClassName = $derived(classNames(styles.DisclosureActivator));
	const disclosureTabs = $derived(hiddenTabs.map((tabIndex) => tabs[tabIndex]));
	const viewNames = $derived(tabs.map(({ content }) => content));
</script>

{#snippet disclosureButtonContent()}
	<Text as="span" variant="bodySm" fontWeight="medium">
		{disclosureText ?? 'More views'}
	</Text>
	<div
		class={classNames(
			styles.IconWrap,
			disclosureActivatorVisible && showDisclosure && styles['IconWrap-open']
		)}
	>
		<Icon source={ChevronDownIcon} tone="subdued" />
	</div>
{/snippet}

{#snippet disclosureButton()}
	<UnstyledButton
		type="button"
		className={disclosureButtonClassName}
		onClick={handleDisclosureActivatorClick}
		aria-label={disclosureText ?? 'More views'}
		{disabled}
	>
		{@render disclosureButtonContent()}
	</UnstyledButton>
{/snippet}

{#snippet renderTabMarkup(tab: TabProps, index: number)}
	{@const viewNames = tabs.map(({ content }) => content)}
	{@const tabPanelID = tab.panelID || `${tab.id}-panel`}
	{@const handleClick = () => {
		handleTabClick(tab.id);
		tab.onAction?.();
	}}
	<Tab
		{...tab}
		id={tab.id}
		panelID={children ? tabPanelID : undefined}
		disabled={disabled || tab.disabled}
		siblingTabHasFocus={tabToFocus > -1}
		focused={index === tabToFocus}
		selected={index === selected}
		onAction={handleClick}
		accessibilityLabel={tab.accessibilityLabel}
		url={tab.url}
		content={tab.content}
		onToggleModal={handleToggleModal}
		onTogglePopover={handleTogglePopover}
		{viewNames}
		{disclosureZIndexOverride}
		bind:ref={selectedTabRef}
	/>
{/snippet}

{#snippet tabsMarkup()}
	{#each tabsToShow as tabIndex}
		{@render renderTabMarkup(tabs[tabIndex], tabIndex)}
	{/each}
{/snippet}

{#snippet tabMeasurer()}
	<TabMeasurer
		{tabToFocus}
		activator={disclosureButton}
		{selected}
		{tabs}
		siblingTabHasFocus={tabToFocus > -1}
		{handleMeasurement}
	/>
{/snippet}

{#snippet newTabIcon()}
	<Icon source={PlusIcon} accessibilityLabel={createViewA11yLabel} />
{/snippet}

{#snippet newTab()}
	<Tab
		id={CREATE_NEW_VIEW_ID}
		content={createViewA11yLabel}
		actions={[]}
		onAction={handleClickNewTab}
		onFocus={() => {
			if (modalSubmitted) {
				states.tabToFocus = selected;
				modalSubmitted = false;
			}
		}}
		icon={newTabIcon}
		{disabled}
		onTogglePopover={handleTogglePopover}
		onToggleModal={handleToggleModal}
		tabIndexOverride={0}
	/>
{/snippet}

{#snippet panelMarkup()}
	{#if children}
		{#each tabs as tab, index}
			{#if selected === index}
				<Panel id={tabs[index].panelID || `${tabs[index].id}-panel`} tabID={tabs[index].id}>
					{@render children()}
				</Panel>
			{:else}
				<Panel
					id={tabs[index].panelID || `${tabs[index].id}-panel`}
					tabID={tabs[index].id}
					hidden
				/>
			{/if}
		{/each}
	{/if}
{/snippet}

<div class={styles.Outer}>
	<Box padding={{ md: '200' }}>
		{@render tabMeasurer()}
		<div class={wrapperClassNames} bind:this={scrollRef}>
			<div class={styles.ButtonWrapper} bind:this={wrapRef}>
				<ul
					role={tabsMarkup.length > 0 ? 'tablist' : undefined}
					class={classname}
					onfocus={handleFocus}
					onblur={handleBlur}
					onkeydown={handleKeyDown}
					onkeyup={handleKeyPress}
					data-tabs-focus-catchment
				>
					{@render tabsMarkup()}

					{#if !breakpoints?.mdDown && tabsToShow.length > 0}
						<li class={disclosureTabClassName} role="presentation">
							<Popover
								preferredPosition="below"
								preferredAlignment="left"
								active={disclosureActivatorVisible && showDisclosure}
								onClose={handleClose}
								autofocusTarget="first-node"
								zIndexOverride={disclosureZIndexOverride}
							>
								{#snippet trigger()}
									{@render disclosureButton()}
								{/snippet}
								<List
									focusIndex={hiddenTabs.indexOf(tabToFocus)}
									{disclosureTabs}
									onClick={handleListTabClick}
									onKeyPress={handleKeyPress}
								/>
							</Popover>
						</li>
					{/if}
				</ul>
			</div>
		</div>
	</Box>

	{@render panelMarkup()}
</div>
