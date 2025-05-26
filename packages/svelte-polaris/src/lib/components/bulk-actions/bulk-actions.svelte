<script lang="ts">
	import UnstyledButton from '../button/unstyled-button.svelte';
	import styles from './bulk-actions.module.css';
	import type {
		AriaLive,
		BulkAction,
		BulkActionListSection,
		BulkActionsProps,
		BulkActionsState
	} from './types.js';
	import {
		getActionSections,
		getVisibleAndHiddenActionsIndices,
		instanceOfBulkActionListSection,
		instanceOfMenuGroupDescriptor,
		isNewBadgeInBadgeActions
	} from './utilities.js';
	import Text from '../text/text.svelte';
	import type { ActionsMeasurements } from './components/bulk-action-measurer/types.js';
	import type { MenuGroupDescriptor } from '$utilities/types.js';
	import BulkActionMenu from './components/bulk-action-menu/bulk-action-menu.svelte';
	import BulkActionButton from './components/bulk-action-button/bulk-action-button.svelte';
	import Popover from '../popover/popover.svelte';
	import ActionList from '../action-list/action-list.svelte';
	import BulkActionsMeasurer from './components/bulk-action-measurer/bulk-action-measurer.svelte';
	import InlineStack from '../inline-stack/inline-stack.svelte';
	import CheckableButton from '../checkable-button/checkable-button.svelte';
	import { classNames } from '$utilities/css.js';

	let {
		promotedActions,
		actions,
		disabled,
		buttonSize,
		paginatedSelectAllAction,
		paginatedSelectAllText,
		label,
		accessibilityLabel,
		selected,
		onToggleAll,
		onMoreActionPopoverToggle,
		width,
		selectMode
	}: BulkActionsProps = $props();

	let popoverActive = $state(false);

	let states = $state<BulkActionsState>({
		disclosureWidth: 0,
		containerWidth: Infinity,
		actionsWidths: [],
		visiblePromotedActions: [],
		hiddenPromotedActions: [],
		hasMeasured: false
	});

	const {
		visiblePromotedActions,
		hiddenPromotedActions,
		containerWidth,
		disclosureWidth,
		actionsWidths,
		hasMeasured
	} = $derived(states);

	function updateState(partialData: Partial<BulkActionsState>): void {
		Object.assign(states, partialData);
	}

	$effect(() => {
		if (containerWidth === 0 || !promotedActions || promotedActions.length === 0) {
			return;
		}

		const { visiblePromotedActions, hiddenPromotedActions } = getVisibleAndHiddenActionsIndices(
			promotedActions,
			disclosureWidth,
			actionsWidths,
			containerWidth
		);

		/* states = {
			visiblePromotedActions,
			hiddenPromotedActions,
			hasMeasured: containerWidth !== Infinity
		}; */
		states.visiblePromotedActions = visiblePromotedActions;
		states.hiddenPromotedActions = hiddenPromotedActions;
		states.hasMeasured = containerWidth !== Infinity;
	});

	const activatorLabel = $derived(
		!promotedActions || (promotedActions && visiblePromotedActions.length === 0)
			? 'Actions'
			: 'More actions'
	);

	const hasTextAndAction = $derived(paginatedSelectAllText && paginatedSelectAllAction);

	const ariaLive: AriaLive = $derived(hasTextAndAction ? 'polite' : undefined);

	const checkableButtonProps = $derived({
		accessibilityLabel,
		label: hasTextAndAction ? paginatedSelectAllText : label,
		selected,
		onToggleAll,
		disabled,
		ariaLive
	});

	const togglePopover = () => {
		onMoreActionPopoverToggle?.(popoverActive);
		popoverActive = !popoverActive;
	};

	const handleMeasurement = (measurements: ActionsMeasurements) => {
		const { hiddenActionsWidths: actionsWidths, containerWidth, disclosureWidth } = measurements;
		if (!promotedActions || promotedActions.length === 0) {
			return;
		}

		const { visiblePromotedActions, hiddenPromotedActions } = getVisibleAndHiddenActionsIndices(
			promotedActions,
			disclosureWidth,
			actionsWidths,
			containerWidth
		);

		updateState({
			visiblePromotedActions,
			hiddenPromotedActions,
			actionsWidths,
			containerWidth,
			disclosureWidth,
			hasMeasured: true
		});
	};

	const actionSections = $derived(getActionSections(actions));

	const filteredPromotedActions = $derived(
		promotedActions
			? promotedActions.filter((_, index) => {
					if (!visiblePromotedActions.includes(index)) {
						return false;
					}

					return true;
				})
			: []
	);

	const hiddenPromotedActionObjects = $derived(
		hiddenPromotedActions.map((index) => promotedActions?.[index])
	);

	const mergedHiddenPromotedActions = $derived(
		hiddenPromotedActionObjects.reduce(
			(memo, action) => {
				if (!action) return memo;
				if (instanceOfMenuGroupDescriptor(action)) {
					return memo.concat(action.actions);
				}
				return memo.concat(action);
			},
			[] as (BulkAction | MenuGroupDescriptor)[]
		)
	);

	const hiddenPromotedSection = $derived({
		items: mergedHiddenPromotedActions
	});

	const allHiddenActions = $derived.by(() => {
		if (actionSections) {
			return actionSections;
		}

		if (!actions) {
			return [];
		}

		let isAFlatArray = true;

		return actions
			.filter((action) => action)
			.reduce(
				(
					memo: BulkActionListSection[],
					action: BulkAction | BulkActionListSection
				): BulkActionListSection[] => {
					if (instanceOfBulkActionListSection(action)) {
						isAFlatArray = false;
						return memo.concat(action);
					}
					if (isAFlatArray) {
						if (memo.length === 0) {
							return [{ items: [action] }];
						}
						const lastItem = memo[memo.length - 1];
						memo.splice(memo.length - 1, 1, {
							items: [...lastItem.items, action]
						});
						return memo;
					}

					isAFlatArray = true;

					return memo.concat({ items: [action] });
				},
				[]
			);
	});
