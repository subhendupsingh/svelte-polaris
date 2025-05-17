<script lang="ts">
	import { useToggle } from '$lib/use/use-toggle.svelte.js';
	import { classNames } from '$utilities/css.js';
	import type { ComplexAction, DisableableAction } from '$utilities/types.js';
	import type { Snippet } from 'svelte';
	import styles from './legacy-card.module.css';
	import LegacyCardHeader from './components/header/legacy-card-header.svelte';
	import LegacyCardSection from './components/section/legacy-card-section.svelte';
	import { Button } from '$lib/index.js';
	import ButtonFrom from '../button/button-from.svelte';
	import Popover from '../popover/popover.svelte';
	import ActionList from '../action-list/action-list.svelte';
	import InlineStack from '../inline-stack/inline-stack.svelte';

	interface LegacyCardProps {
		/** Title content for the card */
		title?: string;
		/** Inner content of the card */
		children?: Snippet;
		/** A less prominent card */
		subdued?: boolean;
		/** Auto wrap content in section */
		sectioned?: boolean;
		/** Card header actions */
		actions?: DisableableAction[];
		/** Primary action in the card footer */
		primaryFooterAction?: ComplexAction;
		/** Secondary actions in the card footer */
		secondaryFooterActions?: ComplexAction[];
		/** The content of the disclosure button rendered when there is more than one secondary footer action */
		secondaryFooterActionsDisclosureText?: string;
		/** Alignment of the footer actions on the card, defaults to right */
		footerActionAlignment?: 'right' | 'left';
		/** Allow the card to be hidden when printing */
		hideOnPrint?: boolean;
	}

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

	const { value: secondaryActionsPopoverOpen, toggle: toggleSecondaryActionsPopoverOpen } =
		useToggle(false);

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
			<Popover active={secondaryActionsPopoverOpen} onClose={toggleSecondaryActionsPopoverOpen}>
				{#snippet activator({ props })}
					<Button triggerProps={props} disclosure onClick={toggleSecondaryActionsPopoverOpen}>
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
