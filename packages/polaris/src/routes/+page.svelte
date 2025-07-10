<script lang="ts">
	import Tabs from '$lib/components/tabs/tabs.svelte';
	import { Button, Card, Layout, Listbox, Page, RangeSlider } from '$lib/index.js';
	import ChevronUpIcon from '@shopify/polaris-icons/dist/svg/ChevronUpIcon.svg?component';
	let sliderValue = $state(0);
	$inspect("sliderValue", sliderValue)
</script>


<Page>
	<Listbox enableKeyboardControl={false}>
		<Listbox.Action value="1">Option 1</Listbox.Action>
		<Listbox.Action value="2">Option 2</Listbox.Action>
		<Listbox.Action value="3">Option 3</Listbox.Action>
	</Listbox>
</Page>
