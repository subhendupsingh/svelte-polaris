<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import { isInterface } from '$utilities/is-interface.js';
	import PageHeader from './components/page-header/page-header.svelte';
	import { isSvelteConstruct } from './components/page-header/types.js';
	import styles from './page.module.css';
	import type { PageProps } from './types.js';
	let { children, fullWidth, narrowWidth, ...rest }: PageProps = $props();
	const pageClassName = $derived(
		classNames(styles.Page, fullWidth && styles.fullWidth, narrowWidth && styles.narrowWidth)
	);
	const hasHeaderContent = $derived(
		(rest.title != null && rest.title !== '') ||
			(rest.subtitle != null && rest.subtitle !== '') ||
			rest.primaryAction != null ||
			(rest.secondaryActions != null &&
				((isInterface(rest.secondaryActions) && rest.secondaryActions.length > 0) ||
					isSvelteConstruct(rest.secondaryActions))) ||
			(rest.actionGroups != null && rest.actionGroups.length > 0) ||
			rest.backAction != null
	);
	const contentClassName = $derived(classNames(!hasHeaderContent && styles.Content));
</script>

<div class={pageClassName}>
	{#if hasHeaderContent}
		<PageHeader filterActions {...rest} />
	{/if}
	<div class={contentClassName}>
		{@render children?.()}
	</div>
</div>
