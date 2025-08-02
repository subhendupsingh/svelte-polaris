<script lang="ts">
	import { IndexTable, Page, SelectionType } from '$lib/index.js';

	/* const orders = [
		{
			id: '1020',
			order: '#1020',
			date: 'Jul 20 at 4:34pm',
			customer: 'Jaydon Stanton',
			total: '$969.44'
		},
		{
			id: '1019',
			order: '#1019',
			date: 'Jul 20 at 3:46pm',
			customer: 'Ruben Westerfelt',
			total: '$701.19'
		},
		{
			id: '1018',
			order: '#1018',
			date: 'Jul 20 at 3.44pm',
			customer: 'Leo Carder',
			total: '$798.24'
		}
	]; */

	const orders = $state([]);

	const resourceName = {
		singular: 'order',
		plural: 'orders'
	};

	const headings = [
		{ id: 'id', title: 'ID' },
		{ id: 'order', title: 'Order' },
		{ id: 'date', title: 'Date' },
		{ id: 'customer', title: 'Customer' },
		{ id: 'total', title: 'Total' }
	];

	const handleSelectionChange = (
		selectionType: string,
		toggleType: boolean,
		selection?: any,
		sortOrder?: number
	) => {
		if (selectionType === SelectionType.Page) {
			if (toggleType) {
				selectedItems = orders.map((order) => Number(order.id));
			} else {
				selectedItems = [];
			}
		} else if (selectionType === SelectionType.Single) {
			if (toggleType) {
				selectedItems.push(Number(selection));
			} else {
				selectedItems = selectedItems.filter((id) => id !== Number(selection));
			}
		}
	};

	let selectedItems: number[] = $state([]);
</script>

<Page>
	<IndexTable
		hasZebraStriping
		selectedItemsCount={selectedItems.length}
		onSelectionChange={handleSelectionChange}
		selectable={true}
		headings={[
			{ title: 'ID' },
			{ title: 'Order' },
			{ title: 'Date' },
			{ title: 'Customer' },
			{ title: 'Total' }
		]}
		itemCount={orders.length}
		{resourceName}
	>
		{#each orders as order}
			<IndexTable.Row
				selected={selectedItems.includes(Number(order.id))}
				onClick={() => console.log(order)}
				id={order.id}
				position={orders.indexOf(order)}
			>
				<IndexTable.Cell>{order.id}</IndexTable.Cell>
				<IndexTable.Cell>{order.order}</IndexTable.Cell>
				<IndexTable.Cell>{order.date}</IndexTable.Cell>
				<IndexTable.Cell>{order.customer}</IndexTable.Cell>
				<IndexTable.Cell>{order.total}</IndexTable.Cell>
			</IndexTable.Row>
		{/each}
	</IndexTable>
</Page>
