<script lang="ts">
	import Tabs from '$lib/components/tabs/tabs.svelte';
	import { Button, Card, Layout, Page, RangeSlider } from '$lib/index.js';
	import ChevronUpIcon from '@shopify/polaris-icons/dist/svg/ChevronUpIcon.svg?component';
	let sliderValue = $state(0);
	$inspect("sliderValue", sliderValue)
</script>


<Page>
	<Button icon={ChevronUpIcon}>Button</Button>
	<RangeSlider step={1} label="Range Slider" output bind:value={sliderValue} onChange={(value) => sliderValue = Number(value)} />
</Page>
