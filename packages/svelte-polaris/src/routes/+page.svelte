<script lang="ts">
	import AccountConnection from '$lib/components/account-connection/account-connection.svelte';
	import Avatar from '$lib/components/avatar/avatar.svelte';
	import BlockStack from '$lib/components/block-stack/block-stack.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Card from '$lib/components/card/card.svelte';
	import FormLayout from '$lib/components/form-layout/form-layout.svelte';
	import Link from '$lib/components/link/link.svelte';
	import PageActions from '$lib/components/page-actions/page-actions.svelte';
	import TextField from '$lib/components/text-field/text-field.svelte';

	let accountName = 'Example App';
	let connected = false;
	let buttonText = 'Connect';
	let handleAction = () => {};
	let details = 'Details';
	let terms = 'By clicking <strong>Connect</strong>, you agree to accept Sample App’s';

	let value = $state('1');
</script>
{#snippet select()}
	abc
{/snippet}
<Card>
	<BlockStack gap="400">
		
		<TextField label="Store name" {value} autoComplete="off" />

		<TextField
			label="Quantity"
			type="number"
			align="right"
			labelAction={{content: 'Look up codes'}}
			{value}
			onChange={(newValue) => (value = newValue)}
			autoComplete="off"
		/>

		<TextField label="Email" type="email" {value} autoComplete="email" />

		<TextField label="Shipping address" {value} multiline={4} autoComplete="off" />

		<FormLayout>
			<TextField
				label="Gift cards expire after"
				type="number"
				placeholder="Example: North America, Europe"
				helpText="We’ll use this address if we need to contact you about your account."
				labelHidden
				{value}
				autoComplete="off"
				connectedRight={select}
			/>
		</FormLayout>
	</BlockStack>
</Card>
