<script lang="ts">
	import styles from './checkbox.module.css';
	import sharedStyles from '../../index-table.module.css';
	import type { CheckboxProps } from './types.js';
	import { useContext } from '$utilities/contexts.js';
	import type { IndexRowContextType } from '$utilities/index-provider/context.js';
	import { ROW_CONTEXT_KEY, type RowContextType } from '$utilities/index-table/context.js';
	import CheckboxWrapper from './checkbox-wrapper.svelte';
	import { noop } from '$utilities/noop.js';
	import { useIndexValue } from '$utilities/index-provider/hooks.js';

	let { accessibilityLabel }: CheckboxProps = $props();
	const { resourceName } = useIndexValue();
	const { itemId, selected, disabled, onInteraction } = useContext<RowContextType>(ROW_CONTEXT_KEY);
	const label = accessibilityLabel ? accessibilityLabel : `Select ${resourceName}`;
</script>

<CheckboxWrapper>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class={styles.Wrapper} onclick={onInteraction} onkeyup={noop}>
		<Checkbox id={`Select-${itemId}`} {label} labelHidden checked={selected} {disabled} />
	</div>
</CheckboxWrapper>
