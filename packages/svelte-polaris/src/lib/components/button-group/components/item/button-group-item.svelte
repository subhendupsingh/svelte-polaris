<script lang="ts">
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import styles from '../../button-group.module.css';
	import { classNames } from '$utilities/css.js';
	import type { ButtonProps } from '$lib/components/button/button.types.js';
	import type { Snippet } from 'svelte';

	interface ItemProps {
		children: Snippet;
		variant?: ButtonProps['variant'];
	}

	let { children, variant }: ItemProps = $props();
	
	const focused = new UseToggle(false);
	const forceTrueFocused = focused.setTrue;
	const forceFalseFocused = focused.setFalse;

	const className = $derived(
		classNames(
			styles.Item,
			focused.value && styles['Item-focused'],
			variant === 'plain' && styles['Item-plain']
		)
	);
</script>

<div class={className} onfocus={forceTrueFocused} onblur={forceFalseFocused}>
	{@render children?.()}
</div>
