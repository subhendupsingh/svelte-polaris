<script lang="ts">
	import { useToggle } from '$lib/use/use-toggle.svelte.js';
	import styles from '../../button-group.module.css';
	import { classNames } from '$utilities/css.js';
	import type { ButtonProps } from '$lib/components/button/button.types.js';

	interface ItemProps {
		button: ButtonProps;
	}

	let { button }: ItemProps = $props();

	const {
		value: focused,
		setTrue: forceTrueFocused,
		setFalse: forceFalseFocused
	} = useToggle(false);

	const className = $derived(
		classNames(
			styles.Item,
			focused && styles['Item-focused'],
			button.variant === 'plain' && styles['Item-plain']
		)
	);
</script>

<div class={className} onfocus={forceTrueFocused} onblur={forceFalseFocused}>
	{@render button.children?.()}
</div>
