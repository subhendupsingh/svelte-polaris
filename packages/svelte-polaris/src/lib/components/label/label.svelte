<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import styles from './label.module.css';
	import type { LabelProps } from './types.js';
	import Text from '../text/text.svelte';
	let { children, id, hidden, requiredIndicator }: LabelProps = $props();
	function labelID(id: string) {
		return `${id}Label`;
	}

	const className = $derived(classNames(styles.Label, hidden && styles.hidden));
	const labelClassName = $derived(
		classNames(styles.Text, requiredIndicator && styles.RequiredIndicator)
	);
</script>

<div class={className}>
	<label {id} for={labelID(id)} class={labelClassName}>
		<Text as="span" variant="bodyMd">
			{@render children?.()}
		</Text>
	</label>
</div>
