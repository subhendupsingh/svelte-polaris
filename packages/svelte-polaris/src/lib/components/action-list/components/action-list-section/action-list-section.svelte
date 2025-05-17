<script lang="ts">
	import Box from '$lib/components/box/box.svelte';
	import type { ActionListItemDescriptor } from '$utilities/types.js';
	import type { SectionProps } from '../../types.js';
	import Text from '$lib/components/text/text.svelte';
	import ActionListItem from '../action-list-item/action-list-item.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import BlockStack from '$lib/components/block-stack/block-stack.svelte';

	let { section, hasMultipleSections, isFirst, actionRole, onActionAnyItem }: SectionProps =
		$props();

	const handleAction = (itemOnAction: ActionListItemDescriptor['onAction']) => {
		return () => {
			if (itemOnAction) {
				itemOnAction();
			}
			if (onActionAnyItem) {
				onActionAnyItem();
			}
		};
	};

	let sectionRole = $derived(() => {
		switch (actionRole) {
			case 'option':
				return 'presentation';
			case 'menuitem':
				return !hasMultipleSections ? 'menu' : 'presentation';
			default:
				return undefined;
		}
	});
</script>

{#snippet titleMarkup()}
	{#if section.title}
		<Box
			paddingBlockStart="300"
			paddingBlockEnd="100"
			paddingInlineStart="300"
			paddingInlineEnd="300"
		>
			<Text as="p" variant="headingSm">
				{section.title}
			</Text>
		</Box>
	{/if}
{/snippet}

{#snippet actionItemMarkup(item: ActionListItemDescriptor)}
	<ActionListItem
		content={item.content}
		onAction={handleAction(item.onAction)}
		role={actionRole}
		helpText={item.helpText}
		{...item}
	/>
{/snippet}

{#snippet actionMarkup(items: ActionListItemDescriptor[])}
	{#each items as item, index}
		<Box as="li" role={actionRole === 'menuitem' ? 'presentation' : undefined}>
			<InlineStack wrap={false}>{@render actionItemMarkup(item)}</InlineStack>
		</Box>
	{/each}
{/snippet}

{#snippet sectionMarkup()}
	{@render titleMarkup()}
	<Box
		as="div"
		padding="150"
		{...hasMultipleSections && { paddingBlockStart: '0' }}
		tabIndex={!hasMultipleSections ? -1 : undefined}
	>
		<BlockStack gap="050" as="ul" {...sectionRole() && { role: sectionRole() }}>
			{@render actionMarkup(section.items)}
		</BlockStack>
	</Box>
{/snippet}

{#if hasMultipleSections}
	<Box
		as="li"
		role="presentation"
		borderColor="border-secondary"
		{...!isFirst && { borderBlockStartWidth: '025' }}
		{...!section.title && {
			paddingBlockStart: '150'
		}}
	>
		{@render sectionMarkup()}
	</Box>
{:else}
	{@render sectionMarkup()}
{/if}
