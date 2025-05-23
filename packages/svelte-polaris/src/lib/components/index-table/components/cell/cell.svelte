<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import styles from '../../index-table.module.css';
	import type { CellProps } from './types.js';
	let {
		children,
		className: customClassName,
		flush,
		colSpan,
		headers,
		scope,
		as = 'td',
		id
	}: CellProps = $props();

	const className = $derived(
		classNames(customClassName, styles.TableCell, flush && styles['TableCell-flush'])
	);
</script>

<svelte:element this={as} {id} colspan={colSpan} {headers} {scope} class={className}>
	{@render children?.()}
</svelte:element>
