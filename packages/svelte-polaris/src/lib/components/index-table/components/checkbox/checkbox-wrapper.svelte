<script lang="ts">
	import { useContext } from '$utilities/contexts.js';
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import { ROW_CONTEXT_KEY } from '$utilities/index-table/context.js';
	import type { RowContextType } from '$utilities/index-table/context.js';
	import { debounce } from '$utilities/debounce.js';
	import { setRootProperty } from '$utilities/set-root-property.js';
	import { classNames } from '$utilities/css.js';
	import sharedStyles from '../../index-table.module.css';
	import { browser } from '$app/environment';

	let { children }: { children: Snippet } = $props();
	const rowContext = useContext<RowContextType>(ROW_CONTEXT_KEY);
	const { position } = $derived(rowContext());
	let checkboxNode = $state<HTMLTableDataCellElement | null>(null);

	const handleResize = debounce(() => {
		if (position !== 0 || !checkboxNode) return;

		const { width } = checkboxNode.getBoundingClientRect();
		setRootProperty('--pc-checkbox-offset', `${width}px`);
	});

	onMount(() => {
		if (!browser) return;
		handleResize();
		window?.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		if (!browser) return;
		window?.removeEventListener('resize', handleResize);
	});

	const checkboxClassName = $derived(
		classNames(sharedStyles.TableCell, sharedStyles['TableCell-first'])
	);
</script>

<td class={checkboxClassName} bind:this={checkboxNode}>
	{@render children?.()}
</td>
