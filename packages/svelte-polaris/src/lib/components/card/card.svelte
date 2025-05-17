<script lang="ts">
	import { useBreakpoints } from '$lib/use/use-breakpoints.svelte.js';
	import type { BorderRadiusAliasOrScale } from '@shopify/polaris-tokens';
	import Box from '../box/box.svelte';
	import ShadowBevel from '../shadow-bevel/shadow-bevel.svelte';
	import type { CardProps } from './types.js';
	let {
		children,
		background = 'bg-surface',
		padding = { xs: '400' },
		roundedAbove = 'sm'
	}: CardProps = $props();

	const defaultBorderRadius: BorderRadiusAliasOrScale = '300';
	let breakpoints = useBreakpoints();
	const hasBorderRadius = $derived(Boolean(breakpoints[`${roundedAbove}Up`]));
</script>

<ShadowBevel boxShadow="100" borderRadius={hasBorderRadius ? defaultBorderRadius : '0'} zIndex="32">
	<Box {background} {padding} overflowX="clip" overflowY="clip" minHeight="100%">
		{@render children?.()}
	</Box>
</ShadowBevel>
