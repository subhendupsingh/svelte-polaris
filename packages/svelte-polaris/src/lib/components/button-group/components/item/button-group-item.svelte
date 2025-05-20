<script lang="ts">
	import { useToggle } from '$lib/use/use-toggle.svelte.js';
	import styles from '../../button-group.module.css';
	import { classNames } from '$utilities/css.js';
	import type { ButtonProps } from '$lib/components/button/button.types.js';
	import type { Snippet } from 'svelte';

	interface ItemProps {
		children: Snippet;
		variant?: ButtonProps['variant'];
	}

	let { children, variant }: ItemProps = $props();

	const {
		value: focused,
		setTrue: forceTrueFocused,
		setFalse: forceFalseFocused
	} = useToggle(false);

	const className = $derived(
		classNames(
			styles.Item,
			focused && styles['Item-focused'],
			variant === 'plain' && styles['Item-plain']
		)
	);
</script>

<div class={className} onfocus={forceTrueFocused} onblur={forceFalseFocused}>
	{@render children?.()}
</div>
