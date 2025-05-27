<script lang="ts">
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import styles from './media-card.module.css';
	import type { MediaCardProps } from './types.js';
	import Text from '$lib/components/text/text.svelte';
	import XIcon from '@shopify/polaris-icons/dist/svg/XIcon.svg?component';
	import Button from '../button/button.svelte';
	import InlineStack from '../inline-stack/inline-stack.svelte';
	import MenuHorizontalIcon from '@shopify/polaris-icons/dist/svg/MenuHorizontalIcon.svg?component';
	import ActionList from '../action-list/action-list.svelte';
	import ButtonFrom from '../button/button-from.svelte';
	import { classNames } from '$utilities/css.js';
	import ButtonGroup from '../button-group/index.js';
	import Box from '../box/box.svelte';
	import LegacyCard from '../legacy-card/index.js';
	import BlockStack from '../block-stack/block-stack.svelte';
	import Popover from '../popover/index.js';

	let {
		title,
		children,
		primaryAction,
		secondaryAction,
		description,
		popoverActions = [],
		portrait = false,
		size = 'medium',
		onDismiss
	}: MediaCardProps = $props();

	const popoverActive = new UseToggle(false);
	const togglePopoverActive = popoverActive.toggle;
	const actionClassName = $derived(classNames(styles.ActionContainer, portrait && styles.portrait));
	const mediaCardClassName = $derived(classNames(styles.MediaCard, portrait && styles.portrait));

	const mediaContainerClassName = $derived(
		classNames(
			styles.MediaContainer,
			portrait && styles.portrait,
			size === 'small' && styles.sizeSmall
		)
	);

	const infoContainerClassName = $derived(
		classNames(
			styles.InfoContainer,
			portrait && styles.portrait,
			size === 'small' && styles.sizeSmall
		)
	);
</script>

{#snippet headerMarkup()}
	{#if title}
		{#snippet headerContent()}
			{#if typeof title === 'string'}
				<Text variant="headingSm" as="h2">
					{title}
				</Text>
			{:else}
				{@render title()}
			{/if}
		{/snippet}

		{@render headerContent()}
	{/if}
{/snippet}

{#snippet dismissButtonMarkup()}
	{#if onDismiss}
		<Button
			icon={XIcon}
			onClick={onDismiss}
			size="slim"
			accessibilityLabel="Dismiss"
			variant="tertiary"
		/>
	{/if}
{/snippet}

{#snippet popoverActivator()}
	<InlineStack blockAlign="center">
		<Button
			icon={MenuHorizontalIcon}
			onClick={togglePopoverActive}
			size="slim"
			accessibilityLabel="Actions"
			variant="tertiary"
		/>
	</InlineStack>
{/snippet}

{#snippet popoverActionsMarkup()}
	{#if popoverActions.length > 0}
		<Popover
			active={popoverActive.value}
			onClose={togglePopoverActive}
			preferredAlignment="left"
			preferredPosition="below"
		>
			{#snippet trigger()}
				  {@render popoverActivator()}
			{/snippet}
			<ActionList items={popoverActions} onActionAnyItem={togglePopoverActive} />
		</Popover>
	{/if}
{/snippet}

{#snippet primaryActionMarkup()}
	{#if primaryAction}
		<div>
			<ButtonFrom action={primaryAction} overrides={{ variant: 'primary' }} />
		</div>
	{/if}
{/snippet}

{#snippet secondaryActionMarkup()}
	{#if secondaryAction}
		<div>
			<ButtonFrom action={secondaryAction} overrides={{ variant: 'secondary' }} />
		</div>
	{/if}
{/snippet}

{#snippet actionMarkup()}
	<div class={actionClassName}>
		<ButtonGroup>
			<ButtonGroup.Item>
				{@render primaryActionMarkup()}
			</ButtonGroup.Item>
			<ButtonGroup.Item>
				{@render secondaryActionMarkup()}
			</ButtonGroup.Item>
		</ButtonGroup>
	</div>
{/snippet}

{#snippet popoverOrDismissMarkup()}
	<Box position="absolute" insetInlineEnd="500" zIndex="var(--p-z-index-2)">
		<InlineStack gap="100" wrap={false}>
			{@render popoverActionsMarkup()}
			{@render dismissButtonMarkup()}
		</InlineStack>
	</Box>
{/snippet}

<LegacyCard>
	<div class={mediaCardClassName}>
		<div class={mediaContainerClassName}>{@render children()}</div>
		<div class={infoContainerClassName}>
			<Box padding="500">
				<BlockStack gap="200">
					<InlineStack wrap={false} align="space-between" gap="200">
						{@render headerMarkup()}
						{@render popoverOrDismissMarkup()}
					</InlineStack>
					<Text as="p" variant="bodySm">
						{description}
					</Text>
					{@render actionMarkup()}
				</BlockStack>
			</Box>
		</div>
	</div>
</LegacyCard>
