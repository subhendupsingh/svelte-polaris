<script lang="ts">
	import type { ItemProps } from '../../types.js';
	import styles from '../../connected.module.css';
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import { classNames } from '$utilities/css.js';
	let { children, position }: ItemProps = $props();

	const focused = new UseToggle(false);
	const forceTrueFocused = focused.setTrue;
	const forceFalseFocused = focused.setFalse;

	const className = $derived(
		classNames(
			styles.Item,
			focused.value && styles['Item-focused'],
			position === 'primary' ? styles['Item-primary'] : styles['Item-connection']
		)
	);
</script>

<div onblur={forceFalseFocused} onfocus={forceTrueFocused} class={className}>
	{@render children?.()}
</div>
