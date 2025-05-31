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
	import DescriptionList from '$lib/components/description-list/description-list.svelte';
	import List from '$lib/components/list/index.js';
	import Listbox from '$lib/components/listbox/index.js';
	import OptionList from '$lib/components/option-list/option-list.svelte';
	import Popover from '$lib/components/popover/index.js';
	import Button from '$lib/components/button/button.svelte';
	import ResourceItem from '$lib/components/resource-item/resource-item.svelte';
	import Avatar from '$lib/components/avatar/avatar.svelte';
	import ResourceList from '$lib/components/resource-list/index.js';
	import type { ResourceListItemData } from '$lib/components/resource-list/types.js';
	import EmptyState from '$lib/components/empty-state/empty-state.svelte';
	import ChoiceList from '$lib/components/choice-list/choice-list.svelte';
	import TextField from '$lib/components/text-field/text-field.svelte';
	import Filters from '$lib/components/filters/filters.svelte';
	import FormLayout from '$lib/components/form-layout/form-layout.svelte';
	import Select from '$lib/components/select/select.svelte';
	import { ActionList } from '$lib/index.js';

	let selected = $state<string[]>([]);
	let accountStatus = $state<string[] | undefined>(undefined);
	let moneySpent = $state<[number, number] | undefined>(undefined);
	let taggedWith = $state<string | undefined>();
	let queryValue = $state<string | undefined>(undefined);

	const handleAccountStatusChange = (value: string[]) => (accountStatus = value);
	const handleMoneySpentChange = (value: [number, number] | undefined) => (moneySpent = value);
	const handleTaggedWithChange = (value: string | undefined) => (taggedWith = value);
	const handleFiltersQueryChange = (value: string | undefined) => (queryValue = value);
	const handleAccountStatusRemove = () => (accountStatus = undefined);
	const handleMoneySpentRemove = () => (moneySpent = undefined);
	const handleTaggedWithRemove = () => (taggedWith = undefined);
	const handleQueryValueRemove = () => (queryValue = undefined);

	const handleFiltersClearAll = () => {
		accountStatus = undefined;
		moneySpent = undefined;
		taggedWith = undefined;
		queryValue = undefined;
	};

	const filters = [
		{
			id: 'accountStatus',
			key: 'accountStatus',
			label: 'Account status',
			filter: filter1,
			shortcut: true
		},
		{
			id: 'taggedWith',
			key: 'taggedWith',
			label: 'Tagged with',
			filter: filter2,
			shortcut: true
		},
		{
			id: 'moneySpent',
			key: 'moneySpent',
			label: 'Money spent',
			filter: filter3
		}
	];

	const items = [
		{
			id: '6',
			url: 'posts/6',
			title: 'How To Get Value From Wireframes',
			author: 'Jonathan Mangrove'
		}
	];

	function disambiguateLabel(key: string, value: any) {
		switch (key) {
			case 'moneySpent':
				return `Money spent is between $${value[0]} and $${value[1]}`;
			case 'taggedWith':
				return `Tagged with ${value}`;
			case 'accountStatus':
				return value.map((val: string) => `Customer ${val}`).join(', ');
			default:
				return value;
		}
	}

	function isEmpty(value: string | string[] | [number, number] | undefined): boolean {
		if (Array.isArray(value)) {
			return value.length === 0;
		} else {
			return value === '' || value == null;
		}
	}

	let selectedItems = $state([]);
	let appliedFilters = $derived.by(() => {
		const filters = [];
		if (!isEmpty(accountStatus)) {
			const key = 'accountStatus';
			filters.push({
				key,
				label: disambiguateLabel(key, accountStatus),
				onRemove: handleAccountStatusRemove
			});
		}
		if (!isEmpty(taggedWith)) {
			const key = 'taggedWith';
			filters.push({
				key,
				label: disambiguateLabel(key, taggedWith),
				onRemove: handleTaggedWithRemove
			});
		}
		if (!isEmpty(moneySpent)) {
			const key = 'moneySpent';
			filters.push({
				key,
				label: disambiguateLabel(key, moneySpent),
				onRemove: handleMoneySpentRemove
			});
		}
		return filters;
	});

	let popoverActive = $state(true);

	const togglePopoverActive = () => {
		popoverActive = !popoverActive;
	};
</script>

{#snippet activator()}
	<Button onClick={togglePopoverActive} disclosure>Options</Button>
{/snippet}

{#snippet filter1()}
	<ChoiceList
		title="Account status"
		titleHidden
		choices={[
			{ label: 'Enabled', value: 'enabled' },
			{ label: 'Not invited', value: 'not invited' },
			{ label: 'Invited', value: 'invited' },
			{ label: 'Declined', value: 'declined' }
		]}
		selected={accountStatus || []}
		onChange={(val) => handleAccountStatusChange(val)}
		allowMultiple
	/>
{/snippet}

{#snippet filter2()}
	<TextField
		label="Tagged with"
		value={taggedWith}
		onChange={handleTaggedWithChange}
		autoComplete="off"
		labelHidden
	/>
{/snippet}

{#snippet filter3()}{/snippet}

{#snippet filterControls()}
	<Filters
		{queryValue}
		{filters}
		{appliedFilters}
		onQueryChange={handleFiltersQueryChange}
		onQueryClear={handleQueryValueRemove}
		onClearAll={handleFiltersClearAll}
	/>
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
	<LegacyCard>
		<ResourceList
			flushFilters
			filterControl={filterControls}
			resourceName={{ singular: 'customer', plural: 'customers' }}
			items={[
				{
					id: '100',
					url: '#',
					name: 'Mae Jemison',
					location: 'Decatur, USA'
				},
				{
					id: '200',
					url: '#',
					name: 'Ellen Ochoa',
					location: 'Los Angeles, USA'
				}
			]}>
			{#snippet renderItem(item: ResourceListItemData)}
				{@const { id, url, name, location } = item}

				<ResourceItem {id} {url} accessibilityLabel={`View details for ${name}`}>
					{#snippet media()}
						<Avatar customer size="md" {name} />
					{/snippet}
					<Text variant="bodyMd" fontWeight="bold" as="h3">
						{name}
					</Text>
					<div>{location}</div>
				</ResourceItem>
			{/snippet}
		</ResourceList>

		<!-- <Popover active={popoverActive} onClose={togglePopoverActive} sectioned>
			{#snippet trigger()}
				{@render activator()}
			{/snippet}
			<FormLayout>
				<Select label="Show all customers where:" options={['Tagged with', 'Money spent']} />
				<TextField label="Tags" value="asdf" onChange={() => {}} autoComplete="off" />
				<Button size="slim">Add filter</Button>
			</FormLayout>
		</Popover> -->

		<ActionList items={[
			{
              content: 'Import file',
              onAction: () => {},
            },
            {
              content: 'Export file',
              onAction: () => {},
            },
		]} />
	</LegacyCard>
</Page>
