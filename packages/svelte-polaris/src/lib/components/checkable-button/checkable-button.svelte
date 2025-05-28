<script lang="ts">
	import type { CheckboxHandles } from '$utilities/types.js';
	import Checkbox from '../checkbox/checkbox.svelte';
	import styles from './checkable-button.module.css';
	import type { CheckableButtonProps } from './types.js';
	import Text from '../text/text.svelte';

	let {
		accessibilityLabel,
		label = '',
		onToggleAll,
		selected,
		disabled,
		ariaLive,
		ref
	}: CheckableButtonProps = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={styles.CheckableButton} onclick={onToggleAll}>
	<div class={styles.Checkbox}>
		<Checkbox
			labelHidden
			{label}
			checked={selected}
			{disabled}
			onChange={onToggleAll}
			bind:ref
		/>

		{#if label}
			<span class={styles.Label} aria-live={ariaLive}>
				<Text as="span" variant="bodySm" fontWeight="medium">
					{label}
				</Text>
			</span>
		{/if}
	</div>
</div>
