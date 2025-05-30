<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SectionProps } from './types.js';
	import SectionContextProvider from './section-context-provider.svelte';
	import { classNames } from '$utilities/css.js';
	import styles from './section.module.css';
	import { listboxSectionDataSelector } from './selectors.js';

	const id = $props.id();

	let { children, divider = true, title }: SectionProps = $props();
</script>

<SectionContextProvider value={id}>
	<li role="presentation" {...listboxSectionDataSelector.props}>
		{#if typeof title === 'string'}
			{title}
		{:else}
			{@render title()}
		{/if}
		
		<ul
			role="group"
			aria-labelledby={id}
			class={classNames(styles.SectionGroup, !divider && styles.noDivider)}>
			{@render children?.()}
		</ul>
	</li>
</SectionContextProvider>
