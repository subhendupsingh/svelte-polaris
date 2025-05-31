<script lang="ts">
	import styles from './checkbox.module.css';
	import type { CheckboxProps } from './types.js';
	import { useContext } from '$utilities/contexts.js';
	import { ROW_CONTEXT_KEY } from '$utilities/index-table/context.js';
	import CheckboxWrapper from './checkbox-wrapper.svelte';
	import { noop } from '$utilities/noop.js';
	import Checkbox from '$lib/components/checkbox/checkbox.svelte';
	import { getContext } from 'svelte';
	import type { IndexContextType } from '$utilities/index-provider/context.js';
	import { INDEX_CONTEXT_KEY } from '$utilities/index-provider/hooks.js';

	let { accessibilityLabel }: CheckboxProps = $props();
	const indexContext = useContext<IndexContextType>(INDEX_CONTEXT_KEY);
	const { resourceName } = $derived(indexContext());

	const rowContext = getContext<Function>(ROW_CONTEXT_KEY);
	const { itemId, selected, disabled, onInteraction } = $derived(rowContext());
	const label = $derived(accessibilityLabel ? accessibilityLabel : `Select ${resourceName}`);
</script>

<CheckboxWrapper>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={styles.Wrapper} onclick={onInteraction} onkeyup={noop}>
		<Checkbox id={`Select-${itemId}`} {label} labelHidden checked={selected} {disabled} />
	</div>
</CheckboxWrapper>
