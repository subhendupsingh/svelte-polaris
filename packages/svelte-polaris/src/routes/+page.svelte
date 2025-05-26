<script lang="ts">
	import Page from '$lib/components/page/page.svelte';
	import DeleteIcon from '@shopify/polaris-icons/dist/svg/DeleteIcon.svg?component';
	import Badge from '$lib/components/badge/badge.svelte';
	import type { BadgeProps } from '$lib/components/badge/types.js';
	import IndexTable from '$lib/components/index-table/index.js';
	import Text from '$lib/components/text/text.svelte';
	import LegacyCard from '$lib/components/legacy-card/legacy-card.svelte';
	import { IndexResourceState } from '$lib/use/use-index-resource-state.svelte.js';

	const orders = [
		{
			id: '1020',
			order: '#1020',
			date: 'Jul 20 at 4:34pm',
			customer: 'Jaydon Stanton',
			total: '$969.44',
			paymentStatus: 'complete',
			fulfillmentStatus: 'incomplete'
		},
		{
			id: '1019',
			order: '#1019',
			date: 'Jul 20 at 3:46pm',
			customer: 'Ruben Westerfelt',
			total: '$701.19',
			paymentStatus: 'incomplete',
			fulfillmentStatus: 'incomplete'
		},
		{
			id: '1018',
			order: '#1018',
			date: 'Jul 20 at 3.44pm',
			customer: 'Leo Carder',
			total: '$798.24',
			paymentStatus: 'incomplete',
			fulfillmentStatus: 'incomplete'
		}
	];

	const resourceName = {
		singular: 'order',
		plural: 'orders'
	};

	//const {selectedResources, allResourcesSelected, handleSelectionChange} = new IndexResourceState(orders)
	const indexResourceState = new IndexResourceState(orders);
</script>

{#snippet paymentStatus(progress: BadgeProps['progress'])}
	<Badge {progress}>Paid</Badge>
{/snippet}

{#snippet fulfillmentStatus(progress: BadgeProps['progress'])}
	<Badge {progress}>Unfulfilled</Badge>
{/snippet}

<!-- {#snippet rowMarkup()}
	{#each orders as { id, order, date, customer, total }, index}
		<IndexTable.Row
			{id}
			position={index}
			selected={indexResourceState.selectedResources.includes(id)}
		>
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
		</IndexTable.Row>
	{/each}
{/snippet} -->

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
	<LegacyCard>
		<IndexTable
			itemCount={orders.length}
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

			{#each orders as { id, order, date, customer, total }, index}
				<IndexTable.Row
					{id}
					position={index}
					selected={indexResourceState.selectedResources.includes(id)}
				>
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
				</IndexTable.Row>
			{/each}
		</IndexTable>
	</LegacyCard>
</Page>
