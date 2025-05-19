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
	import LegacyCard from '$lib/components/legacy-card/legacy-card.svelte';
	import Link from '$lib/components/link/link.svelte';
	import PageActions from '$lib/components/page-actions/page-actions.svelte';
	import Placeholder from '$lib/components/placeholder/placeholder.svelte';
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

