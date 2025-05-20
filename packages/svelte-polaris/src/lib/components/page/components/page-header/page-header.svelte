<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import styles from './page-header.module.css';
	import {
		isSvelteConstruct,
		LONG_TITLE,
		REALLY_SHORT_TITLE,
		SHORT_TITLE,
		type HeaderProps,
		type PrimaryAction
	} from './types.js';
	import Box from '$lib/components/box/box.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs/breadcrumbs.svelte';
	import { useMediaQuery } from '$lib/use/use-mediaquery.svelte.js';
	import Pagination from '$lib/components/pagination/pagination.svelte';
	import { classNames } from '$utilities/css.js';
	import PageTitle from './components/page-title/page-title.svelte';
	import Text from '$lib/components/text/text.svelte';
	import { isInterface } from '$utilities/is-interface.js';
	import ButtonFrom from '$lib/components/button/button-from.svelte';
	import Tooltip from '$lib/components/tooltip/tooltip.svelte';
	import { hasGroupsWithActions } from '$lib/components/action-menu/types.js';
	import ActionMenu from '$lib/components/action-menu/action-menu.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import FilterActionsProvider from '$lib/components/app-provider/filteraction-provider.svelte';
	import ConditionalRender from '$lib/components/conditional-render/conditional-render.svelte';

	let {
		title,
		subtitle,
		pageReadyAccessibilityLabel,
		titleMetadata,
		additionalMetadata,
		titleHidden = false,
		primaryAction,
		pagination,
		filterActions,
		backAction,
		secondaryActions = [],
		actionGroups = [],
		compactTitle = false,
		onActionRollup
	}: HeaderProps = $props();

	function isActionsArray(value: unknown): value is Record<string, any>[] {
		return Array.isArray(value);
	}

	const isSingleRow = $derived.by(() => {
		const noPrimaryAction = !primaryAction;
		const noPagination = !pagination;
		const minimalSecondaryActions =
			(isActionsArray(secondaryActions) && secondaryActions.length === 0) ||
			isSvelteConstruct(secondaryActions);
		const noActionGroups = !actionGroups || actionGroups.length === 0;

		return noPrimaryAction && noPagination && minimalSecondaryActions && noActionGroups;
	});

	const hasActionGroupsOrSecondaryActions = $derived.by(() => {
		const hasActionGroups = actionGroups && actionGroups.length > 0;
		const hasArrayOfSecondaryActions =
			isActionsArray(secondaryActions) && secondaryActions.length > 0;
		const hasConstructForSecondaryActions = isSvelteConstruct(secondaryActions);

		return hasActionGroups || hasArrayOfSecondaryActions || hasConstructForSecondaryActions;
	});

	const { isNavigationCollapsed } = useMediaQuery();
	const labelForPageReadyAccessibilityLabel = $derived(pageReadyAccessibilityLabel || title);

	function shouldShowIconOnly(isMobile: boolean, action: PrimaryAction): PrimaryAction {
		let { content, accessibilityLabel } = action;
		const { icon } = action;
		if (icon == null) return { ...action, icon: undefined };

		if (isMobile) {
			accessibilityLabel = accessibilityLabel || content;
			content = undefined;
		}

		return {
			...action,
			content,
			accessibilityLabel,
			icon
		};
	}

	function notNull(value: any) {
		return value != null;
	}

	const headerClassNames = $derived(
		classNames(
			isSingleRow && styles.isSingleRow,
			(backAction || (pagination && !isNavigationCollapsed)) && styles.hasNavigation,
			secondaryActions && styles.hasActionMenu,
			isNavigationCollapsed && styles.mobileView,
			!backAction && styles.noBreadcrumbs,
			title && title.length < LONG_TITLE && styles.mediumTitle,
			title && title.length > LONG_TITLE && styles.longTitle
		)
	);

	function determineLayout({
		actionMenuMarkup,
		additionalMetadataMarkup,
		breadcrumbMarkup,
		isNavigationCollapsed,
		pageTitleMarkup,
		paginationMarkup,
		primaryActionMarkup,
		title
	}: {
		actionMenuMarkup: Snippet;
		additionalMetadataMarkup: Snippet;
		breadcrumbMarkup: Snippet;
		isNavigationCollapsed: boolean;
		pageTitleMarkup: Snippet;
		paginationMarkup: Snippet;
		primaryActionMarkup: Snippet;
		title?: string;
	}) {
		//    Header Layout
		// |----------------------------------------------------|
		// | slot1 | slot2 |                    | slot3 | slot4 |
		// |----------------------------------------------------|
		// | slot5 |                                            |
		// |----------------------------------------------------|
		//
		const layouts = {
			mobileCompact: {
				slots: {
					slot1: null,
					slot2: pageTitleMarkup,
					slot3: actionMenuMarkup,
					slot4: primaryActionMarkup,
					slot5: additionalMetadataMarkup
				},
				condition:
					isNavigationCollapsed &&
					breadcrumbMarkup == null &&
					title != null &&
					title.length <= REALLY_SHORT_TITLE
			},
			mobileDefault: {
				slots: {
					slot1: breadcrumbMarkup,
					slot2: pageTitleMarkup,
					slot3: actionMenuMarkup,
					slot4: primaryActionMarkup,
					slot5: additionalMetadataMarkup
				},
				condition: isNavigationCollapsed
			},
			desktopCompact: {
				slots: {
					slot1: breadcrumbMarkup,
					slot2: pageTitleMarkup,
					slot3: actionMenuMarkup,
					slot4: primaryActionMarkup,
					slot5: additionalMetadataMarkup
				},
				condition:
					!isNavigationCollapsed &&
					paginationMarkup == null &&
					actionMenuMarkup == null &&
					title != null &&
					title.length <= SHORT_TITLE
			},
			desktopDefault: {
				slots: {
					slot1: breadcrumbMarkup,
					slot2: pageTitleMarkup,
					slot3: { actionMenuMarkup, primaryActionMarkup },
					slot4: paginationMarkup,
					slot5: additionalMetadataMarkup
				},
				condition: !isNavigationCollapsed
			}
		};

		const layout =
			Object.values(layouts).find((layout) => layout.condition) || layouts.desktopDefault;

		return layout.slots;
	}

	const { slot1, slot2, slot3, slot4, slot5 } = determineLayout({
		actionMenuMarkup,
		additionalMetadataMarkup,
		breadcrumbMarkup,
		isNavigationCollapsed,
		pageTitleMarkup,
		paginationMarkup,
		primaryActionMarkup,
		title
	});
