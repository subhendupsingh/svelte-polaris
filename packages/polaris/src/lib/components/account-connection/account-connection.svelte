<script lang="ts">
	import { UseBreakpoints, useBreakpoints } from '$lib/use/use-breakpoints.svelte.js';
	import Avatar from '../avatar/avatar.svelte';
	import type { AccountConnectionProps } from './types.js';
	import Text from '../text/text.svelte';
	import Box from '../box/box.svelte';
	import Card from '../card/card.svelte';
	import SettingAction from '../setting-action/setting-action.svelte';
	import InlineStack from '../inline-stack/inline-stack.svelte';
	import BlockStack from '../block-stack/block-stack.svelte';
	import ButtonFrom from '../button/button-from.svelte';

	let {
		connected = false,
		action: settingAction,
		avatarUrl,
		accountName = '',
		title,
		details,
		termsOfService
	}: AccountConnectionProps = $props();

	const bp = new UseBreakpoints();
	const breakpoints = $derived(bp.getCurrentBreakpoints());

	const initials = $derived(
		accountName
			? accountName
					.split(/\s+/)
					.map((name) => name[0])
					.join('')
			: undefined
	);

	const titleContent = $derived(title ? title : accountName);
</script>

{#snippet avatarMarkup()}
	{#if connected}
		<span>
			<Avatar accessibilityLabel="" name={accountName} {initials} source={avatarUrl} />
		</span>
	{/if}
{/snippet}

{#snippet titleMarkup()}
	<Text as="h2" variant="headingSm">
		{titleContent}
	</Text>
{/snippet}

{#snippet detailsMarkup()}
	{#if details}
		<Text as="span" variant="bodyMd" tone="subdued">
			{details}
		</Text>
	{/if}
{/snippet}

{#snippet termsOfServiceMarkup()}
	{#if termsOfService}
		<Box paddingBlockStart={breakpoints?.mdUp ? '400' : '500'}>
			{#if typeof termsOfService === 'string'}
				<Text as="span" variant="bodyMd">
					{termsOfService}
				</Text>
			{:else}
				{@render termsOfService()}
			{/if}
		</Box>
	{/if}
{/snippet}

<Card>
	<SettingAction>
		{#snippet action()}
			{#if settingAction}
				<ButtonFrom
					action={settingAction}
					overrides={{ variant: connected ? undefined : 'primary' }}
				/>
			{/if}
		{/snippet}
		<InlineStack gap="400">
			{@render avatarMarkup()}
			<BlockStack gap="100">
				{@render titleMarkup()}
				{@render detailsMarkup()}
			</BlockStack>
		</InlineStack>
	</SettingAction>
	{@render termsOfServiceMarkup()}
</Card>
