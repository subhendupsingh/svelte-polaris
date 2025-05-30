<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import UnstyledLink from '../button/unstyled-link.svelte';
	import styles from './link.module.css';
	import type { LinkProps } from './types.js';

	let {
		url,
		children,
		onClick,
		external,
		target,
		id,
		monochrome,
		removeUnderline,
		accessibilityLabel,
		dataPrimaryLink
	}: LinkProps = $props();

	const shouldBeMonochrome = monochrome;

	const className = $derived(
		classNames(
			styles.Link,
			shouldBeMonochrome && styles.monochrome,
			removeUnderline && styles.removeUnderline
		)
	);
</script>

{#if url}
	<UnstyledLink {className} {url} {external} {target}>
		{@render children?.()}
	</UnstyledLink>
{:else}
	<button
		type="button"
		onclick={onClick}
		class={className}
		{id}
		aria-label={accessibilityLabel}
		data-primary-link={dataPrimaryLink}
	>
		{@render children?.()}
	</button>
{/if}
