<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import type {
		ActionListItemDescriptor,
		ActionListSection,
		MenuActionDescriptor,
		MenuGroupDescriptor
	} from '$utilities/types.js';
	import MenuGroup from '../menu-group/menu-group.svelte';
	import SecondaryAction from '../secondary-action/secondary-action.svelte';
	import styles from './actions.module.css';
	import ActionsMeasurer from './components/actions-measurer/actions-measurer.svelte';
	import type { ActionsMeasurements } from './components/actions-measurer/types.js';
	import type { ActionsState, Props } from './types.js';
	import { getVisibleAndHiddenActionsIndices } from './utilities.js';
	let { actions, groups, onActionRollup }: Props = $props();
	let rollupActiveRef = $state<boolean | null>(null);
	let activeMenuGroup = $state<string | undefined>();
	const initialState: ActionsState = {
		disclosureWidth: 0,
		containerWidth: Infinity,
		actionsWidths: [],
		visibleActions: [],
		hiddenActions: [],
		visibleGroups: [],
		hiddenGroups: [],
		hasMeasured: false
	};

	let actionState = $state<ActionsState>(initialState);

	const defaultRollupGroup: MenuGroupDescriptor = {
		title: 'More Actions',
		actions: []
	};

	const handleMenuGroupToggle = (group: string) => {
		activeMenuGroup = activeMenuGroup ? undefined : group;
	};

	const handleMenuGroupClose = () => {
		activeMenuGroup = undefined;
	};

	const actionsOrDefault = $derived(actions ?? []);
	const groupsOrDefault = $derived(groups ?? []);

	$effect(() => {
		if (actionState.containerWidth === 0) {
			return;
		}

		const { visibleActions, visibleGroups, hiddenActions, hiddenGroups } =
			getVisibleAndHiddenActionsIndices(
				actionsOrDefault,
				groupsOrDefault,
				actionState.disclosureWidth,
				actionState.actionsWidths,
				actionState.containerWidth
			);

		actionState.visibleActions = visibleActions;
		actionState.hiddenActions = hiddenActions;
		actionState.visibleGroups = visibleGroups;
		actionState.hiddenGroups = hiddenGroups;
		actionState.hasMeasured = actionState.containerWidth !== Infinity;
	});

	const groupsToFilter = $derived.by(() => {
		return actionState.hiddenGroups.length > 0 || actionState.hiddenActions.length > 0
			? [...groupsOrDefault, defaultRollupGroup]
			: [...groupsOrDefault];
	});

	const filteredGroups = $derived.by(() => {
		return groupsToFilter.filter((group, index) => {
			const hasNoGroupsProp = groupsOrDefault.length === 0;
			const isVisibleGroup = actionState.visibleGroups.includes(index);
			const isDefaultGroup = group === defaultRollupGroup;

			if (hasNoGroupsProp) {
				return actionState.hiddenActions.length > 0;
			}

			if (isDefaultGroup) {
				return true;
			}

			return isVisibleGroup;
		});
	});

	const hiddenActionObjects = $derived.by(() => {
		return actionState.hiddenActions
			.map((index) => actionsOrDefault[index])
			.filter((action) => action != null);
	});

	const hiddenGroupObjects = $derived.by(() => {
		return actionState.hiddenGroups
			.map((index) => groupsOrDefault[index])
			.filter((group) => group != null);
	});


	function isMenuGroup(
		actionOrMenuGroup: MenuGroupDescriptor | MenuActionDescriptor
	): actionOrMenuGroup is MenuGroupDescriptor {
		return 'title' in actionOrMenuGroup;
	}

	const handleMeasurement = (measurements: ActionsMeasurements) => {
		const { hiddenActionsWidths: actionsWidths, containerWidth, disclosureWidth } = measurements;

		const { visibleActions, hiddenActions, visibleGroups, hiddenGroups } =
			getVisibleAndHiddenActionsIndices(
				actionsOrDefault,
				groupsOrDefault,
				disclosureWidth,
				actionsWidths,
				containerWidth
			);

		if (onActionRollup) {
			const isRollupActive = hiddenActions.length > 0 || hiddenGroups.length > 0;
			if (rollupActiveRef !== isRollupActive) {
				onActionRollup(isRollupActive);
				rollupActiveRef = isRollupActive;
			}
		}

		actionState = {
			visibleActions,
			hiddenActions,
			visibleGroups,
			hiddenGroups,
			actionsWidths,
			containerWidth,
			disclosureWidth,
			hasMeasured: true
		};
	};
</script>

{#snippet actionsMarkup()}
	{@const filteredActions = actionsOrDefault.filter((_, index) => {
		if (!actionState.visibleActions.includes(index)) {
			return false;
		}

		return true;
	})}

	{#each filteredActions as action}
		{@const { content, onAction, ...rest } = action}

		<SecondaryAction onClick={onAction} {...rest}>
			{content}
		</SecondaryAction>
	{/each}
{/snippet}

{#snippet groupsMarkup()}
	{#each filteredGroups as group}
		{@const isDefaultGroup = group === defaultRollupGroup}
		{@const { title, actions: groupActions, ...rest } = group}

		{#if !isDefaultGroup}
			{#if groupActions && groupActions.length > 0}
				<MenuGroup
					{title}
					active={title === activeMenuGroup}
					actions={groupActions}
					{...rest}
					onOpen={() => handleMenuGroupToggle(title)}
					onClose={handleMenuGroupClose}
				/>
			{/if}
		{:else}
			{@const allHiddenItems = [...hiddenActionObjects, ...hiddenGroupObjects]}
			{@const [finalRolledUpActions, finalRolledUpSectionGroups] = allHiddenItems.reduce(
				([actions, sections]: [MenuActionDescriptor[], ActionListSection[]], action) => {
					if (isMenuGroup(action)) {
						sections.push({
							title: action.title,
							items: action.actions.map((sectionAction) => ({
								...sectionAction,
								disabled: action.disabled || sectionAction.disabled
							}))
						});
					} else {
						actions.push(action);
					}

					return [actions, sections];
				},
				[[], []]
			)}

			{#if finalRolledUpActions.length > 0 || finalRolledUpSectionGroups.length > 0}
				<MenuGroup
					{title}
					active={title === activeMenuGroup}
					actions={[...finalRolledUpActions, ...groupActions]}
					sections={finalRolledUpSectionGroups}
					{...rest}
					onOpen={handleMenuGroupToggle}
					onClose={handleMenuGroupClose}
				/>
			{/if}
		{/if}
	{/each}
{/snippet}

{#snippet actionsMeasurer()}
	<ActionsMeasurer {actions} {groups} {handleMeasurement} />
{/snippet}

<div class={styles.ActionsLayoutOuter}>
	{@render actionsMeasurer()}
	<div
		class={classNames(
			styles.ActionsLayout,
			!actionState.hasMeasured && styles['ActionsLayout--measuring']
		)}
	>
		{@render actionsMarkup()}
		{@render groupsMarkup()}
	</div>
</div>
