<script lang="ts">
  import styles from './skeleton-body-text.module.css';
	import type { SkeletonBodyTextProps } from './types.js';
  let {lines = 3}: SkeletonBodyTextProps = $props()
</script>

<div class={styles.SkeletonBodyTextContainer}>
  {#each Array(lines) as _,i }
    {#key i}
      <div class={styles.SkeletonBodyText}></div>
    {/key}
  {/each}
</div>
