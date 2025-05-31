<script lang="ts">
	import { applyStyles, classNames } from '$utilities/css.js';
	import type { CellProps } from '../../types.js';
	import styles from './grid-cell.module.css';
	let { area: gridArea, column, columnSpan, row, children }: CellProps = $props();

	const className = $derived(classNames(
		styles.Cell,
		columnSpan?.xs && styles[`Cell-${columnSpan.xs}-column-xs`],
		columnSpan?.sm && styles[`Cell-${columnSpan.sm}-column-sm`],
		columnSpan?.md && styles[`Cell-${columnSpan.md}-column-md`],
		columnSpan?.lg && styles[`Cell-${columnSpan.lg}-column-lg`],
		columnSpan?.xl && styles[`Cell-${columnSpan.xl}-column-xl`]
	));

	const style = $derived({
		gridArea,
		'--pc-column-xs': column?.xs,
		'--pc-column-sm': column?.sm,
		'--pc-column-md': column?.md,
		'--pc-column-lg': column?.lg,
		'--pc-column-xl': column?.xl,
		'--pc-row-xs': row?.xs,
		'--pc-row-sm': row?.sm,
		'--pc-row-md': row?.md,
		'--pc-row-lg': row?.lg,
		'--pc-row-xl': row?.xl
	});
</script>

<div class={className} style={applyStyles(style)}>
    {@render children?.()}
</div>
