<script lang="ts">
	import UnstyledLink from '$lib/components/button/unstyled-link.svelte';
	import { classNames } from '$utilities/css.js';
	import styles from '../../tabs.module.css';
	import type { ItemProps } from './types.js';

	let { id, focused, children, url, accessibilityLabel }: ItemProps = $props();
	let focusedNode = $state<HTMLButtonElement | null>(null);

	$effect(() => {
		if (focusedNode && focusedNode instanceof HTMLElement && focused) {
			requestAnimationFrame(() => {
				focusedNode?.focus();
			});
		}
	});

	const classname = $derived(classNames(styles.Item));

	const sharedProps = $derived({
		id,
		ref: focusedNode,
		onclick,
		class: classname,
		'aria-selected': false,
		'aria-label': accessibilityLabel
	});
</script>

<li>
	{#if url}
		<UnstyledLink {...sharedProps} {url}>
			{@render children?.()}
		</UnstyledLink>
	{:else}
		<button bind:this={focusedNode} type="button" {...sharedProps}>
			{@render children?.()}
		</button>
	{/if}
</li>
