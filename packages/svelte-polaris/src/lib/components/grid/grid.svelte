<script lang="ts">
	import { applyStyles } from '$utilities/css.js';
	import styles from './grid.module.css';
	import type { GridProps } from './types.js';
	let { gap, areas, children, columns }: GridProps = $props();

	function formatAreas(areas?: string[]) {
		if (!areas) return;
		return `'${areas?.join(`' '`)}'`;
	}

	const style = $derived({
		'--pc-grid-gap-xs': gap?.xs,
		'--pc-grid-gap-sm': gap?.sm,
		'--pc-grid-gap-md': gap?.md,
		'--pc-grid-gap-lg': gap?.lg,
		'--pc-grid-gap-xl': gap?.xl,
		'--pc-grid-columns-xs': columns?.xs,
		'--pc-grid-columns-sm': columns?.sm,
		'--pc-grid-columns-md': columns?.md,
		'--pc-grid-columns-lg': columns?.lg,
		'--pc-grid-columns-xl': columns?.xl,
		'--pc-grid-areas-xs': formatAreas(areas?.xs),
		'--pc-grid-areas-sm': formatAreas(areas?.sm),
		'--pc-grid-areas-md': formatAreas(areas?.md),
		'--pc-grid-areas-lg': formatAreas(areas?.lg),
		'--pc-grid-areas-xl': formatAreas(areas?.xl)
	});
</script>

<div class={styles.Grid} style={applyStyles(style)}>
	{@render children?.()}
</div>
