<script lang="ts">
	import { classNames, variationName } from '$utilities/css.js';
	import type { Snippet } from 'svelte';
	import styles from './button-group.module.css';
	import ButtonGroupItem from './components/item/button-group-item.svelte';
	import InlineStack from '../inline-stack/inline-stack.svelte';

	type Gap = 'extraTight' | 'tight' | 'loose';
	type Variant = 'segmented';

	interface ButtonGroupProps {
		/** Determines the space between button group items */
		gap?: Gap;
		/** Styling variant for group */
		variant?: Variant;
		/** Buttons will stretch/shrink to occupy the full width */
		fullWidth?: boolean;
		/** Remove top left and right border radius */
		connectedTop?: boolean;
		/** Prevent buttons in button group from wrapping to next line */
		noWrap?: boolean;
		/** Button components */
		children?: Snippet;
		itemCount?: number
	}

	let { children, gap, variant, fullWidth, connectedTop, noWrap, itemCount }: ButtonGroupProps = $props();

	const className = $derived(
		classNames(
			styles.ButtonGroup,
			gap && styles[gap],
			variant && styles[variationName('variant', variant)],
			fullWidth && styles.fullWidth,
			noWrap && styles.noWrap
		)
	);
</script>

<div
	class={className}
	data-buttongroup-variant={variant}
	data-buttongroup-connected-top={connectedTop}
	data-buttongroup-full-width={fullWidth}
	data-buttongroup-no-wrap={noWrap}
>
	{@render children?.()}
</div>
