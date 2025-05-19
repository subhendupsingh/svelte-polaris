<script lang="ts">
	import { applyStyles, getResponsiveProps, getResponsiveValue } from '$utilities/css.js';
	import styles from './inline-stack.module.css';
	import type { InlineStackProps } from './types.js';
	let {
		as: Element = 'div',
		align,
		direction = 'row',
		blockAlign,
		gap,
		wrap = true,
		children
	}: InlineStackProps = $props();

	const style = $derived({
		'--pc-inline-stack-align': align,
		'--pc-inline-stack-block-align': blockAlign,
		'--pc-inline-stack-wrap': wrap ? 'wrap' : 'nowrap',
		...getResponsiveProps('inline-stack', 'gap', 'space', gap),
		...getResponsiveValue('inline-stack', 'flex-direction', direction)
	});
</script>

<svelte:element this={Element} class={styles.InlineStack} style={applyStyles(style)}>
	{@render children?.()}
</svelte:element>
