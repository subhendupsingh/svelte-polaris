<script lang="ts">
	import DualThumb from './components/dual-thumb/dual-thumb.svelte';
	import SingleThumb from './components/single-thumb/single-thumb.svelte';
	import type { DualValue, RangeSliderProps, RangeSliderValue } from './types.js';

	let { min = 0, max = 100, step = 1, value = $bindable(), ...rest }: RangeSliderProps = $props();
	const id = $props.id();

	const sharedProps = $derived({
		id,
		min,
		max,
		step,
		...rest
	});

	function isDualThumb(value: RangeSliderValue): value is DualValue {
		return Array.isArray(value);
	}
</script>

{#if isDualThumb(value)}
    <!-- <DualThumb {...sharedProps} value={value} /> -->
     Dual Thumb to be implemented
{:else}
    <SingleThumb {...sharedProps} bind:value={value} />
{/if}

