<script lang="ts">
	import { classNames } from '../../utilities/css.js';
	import styles from './text.module.css';
	import type { TextProps } from './types.js';
	let {
		alignment,
		as,
		breakWord,
		children,
		tone,
		fontWeight,
		id,
		numeric = false,
		truncate = false,
		variant,
		visuallyHidden = false,
		textDecorationLine
	}: TextProps = $props();

	const className = $derived(
		classNames(
			styles.root,
			variant && styles[variant],
			fontWeight && styles[fontWeight],
			(alignment || truncate) && styles.block,
			alignment && styles[alignment],
			breakWord && styles.break,
			tone && styles[tone],
			numeric && styles.numeric,
			truncate && styles.truncate,
			visuallyHidden && styles.visuallyHidden,
			textDecorationLine && styles[textDecorationLine]
		)
	);

    const Component = $derived(as || (visuallyHidden ? 'span' : 'p'));
</script>

<svelte:element this={Component} class={className} {...id && { id }}>
	{@render children?.()}
</svelte:element>
