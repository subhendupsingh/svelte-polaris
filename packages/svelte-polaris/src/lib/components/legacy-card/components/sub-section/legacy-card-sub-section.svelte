<script lang='ts'>
	import type { Snippet } from 'svelte';
    import styles from '../../legacy-card.module.css';

    let { children }: { children?: Snippet } = $props();
</script>

<div class={styles.Subsection}>
    {@render children?.()}
</div>