<script lang="ts">
	import styles from '../../list.module.css';
	import type { ItemProps } from './types.js';

	let { children }: ItemProps = $props();
</script>

<li class={styles.Item}>
	{@render children?.()}
</li>