<script lang="ts">
	import {
		classNames,
		createStyleString,
		getResponsiveProps,
		sanitizeCustomProperties
	} from '$utilities/css.js';
	import styles from './block-stack.module.css';
	import type { BlockStackProps } from './types.js';
	let {
		children,
		as = 'div',
		align,
		inlineAlign,
		gap,
		id,
		reverseOrder = false,
		role,
		...restProps
	}: BlockStackProps = $props();

	const className = $derived(
		classNames(
			styles.BlockStack,
			(as === 'ul' || as === 'ol') && styles.listReset,
			as === 'fieldset' && styles.fieldsetReset
		)
	);

	const style = $derived({
		'--pc-block-stack-align': align ? `${align}` : null,
		'--pc-block-stack-inline-align': inlineAlign ? `${inlineAlign}` : null,
		'--pc-block-stack-order': reverseOrder ? 'column-reverse' : 'column',
		...getResponsiveProps('block-stack', 'gap', 'space', gap)
	});
</script>

<svelte:element
	this={as}
	class={className}
	style={createStyleString(sanitizeCustomProperties(style))}
	{...id ? { id } : {}}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
