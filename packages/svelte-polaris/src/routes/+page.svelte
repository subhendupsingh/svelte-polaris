<script lang="ts">
	import Page from '$lib/components/page/page.svelte';
	import DeleteIcon from '@shopify/polaris-icons/dist/svg/DeleteIcon.svg?component';
	import Badge from '$lib/components/badge/badge.svelte';
	import type { BadgeProps } from '$lib/components/badge/types.js';
	import IndexTable from '$lib/components/index-table/index.js';
	import Text from '$lib/components/text/text.svelte';
	import LegacyCard from '$lib/components/legacy-card/index.js';
	import { IndexResourceState } from '$lib/use/use-index-resource-state.svelte.js';
	import { applyStyles } from '$utilities/css.js';
	import BlockStack from '$lib/components/block-stack/block-stack.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import { UseBreakpoints } from '$lib/use/use-breakpoints.svelte.js';
	import Tabs from '$lib/components/tabs/tabs.svelte';

	const orders = [
		{
			id: '1020',
			order: '#1020',
			date: 'Jul 20 at 4:34pm',
			customer: 'Jaydon Stanton',
			total: '$969.44',
			paymentStatus: 'complete',
			fulfillmentStatus: 'incomplete',
			disabled: false
		},
		{
			id: '1019',
			order: '#1019',
			date: 'Jul 20 at 3:46pm',
			customer: 'Ruben Westerfelt',
			total: '$701.19',
			paymentStatus: 'incomplete',
			fulfillmentStatus: 'incomplete',
			disabled: false
		},
		{
			id: '1018',
			order: '#1018',
			date: 'Jul 20 at 3.44pm',
			customer: 'Leo Carder',
			total: '$798.24',
			paymentStatus: 'incomplete',
			fulfillmentStatus: 'incomplete',
			disabled: false
		}
	];

	const resourceName = {
		singular: 'order',
		plural: 'orders'
	};

	const selectableOrders = orders.filter((order) => !order.disabled);
	const indexResourceState = new IndexResourceState(selectableOrders);
	let isTableCondensed = $state(false);

	const promotedBulkActions = [
		{
			content: 'Create shipping labels',
			onAction: () => console.log('Todo: implement bulk edit')
		}
	];

	const bulkActions = [
		{
			content: 'Add tags',
			onAction: () => console.log('Todo: implement bulk add tags')
		},
		{
			content: 'Remove tags',
			onAction: () => console.log('Todo: implement bulk remove tags')
		},
		{
			icon: DeleteIcon,
			destructive: true,
			content: 'Delete orders',
			onAction: () => console.log('Todo: implement bulk delete')
		}
	];

	const bp = new UseBreakpoints();
	let smDown = $derived(bp.getCurrentBreakpoints()?.smDown);

	let selected = $state(0);

	const handleTabChange = (selectedTabIndex: number) => (selected = selectedTabIndex);

	const tabs = [
		{
			id: 'all-customers-1',
			content: 'All',
			accessibilityLabel: 'All customers',
			panelID: 'all-customers-content-1',
			badge: "10"
		},
		{
			id: 'accepts-marketing-1',
			content: 'Accepts marketing',
			panelID: 'accepts-marketing-content-1'
		},
		{
			id: 'repeat-customers-1',
			content: 'Repeat customers',
			panelID: 'repeat-customers-content-1'
		},
		{
			id: 'prospects-1',
			content: 'Prospects',
			panelID: 'prospects-content-1'
		}
	];
</script>

{#snippet paymentStatus(progress: BadgeProps['progress'])}
	<Badge {progress}>Paid</Badge>
{/snippet}

{#snippet fulfillmentStatus(progress: BadgeProps['progress'])}
	<Badge {progress}>Unfulfilled</Badge>
{/snippet}

<Page
	backAction={{ content: 'Products', url: '#' }}
	title="3/4 inch Leather pet collar"
	subtitle="Perfect for any pet"
	compactTitle
	primaryAction={{
		content: 'Save',
		disabled: true,
		helpText: 'You need permission to import products.'
	}}
	secondaryActions={[
		{
			content: 'Duplicate',
			accessibilityLabel: 'Secondary action label',
			destructive: true,
			icon: DeleteIcon,
			onAction: () => alert('Duplicate action')
		},
		{
			content: 'View on your store',
			onAction: () => alert('View on your store action')
		}
	]}
	actionGroups={[
		{
			title: 'Promote',
			actions: [
				{
					content: 'Share on Facebook',
					accessibilityLabel: 'Individual action label',
					onAction: () => alert('Share on Facebook action')
				}
			]
		}
	]}
	pagination={{
		hasPrevious: true,
		hasNext: true
	}}
>
	<Tabs {tabs} {selected} onSelect={handleTabChange}>
		<LegacyCard.Section title={tabs[selected].content}>
			<p>Tab {selected} selected</p>
		</LegacyCard.Section>
	</Tabs>

	<LegacyCard>
		<IndexTable
			condensed={smDown}
			itemCount={selectableOrders.length}
			{resourceName}
			onSelectionChange={indexResourceState.handleSelectionChange}
			selectedItemsCount={indexResourceState.allResourcesSelected
				? 'All'
				: indexResourceState.selectedResources.length}
			headings={[
				{ title: 'Order' },
				{ title: 'Date' },
				{ title: 'Customer' },
				{ title: 'Total', alignment: 'end' },
				{ title: 'Payment status' },
				{ title: 'Fulfillment status' }
			]}
		>
			<!-- {@render rowMarkup()} -->

			{#each orders as { id, order, date, customer, total, disabled }, index}
				<IndexTable.Row
					{id}
					position={index}
					{disabled}
					selected={indexResourceState.selectedResources.includes(id)}
				>
					{#if !isTableCondensed}
						<IndexTable.Cell>
							<Text variant="bodyMd" fontWeight="bold" as="span">
								{order}
							</Text>
						</IndexTable.Cell>
						<IndexTable.Cell>{date}</IndexTable.Cell>
						<IndexTable.Cell>{customer}</IndexTable.Cell>
						<IndexTable.Cell>
							<Text as="span" alignment="end" numeric>
								{total}
							</Text>
						</IndexTable.Cell>
						<IndexTable.Cell>{@render paymentStatus('complete')}</IndexTable.Cell>
						<IndexTable.Cell>{@render fulfillmentStatus('incomplete')}</IndexTable.Cell>
					{:else}
						<div style={applyStyles({ padding: '12px 16px', width: '100%' })}>
							<BlockStack gap="100">
								<Text as="span" variant="bodySm" tone="subdued">
									{order} • {date}
								</Text>
								<InlineStack align="space-between">
									<Text as="span" variant="bodyMd" fontWeight="semibold">
										{customer}
									</Text>
									<Text as="span" variant="bodyMd">
										{total}
									</Text>
								</InlineStack>
								<InlineStack align="start" gap="100">
									{@render paymentStatus('complete')}
									{@render fulfillmentStatus('incomplete')}
								</InlineStack>
							</BlockStack>
						</div>
					{/if}
				</IndexTable.Row>
			{/each}
		</IndexTable>
	</LegacyCard>
</Page>