</script>

{#snippet paginatedSelectAllMarkup()}
	{#if paginatedSelectAllAction}
		<UnstyledButton
			className={styles.AllAction}
			onClick={paginatedSelectAllAction.onAction}
			size="slim"
			{disabled}
		>
			<Text as="span" variant="bodySm" fontWeight="medium">
				{paginatedSelectAllAction.content}
			</Text>
		</UnstyledButton>
	{/if}
{/snippet}

{#snippet promotedActionsMarkup()}
	{#each filteredPromotedActions as action}
		{#if instanceOfMenuGroupDescriptor(action)}
			<BulkActionMenu
				{...action}
				isNewBadgeInBadgeActions={isNewBadgeInBadgeActions(actionSections)}
				size={buttonSize}
			/>
		{:else}
			<BulkActionButton {disabled} {...action} size={buttonSize} />
		{/if}
	{/each}
{/snippet}

{#snippet activator()}
	<BulkActionButton
		disclosure
		showContentInButton={!promotedActionsMarkup}
		onAction={togglePopover}
		content={activatorLabel}
		{disabled}
		indicator={isNewBadgeInBadgeActions(actionSections)}
		size={buttonSize}
	/>
{/snippet}

{#snippet actionsMarkup()}
	{#if allHiddenActions.length > 0}
		<Popover active={popoverActive} preferredAlignment="right" onClose={togglePopover}>
			{#snippet trigger()}
				{@render activator()}
			{/snippet}
			<ActionList
				sections={hiddenPromotedSection.items.length > 0
					? [hiddenPromotedSection, ...allHiddenActions]
					: allHiddenActions}
				onActionAnyItem={togglePopover}
			/>
		</Popover>
	{/if}
{/snippet}

{#snippet measurerMarkup()}
	<BulkActionsMeasurer {promotedActions} {disabled} {buttonSize} {handleMeasurement} />
{/snippet}

<div class={styles.BulkActions} style={width ? `width: ${width}px` : undefined}>
	<InlineStack gap="400" blockAlign="center">
		<div class={styles.BulkActionsSelectAllWrapper}>
			<CheckableButton {...checkableButtonProps} />
			{@render paginatedSelectAllMarkup()}
		</div>
		{#if selectMode}
			<div class={styles.BulkActionsPromotedActionsWrapper}>
				<InlineStack gap="100" blockAlign="center">
					<div class={styles.BulkActionsOuterLayout}>
						{@render measurerMarkup()}
						<div
							class={classNames(
								styles.BulkActionsLayout,
								!hasMeasured && styles['BulkActionsLayout--measuring']
							)}
						>
							{@render promotedActionsMarkup()}
						</div>
					</div>
					{@render actionsMarkup()}
				</InlineStack>
			</div>
		{/if}
	</InlineStack>
</div>
