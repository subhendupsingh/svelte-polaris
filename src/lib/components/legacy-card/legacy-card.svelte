<script lang="ts">
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import { classNames } from '$utilities/css.js';
	import styles from './legacy-card.module.css';
	import LegacyCardHeader from './components/header/legacy-card-header.svelte';
	import LegacyCardSection from './components/section/legacy-card-section.svelte';
	import ButtonFrom from '../button/button-from.svelte';
	import ActionList from '../action-list/action-list.svelte';
	import InlineStack from '../inline-stack/inline-stack.svelte';
	import Popover from '../popover/index.js';
	import Button from '../button/button.svelte';
	import type { LegacyCardProps } from './types.js';

	let {
		children,
		hideOnPrint,
		title,
		subdued,
		sectioned,
		actions,
		primaryFooterAction,
		secondaryFooterActions,
		secondaryFooterActionsDisclosureText,
		footerActionAlignment = 'right'
	}: LegacyCardProps = $props();

	const secondaryActionsPopoverOpen = new UseToggle(false);
	const toggleSecondaryActionsPopoverOpen = secondaryActionsPopoverOpen.toggle;

	const className = $derived(
		classNames(styles.LegacyCard, subdued && styles.subdued, hideOnPrint && styles.hideOnPrint)
	);
</script>

{#snippet primaryFooterActionMarkup()}
	{#if primaryFooterAction}
		<ButtonFrom action={primaryFooterAction} overrides={{ variant: 'primary' }} />
	{/if}
{/snippet}

{#snippet secondaryFooterActionMarkup()}
	{#if secondaryFooterActions?.length}
		{#if secondaryFooterActions.length === 1}
			<ButtonFrom action={secondaryFooterActions[0]} overrides={{ variant: 'secondary' }} />
		{:else}
			<Popover active={secondaryActionsPopoverOpen.value} onClose={toggleSecondaryActionsPopoverOpen}>
				{#snippet trigger()}
					<Button disclosure onClick={toggleSecondaryActionsPopoverOpen}>
						{secondaryFooterActionsDisclosureText || 'More'}
					</Button>
				{/snippet}
				<ActionList items={secondaryFooterActions} />
			</Popover>
		{/if}
	{/if}
{/snippet}

{#snippet footerMarkup()}
	{#if primaryFooterAction || secondaryFooterActions?.length}
		<div
			class={classNames(styles.Footer, footerActionAlignment === 'left' && styles.LeftJustified)}
		>
			{#if footerActionAlignment === 'right'}
				<InlineStack gap="200">
					{@render secondaryFooterActionMarkup()}
					{@render primaryFooterActionMarkup()}
				</InlineStack>
			{:else}
				<InlineStack gap="200">
					{@render primaryFooterActionMarkup()}
					{@render secondaryFooterActionMarkup()}
				</InlineStack>
			{/if}
		</div>
	{/if}
{/snippet}

<div class={className}>
	{#if title || actions}
		<LegacyCardHeader {title} {actions} />
	{/if}
	{#if sectioned}
		<LegacyCardSection {children} />
	{:else}
		{@render children?.()}
	{/if}
	{@render footerMarkup()}
</div>
