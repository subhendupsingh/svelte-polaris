<script lang="ts">
	import AccountConnection from '$lib/components/account-connection/account-connection.svelte';
	import Avatar from '$lib/components/avatar/avatar.svelte';
	import BlockStack from '$lib/components/block-stack/block-stack.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Card from '$lib/components/card/card.svelte';
	import FormLayout from '$lib/components/form-layout/types.js';
	import Grid from '$lib/components/grid/index.js';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import LegacyCard from '$lib/components/legacy-card/legacy-card.svelte';
	import Link from '$lib/components/link/link.svelte';
	import PageActions from '$lib/components/page-actions/page-actions.svelte';
	import Tag from '$lib/components/tag/tag.svelte';
	import TextField from '$lib/components/text-field/text-field.svelte';

	let accountName = 'Example App';
	let connected = false;
	let buttonText = 'Connect';
	let handleAction = () => {};
	let details = 'Details';
	let terms = 'By clicking <strong>Connect</strong>, you agree to accept Sample App’s';
	const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];

	let value = $state<string | undefined>('');
	
	let suggestion = $derived.by(()=>{
		if(value){
			//@ts-ignore
			const sug = suggestions.find((suggestion) => suggestion.toLowerCase().startsWith(value.toLowerCase()));
			return sug;
		}
		return '';
	});

	let suggestions = $state([
		'Alabama',
		'Alaska',
		'American Samoa',
		'Arizona',
		'Arkansas',
		'California',
		'Colorado',
		'Connecticut',
		'Delaware',
		'District of Columbia',
		'Florida',
		'Georgia',
		'Guam',
		'Hawaii',
		'Idaho',
		'Illinois',
		'Indiana',
		'Iowa',
		'Kansas',
		'Kentucky',
		'Louisiana',
		'Maine',
		'Maryland',
		'Massachusetts',
		'Michigan',
		'Minnesota',
		'Icon Outlying Islands',
		'Mississippi',
		'Missouri',
		'Montana',
		'Nebraska',
		'Nevada',
		'New Hampshire',
		'New Jersey',
		'New Mexico',
		'New York',
		'North Carolina',
		'North Dakota',
		'Northern Mariana Islands',
		'Ohio',
		'Oklahoma',
		'Oregon',
		'Pennsylvania',
		'Puerto Rico',
		'Rhode Island',
		'South Carolina',
		'South Dakota',
		'Tennessee',
		'Texas',
		'U.S. Virgin Islands',
		'Utah',
		'Vermont',
		'Virginia',
		'Washington',
		'West Virginia',
		'Wisconsin',
		'Wyoming'
	]);

	const handleChange = (value: string) => {
		suggestion = value && suggestions.find((suggestion) => suggestion.toLowerCase().startsWith(value.toLowerCase()));
		value = suggestion ? suggestion : value;
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === 'Tab') {
			value = suggestion || value;
			suggestion = '';
		} else if (event.key === 'Backspace') {
			value = value;
			suggestion = '';
		}
	};
</script>

{#snippet select()}
	abc
{/snippet}

{#snippet verticalContentMarkup()}
	<InlineStack gap="200">
		{#each tags as tag}
			<Tag>{tag}</Tag>
		{/each}
	</InlineStack>
{/snippet}

<Card>
	<BlockStack gap="400">
		<TextField label="Store name" {value} autoComplete="off" />

		<TextField
			label="Quantity"
			type="number"
			align="right"
			labelAction={{ content: 'Look up codes' }}
			{value}
			onChange={(newValue) => (value = newValue)}
			autoComplete="off"
		/>

		<TextField label="Email" type="email" {value} autoComplete="email" />

		<TextField label="Shipping address" {value} multiline={4} autoComplete="off" />

		<FormLayout>
			<FormLayout.Group condensed>
				<TextField
					label="Gift cards expire after"
					type="number"
					placeholder="Example: North America, Europe"
					helpText="We’ll use this address if we need to contact you about your account."
					labelHidden
					prefix="$"
					{value}
					autoComplete="off"
					connectedRight={select}
				/>

				<TextField labelHidden label="Collection rule content" error={true} autoComplete="off" />

				<TextField labelHidden label="Collection rule content" disabled={true} autoComplete="off" />
			</FormLayout.Group>
		</FormLayout>

		<TextField
			label="Tags"
			placeholder="Search tags"
			autoComplete="off"
			error="Store name is required"
			verticalContent={verticalContentMarkup}
		/>

		<TextField
			label="Store name"
			{value}
			onChange={(newValue) => (value = newValue)}
			maxLength={20}
			autoComplete="off"
			loading
			showCharacterCount
		/>

		<TextField
			label="Store name"
			{value}
			onChange={(newValue) => (value = newValue)}
			clearButton
			onClearButtonClick={() => (value = '')}
			autoComplete="off"
		/>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div onkeydown={handleKeyDown}>
			<TextField
				type="text"
				label="State"
				bind:value={value}
				suggestion={suggestion}
				onChange={handleChange}
				autoComplete="off"
			/>
		</div>
	</BlockStack>
</Card>

<Grid columns={{sm: 3}}>
	<Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 8, xl: 8}}>
	  <LegacyCard title="Sales" sectioned>
		<p>View a summary of your online store’s sales.</p>
	  </LegacyCard>
	</Grid.Cell>
	<Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
	  <LegacyCard title="Orders" sectioned>
		<p>View a summary of your online store’s orders.</p>
	  </LegacyCard>
	</Grid.Cell>
  </Grid>
