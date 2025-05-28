<script lang="ts">
	import { classNames, variationName } from '$utilities/css.js';
	import styles from './button-group.module.css';
	import type { ButtonGroupProps } from './types.js';

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
