<script lang="ts">
	import styles from './skeleton-page.module.css';
	import type { SkeletonPageProps } from './types.js';
	import Text from '$lib/components/text/text.svelte';
	import { BlockStack, Box, InlineStack } from '$lib/index.js';
	let {
		children,
		fullWidth,
		narrowWidth,
		primaryAction,
		title = '',
		backAction
	}: SkeletonPageProps = $props();
</script>

{#snippet titleContent()}
	{#if title}
		<Text as="h1" variant="headingLg" fontWeight="bold">
			{title}
		</Text>
	{:else}
		<div class={styles.SkeletonTitle}>
			<Box background="bg-fill-tertiary" minWidth="120px" minHeight="28px" borderRadius="100" />
		</div>
	{/if}
{/snippet}

{#snippet primaryActionMarkup()}
	{#if primaryAction}
		<Box
			id="SkeletonPage-PrimaryAction"
			borderRadius="100"
			background="bg-fill-tertiary"
			minHeight="2.25rem"
			minWidth="6.25rem"
		/>
	{/if}
{/snippet}

{#snippet backActionMarkup()}
	{#if backAction}
		<Box
			borderRadius="100"
			background="bg-fill-tertiary"
			minHeight="2.25rem"
			minWidth="2.25rem"
			maxWidth="2.25rem"
		/>
	{/if}
{/snippet}

<BlockStack gap="400" inlineAlign="center">
	<Box
		width="100%"
		padding="0"
		paddingInlineStart={{ sm: '600' }}
		paddingInlineEnd={{ sm: '600' }}
		maxWidth="var(--pc-skeleton-page-max-width)"
		role="status"
		{...narrowWidth && {
			maxWidth: 'var(--pc-skeleton-page-max-width-narrow)'
		}}
		{...fullWidth && {
			maxWidth: 'none'
		}}
	>
		<BlockStack>
			<Box
				paddingBlockStart={{ xs: '400', md: '500' }}
				paddingBlockEnd={{ xs: '400', md: '500' }}
				paddingInlineStart={{ xs: '400', sm: '0' }}
				paddingInlineEnd={{ xs: '400', sm: '0' }}
				width="100%"
			>
				<InlineStack gap="400" align="space-between" blockAlign="center">
					<InlineStack gap="400">
						{@render backActionMarkup()}
						<Box paddingBlockStart="100" paddingBlockEnd="100">
							{@render titleContent()}
						</Box>
					</InlineStack>
					{@render primaryActionMarkup()}
				</InlineStack>
			</Box>
			<Box paddingBlockEnd="200" width="100%">
				{@render children?.()}
			</Box>
		</BlockStack>
	</Box>
</BlockStack>
