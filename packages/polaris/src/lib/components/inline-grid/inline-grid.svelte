<script lang="ts">
	import { applyStyles, getResponsiveProps, getResponsiveValue, type ResponsiveValue } from '$utilities/css.js';
	import styles from './inline-grid.module.css';
	import type { Columns, ColumnsType, InlineGridProps } from './types.js';

	let { children, columns, gap, alignItems }: InlineGridProps = $props();

	function formatInlineGrid(columns?: Columns): ResponsiveValue {
		if (typeof columns === 'object' && columns !== null && !Array.isArray(columns)) {
			return Object.fromEntries(
				Object.entries(columns).map(([breakpointAlias, breakpointInlineGrid]) => [
					breakpointAlias,
					getColumnValue(breakpointInlineGrid)
				])
			);
		}

		return getColumnValue(columns);
	}

	function getColumnValue(columns?: ColumnsType) {
		if (!columns) return undefined;

		if (typeof columns === 'number' || !isNaN(Number(columns))) {
			return `repeat(${Number(columns)}, minmax(0, 1fr))`;
		}

		if (typeof columns === 'string') return columns;

		return columns
			.map((column) => {
				switch (column) {
					case 'oneThird':
						return 'minmax(0, 1fr)';
					case 'oneHalf':
						return 'minmax(0, 1fr)';
					case 'twoThirds':
						return 'minmax(0, 2fr)';
				}
			})
			.join(' ');
	}

	const style = $derived({
		...getResponsiveValue('inline-grid', 'grid-template-columns', formatInlineGrid(columns)),
		...getResponsiveProps('inline-grid', 'gap', 'space', gap),
		'--pc-inline-grid-align-items': alignItems
	});
</script>

<div class={styles.InlineGrid} style={applyStyles(style)}>
  {@render children?.()}
</div>
