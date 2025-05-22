<script lang="ts">
	import type { Snippet } from 'svelte';
	import styles from '../../popover.module.css';
	import Box from '$lib/components/box/box.svelte';

	export interface SectionProps {
		children?: Snippet;
	}

	let { children }: SectionProps = $props();
</script>

<div class={styles.Section}>
	<Box
		paddingInlineStart="300"
		paddingInlineEnd="300"
		paddingBlockStart="200"
		paddingBlockEnd="150"
	>
		{@render children?.()}
	</Box>
</div>
