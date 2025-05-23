<script lang="ts">
	import Spinner from '$lib/components/spinner/spinner.svelte';
	import { useListbox } from '$utilities/listbox/hooks.js';
	import styles from './loading.module.css';
	import type { LoadingProps } from './types.js';
	let { children, accessibilityLabel: label }: LoadingProps = $props();
	const { setLoading } = useListbox();

	$effect(() => {
		setLoading(label);

		return () => {
			setLoading(undefined);
		};
	});
</script>

<li class={styles.ListItem} role="presentation">
	{#if children}
		{@render children()}
	{:else}
		<div class={styles.Loading}>
			<Spinner size="small" accessibilityLabel={label} />
		</div>
	{/if}
</li>
