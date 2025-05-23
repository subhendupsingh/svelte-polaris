<script lang="ts">
	import AccountConnection from '$lib/components/account-connection/account-connection.svelte';
	import Avatar from '$lib/components/avatar/avatar.svelte';
	import BlockStack from '$lib/components/block-stack/block-stack.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Card from '$lib/components/card/card.svelte';
	import FormLayout from '$lib/components/form-layout/types.js';
	import Grid from '$lib/components/grid/index.js';
	import InlineGrid from '$lib/components/inline-grid/inline-grid.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import Layout from '$lib/components/layout/index.js';
	import LegacyCard from '$lib/components/legacy-card/legacy-card.svelte';
	import Link from '$lib/components/link/link.svelte';
	import PageActions from '$lib/components/page-actions/page-actions.svelte';
	import Pagination from '$lib/components/pagination/pagination.svelte';
	import Placeholder from '$lib/components/placeholder/placeholder.svelte';
	import Tag from '$lib/components/tag/tag.svelte';
	import TextField from '$lib/components/text-field/text-field.svelte';
	import { useMediaQuery } from '$lib/use/use-mediaquery.svelte.js';
	import Page from '$lib/components/page/page.svelte';
	import Badge from '$lib/components/badge/badge.svelte';
	import DeleteIcon from '@shopify/polaris-icons/dist/svg/DeleteIcon.svg?component';
	import MediaCard from '$lib/components/media-card/media-card.svelte';
	import { applyStyles } from '$utilities/css.js';
	import Checkbox from '$lib/components/checkbox/checkbox.svelte';
	import ChoiceList from '$lib/components/choice-list/choice-list.svelte';
	import Popover from '$lib/components/popover/index.js';
	import ActionList from '$lib/components/action-list/action-list.svelte';
	import { onMount } from 'svelte';
	import Text from '$lib/components/text/text.svelte';
	import Tooltip from '$lib/components/tooltip/tooltip.svelte';
	import Combobox from '$lib/components/combobox/index.js';
	import Icon from '$lib/components/icon/icon.svelte';
	import SearchIcon from '@shopify/polaris-icons/dist/svg/SearchIcon.svg?component';
	import Listbox from '$lib/components/listbox/index.js';
	import DatePicker from '$lib/components/datepicker/datepicker.svelte';
	// Call the function to get the reactive media query state
	const mediaQuery = useMediaQuery();

	let accountName = 'Example App';
	let connected = false;
	let buttonText = 'Connect';
	let handleAction = () => {};
	let details = 'Details';
	let terms = 'By clicking <strong>Connect</strong>, you agree to accept Sample App’s';
	const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];

	let value = $state<string | undefined>('');

	let activator = $state<HTMLElement>();
	let activator1 = $state<HTMLElement>();

	let popoverActive = $state(true);
	let popoverActive1 = $state(true);

	let togglePopoverActive = () => {
		popoverActive = !popoverActive;
	};

	let togglePopoverActive1 = () => {
		popoverActive1 = !popoverActive1;
	};

	const deselectedOptions = [
		{ value: 'rustic', label: 'Rustic' },
		{ value: 'antique', label: 'Antique' },
		{ value: 'vinyl', label: 'Vinyl' },
		{ value: 'vintage', label: 'Vintage' },
		{ value: 'refurbished', label: 'Refurbished' }
	];
	let selectedOption = $state<string | undefined>();
	let inputValue = $state('');
	let options = $state(deselectedOptions);

	const escapeSpecialRegExCharacters = (value: string) =>
		value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	const updateText = (value: string) => {
		inputValue = value;

		if (value === '') {
			options = deselectedOptions;
			return;
		}

		const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), 'i');
		const resultOptions = deselectedOptions.filter((option) => option.label.match(filterRegex));
		options = resultOptions;
	};

	const updateSelection = (selected: string) => {
		const matchedOption = options.find((option) => {
			return option.value.match(selected);
		});

		selectedOption = selected;
		inputValue = (matchedOption && matchedOption.label) || '';
	};
</script>

<!-- <Layout>
	<Layout.Section variant="oneThird">
		<LegacyCard title="Order details" sectioned>
			<p>
				Use to follow a normal section with a secondary section to create a 2/3 + 1/3 layout on
				detail pages (such as individual product or order pages). Can also be used on any page that
				needs to structure a lot of content. This layout stacks the columns on small screens.
			</p>
		</LegacyCard>
	</Layout.Section>
	<Layout.Section variant="oneThird">
		<LegacyCard title="Tags" sectioned>
			<p>Add tags to your order.</p>
		</LegacyCard>
	</Layout.Section>

	<Layout.Section variant="oneThird">
		<LegacyCard title="Tags" sectioned>
			<p>Add tags to your order.</p>
		</LegacyCard>
	</Layout.Section>
</Layout>

<Tooltip customTrigger content="Tooltip content Tooltip content" open={true}>
	{#snippet trigger({props})}
		<button {...props}>Trigger</button>
	{/snippet}
</Tooltip>

<Pagination
	label="Results"
	hasPrevious
	onPrevious={() => {
		console.log('Previous');
	}}
	hasNext
	onNext={() => {
		console.log('Next');
	}}
/>

<p>(Raw value: {mediaQuery.isNavigationCollapsed})</p> -->

{#snippet cboxIcon()}
	<Icon source={SearchIcon} />
{/snippet}

{#snippet cboxActivator()}
	<Combobox.TextField
		prefix={cboxIcon}
		onChange={updateText}
		label="Search tags"
		labelHidden
		value={inputValue}
		placeholder="Search tags"
		autoComplete="off"
	/>
{/snippet}

{#snippet optionsMarkup()}
	{#if options.length > 0}
		{#each options as option}
			<Listbox.Option
				value={option.value}
				selected={selectedOption === option.value}
				accessibilityLabel={option.label}
				children={option.label}
			/>
		{/each}
	{/if}
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
	<!-- <MediaCard
		title="Get closer to launching your store"
		primaryAction={{
			content: 'Add a product',
			onAction: () => {}
		}}
		secondaryAction={{
			content: 'Learn more',
			onAction: () => {}
		}}
		description="Start your business with eye-catching inventory."
		popoverActions={[{ content: 'Dismiss', onAction: () => {} }]}
	>
		<img
			alt=""
			width="100%"
			height="100%"
			style={applyStyles({
				objectFit: 'cover',
				objectPosition: 'center'
			})}
			src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
		/>
	</MediaCard>

	<Listbox accessibilityLabel="Basic Listbox example">
		<Listbox.Option value="UniqueValue-1" children="Item 1" />
		<Listbox.Option value="UniqueValue-2" children="Item 2" />
		<Listbox.Option value="UniqueValue-3" children="Item 3" />
	</Listbox>


	

	<Combobox>
		{#snippet activator()}
			{@render cboxActivator()}
		{/snippet}
	
		{#if options.length > 0}
			<Listbox onSelect={updateSelection}>
				{@render optionsMarkup()}
			</Listbox>
		{/if}
	</Combobox> -->

	<DatePicker
      month={1}
      year={2025}
      onChange={() => {}}
      onMonthChange={() => {}}
      selected={{
		start: new Date('Wed Feb 07 2025 00:00:00 GMT-0500 (EST)'),
		end: new Date('Sat Feb 10 2025 00:00:00 GMT-0500 (EST)'),
	  }}
	  disableDatesBefore={new Date('Sat Feb 03 2025 00:00:00 GMT-0500 (EST)')}
      disableDatesAfter={new Date('Sun Feb 18 2025 00:00:00 GMT-0500 (EST)')}
      allowRange
    />
</Page>
