<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import styles from './skeleton-tabs.module.css';
	import type { SkeletonTabsProps } from './types.js';
	let { count = 2, fitted = false }: SkeletonTabsProps = $props();
</script>

<div class={classNames(styles.Tabs, fitted && styles.fitted)}>
	{#each Array(count) as _}
		<div class={classNames(styles.Tab)}>
			<div class={styles.TabText}></div>
		</div>
	{/each}
</div>
