<script lang="ts">
	import AccountConnection from '$lib/components/account-connection/account-connection.svelte';
	import Avatar from '$lib/components/avatar/avatar.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Link from '$lib/components/link/link.svelte';
	import PageActions from '$lib/components/page-actions/page-actions.svelte';

	let accountName = 'Example App';
	let connected = false;
	let buttonText = 'Connect';
	let handleAction = () => {};
	let details = 'Details';
	let terms = 'By clicking <strong>Connect</strong>, you agree to accept Sample App’s';
</script>

<AccountConnection
	{accountName}
	{connected}
	title="Example App"
	action={{
		content: buttonText,
		onAction: handleAction
	}}
	{details}
>
	{#snippet termsOfService()}
		<p>
			By clicking <strong>Connect</strong>, you agree to accept Sample App’s{' '}
			<Link url="Example App">terms and conditions</Link>. You’ll pay a commission rate of 15% on
			sales made through Sample App.
		</p>
	{/snippet}
</AccountConnection>

<Avatar
	customer={true}
	name="Example App"
	source="https://avatar.iran.liara.run/public/44"
	size="xl"
	initials="EA"
	accessibilityLabel="Example App"
/>

<PageActions
	primaryAction={{
		content: 'Save'
	}}
>
	{#snippet secondaryActions()}
		<Button variant="secondary">Cancel</Button>
	{/snippet}
</PageActions>