</script>
{@render slot5?.()}
{#snippet breadcrumbMarkup()}
	{#if backAction}
		<div class={styles.BreadcrumbWrapper}>
			<Box maxWidth="100%" paddingInlineEnd="100" printHidden>
				<Breadcrumbs {backAction} />
			</Box>
		</div>
	{/if}
{/snippet}

{#snippet paginationMarkup()}
	{#if pagination && !isNavigationCollapsed}
		<div class={styles.PaginationWrapper}>
			<Box printHidden>
				<Pagination
					{...pagination}
					hasPrevious={pagination.hasPrevious}
					hasNext={pagination.hasNext}
				/>
			</Box>
		</div>
	{/if}
{/snippet}

{#snippet pageTitleMarkup()}
	<div
		class={classNames(
			styles.TitleWrapper,
			!hasActionGroupsOrSecondaryActions && styles.TitleWrapperExpand
		)}
	>
		<PageTitle
			{title}
			{subtitle}
			{titleMetadata}
			{compactTitle}
			hasSubtitleMaxWidth={hasActionGroupsOrSecondaryActions}
		/>
	</div>
{/snippet}

{#snippet pageReadyAccessibilityLabelMarkup()}
	{#if labelForPageReadyAccessibilityLabel}
		<div role="status">
			<Text visuallyHidden as="p">
				{labelForPageReadyAccessibilityLabel}
			</Text>
		</div>
	{/if}
{/snippet}

{#snippet primaryActionMarkup()}
	{#if primaryAction}
		{#if isInterface(primaryAction)}
			{@const { primary: isPrimary, helpText } = primaryAction}
			{@const primary = isPrimary === undefined ? true : isPrimary}

			{#snippet content()}
				{@const { content, accessibilityLabel, icon } = shouldShowIconOnly(
					isNavigationCollapsed,
					primaryAction
				)}
				<ButtonFrom
					action={primaryAction}
					overrides={{
						variant: primary ? 'primary' : undefined,
						accessibilityLabel,
						icon
					}}
				/>
			{/snippet}

			{#snippet actionMarkup()}
				{#if helpText}
					{#if typeof helpText === 'string'}
						<Tooltip preferredPosition="bottom" trigger={content} content={helpText} />
					{/if}
				{:else}
					{@render content()}
				{/if}
			{/snippet}

			<div class={styles.PrimaryActionWrapper}>
				<Box printHidden>{@render actionMarkup()}</Box>
			</div>
		{:else}
			<div class={styles.PrimaryActionWrapper}>
				<Box printHidden>{@render primaryAction()}</Box>
			</div>
		{/if}
	{/if}
{/snippet}

{#snippet actionMenuMarkup()}
	{#if isInterface(secondaryActions) && (secondaryActions.length > 0 || hasGroupsWithActions(actionGroups))}
		<ActionMenu
			actions={secondaryActions}
			groups={actionGroups}
			rollup={isNavigationCollapsed}
			rollupActionsLabel={title ? `View actions for ${title}` : undefined}
			{onActionRollup}
		/>
	{:else if isSvelteConstruct(secondaryActions)}
		{@render secondaryActions()}
	{/if}
{/snippet}

{#snippet navigationMarkup()}
	<Box
		printHidden
		paddingBlockEnd="100"
		paddingInlineEnd={secondaryActions && isNavigationCollapsed ? '1000' : undefined}
	>
		<InlineStack gap="400" align="space-between" blockAlign="center">
			{@render breadcrumbMarkup()}
			{@render paginationMarkup()}
		</InlineStack>
	</Box>
{/snippet}

{#snippet additionalMetadataMarkup()}
	{#if additionalMetadata}
		<div class={styles.AdditionalMetaData}>
			<Text tone="subdued" as="span" variant="bodySm">
				{additionalMetadata}
			</Text>
		</div>
	{/if}
{/snippet}

<Box
	position="relative"
	paddingBlockStart={{ xs: '400', md: '600' }}
	paddingBlockEnd={{ xs: '400', md: '600' }}
	paddingInlineStart={{ xs: '400', sm: '0' }}
	paddingInlineEnd={{ xs: '400', sm: '0' }}
	visuallyHidden={titleHidden}
>
	{@render pageReadyAccessibilityLabelMarkup()}
	<div class={headerClassNames}>
		<FilterActionsProvider filterActions={Boolean(filterActions)}>
			<ConditionalRender condition={[slot1, slot2, slot3, slot4].some(notNull)}>
				<div class={styles.Row}>
					{@render slot1?.()}
					{@render slot2?.()}
					<ConditionalRender condition={[slot3, slot4].some(notNull)}>
						<div class={styles.RightAlign}>
							<div class={styles.Actions}>
								{#if typeof slot3 === 'function'}
									{@render slot3()}
								{:else if typeof slot3 === "object"}
									{@render slot3.actionMenuMarkup()}
									{@render slot3.primaryActionMarkup()}
								{/if}
								{@render slot4?.()}
							</div>
						</div>
					</ConditionalRender>
				</div>
			</ConditionalRender>
			<ConditionalRender condition={[slot5].some(notNull)}>
				<div class={styles.Row}>
					<InlineStack gap="400">{@render slot5?.()}</InlineStack>
				</div>
			</ConditionalRender>
		</FilterActionsProvider>
	</div>
</Box>
