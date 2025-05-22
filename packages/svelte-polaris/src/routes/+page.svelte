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
	import Tooltip from '$lib/components/tooltip/tooltip.svelte';
	import { useMediaQuery } from '$lib/use/use-mediaquery.svelte.js';
	import Page from '$lib/components/page/page.svelte';
	import Badge from '$lib/components/badge/badge.svelte';
	import DeleteIcon from '@shopify/polaris-icons/dist/svg/DeleteIcon.svg?component';
	import MediaCard from '$lib/components/media-card/media-card.svelte';
	import { applyStyles } from '$utilities/css.js';
	import Checkbox from '$lib/components/checkbox/checkbox.svelte';
	import ChoiceList from '$lib/components/choice-list/choice-list.svelte';
	import Popover from '$lib/components/popover-polaris/index.js';
	import ActionList from '$lib/components/action-list/action-list.svelte';
	import { onMount } from 'svelte';
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

	let popoverActive = $state(true);
	let togglePopoverActive = () => {
		popoverActive = !popoverActive;
	};

	let activator = $state<HTMLElement>();
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
<Button bind:ref={activator}>Button</Button>

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
	<MediaCard
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

	<Checkbox label="Basic checkbox" checked={false} onChange={(e) => console.log(e)} />

	<ChoiceList
		title="Company name"
		choices={[
			{ label: 'Hidden', value: 'hidden' },
			{ label: 'Optional', value: 'optional' },
			{ label: 'Required', value: 'required' }
		]}
		selected={['optional']}
		onChange={(e) => console.log(e)}
	/>

	{#if activator}
		<Popover
			active={popoverActive}
			{activator}
			autofocusTarget="first-node"
			onClose={togglePopoverActive}
		>
			<Popover.Pane fixed>
				<Popover.Section>
					<p>Available sales channels</p>
				</Popover.Section>
			</Popover.Pane>
			<Popover.Pane>
				<ActionList
					actionRole="menuitem"
					items={[{ content: 'Online store' }, { content: 'Facebook' }, { content: 'Shopify POS' }]}
				/>
			</Popover.Pane>
		</Popover>
	{/if}
</Page>
