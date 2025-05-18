<script lang="ts">
	import type { ItemProps } from '../../types.js';
	import styles from '../../connected.module.css';
	import { useToggle } from '$lib/use/use-toggle.svelte.js';
	import { classNames } from '$utilities/css.js';
	let { children, position }: ItemProps = $props();

	const {
		value: focused,
		setTrue: forceTrueFocused,
		setFalse: forceFalseFocused
	} = useToggle(false);

	const className = $derived(
		classNames(
			styles.Item,
			focused && styles['Item-focused'],
			position === 'primary' ? styles['Item-primary'] : styles['Item-connection']
		)
	);
</script>

<div onblur={forceFalseFocused} onfocus={forceTrueFocused} class={className}>
	{@render children?.()}
</div>
