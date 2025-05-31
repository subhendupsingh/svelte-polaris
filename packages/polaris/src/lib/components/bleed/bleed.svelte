<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Spacing } from './types.js';
	import { createStyleString, getResponsiveProps, sanitizeCustomProperties } from '$utilities/css.js';
	import styles from './bleed.module.css';

	interface Props {
		/** Negative horizontal space around children */
		marginInline?: Spacing;
		/** Negative vertical space around children */
		marginBlock?: Spacing;
		/** Negative top space around children */
		marginBlockStart?: Spacing;
		/** Negative bottom space around children */
		marginBlockEnd?: Spacing;
		/** Negative left space around children */
		marginInlineStart?: Spacing;
		/** Negative right space around children */
		marginInlineEnd?: Spacing;
		children?: Snippet;
	}

	let {
		marginInline,
		marginBlock,
		marginBlockStart,
		marginBlockEnd,
		marginInlineStart,
		marginInlineEnd,
		children
	}: Props = $props();

	const getNegativeMargins = (direction: string) => {
		const xAxis = ['marginInlineStart', 'marginInlineEnd'];
		const yAxis = ['marginBlockStart', 'marginBlockEnd'];

		const directionValues: { [key: string]: Spacing | undefined } = {
			marginBlockStart,
			marginBlockEnd,
			marginInlineStart,
			marginInlineEnd,
			marginInline,
			marginBlock
		};

		if (directionValues[direction]) {
			return directionValues[direction];
		} else if (xAxis.includes(direction) && marginInline) {
			return directionValues.marginInline;
		} else if (yAxis.includes(direction) && marginBlock) {
			return directionValues.marginBlock;
		}
	};

	const negativeMarginBlockStart = getNegativeMargins('marginBlockStart');
	const negativeMarginBlockEnd = getNegativeMargins('marginBlockEnd');
	const negativeMarginInlineStart = getNegativeMargins('marginInlineStart');
	const negativeMarginInlineEnd = getNegativeMargins('marginInlineEnd');

	const style1 = {
		...getResponsiveProps('bleed', 'margin-block-start', 'space', negativeMarginBlockStart),
		...getResponsiveProps('bleed', 'margin-block-end', 'space', negativeMarginBlockEnd),
		...getResponsiveProps('bleed', 'margin-inline-start', 'space', negativeMarginInlineStart),
		...getResponsiveProps('bleed', 'margin-inline-end', 'space', negativeMarginInlineEnd)
	};

</script>

<div class={styles.Bleed} style={createStyleString(sanitizeCustomProperties(style1))}>
	{@render children?.()}
</div>
