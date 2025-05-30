<script lang="ts">
	import { applyStyles } from '$utilities/css.js';
	import styles from './divider.module.css';
	import type { DividerProps } from './types.js';

	let { borderColor = 'border-secondary', borderWidth = '025' }: DividerProps = $props();

	const borderColorValue = $derived(
		borderColor === 'transparent' ? borderColor : `var(--p-color-${borderColor})`
	);
</script>

<hr
	class={styles.Divider}
	style={applyStyles({
		'border-block-start': `var(--p-border-width-${borderWidth}) solid ${borderColorValue}`
	})}
/>
