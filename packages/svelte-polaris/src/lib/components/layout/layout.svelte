<script lang="ts">
	import LayoutSection from './components/layout-section/layout-section.svelte';
  import styles from './layout.module.css';
  import type { LayoutProps } from './types.ts';
  let { children, sectioned }: LayoutProps = $props();

</script>

<div class={styles.Layout}>
  {#if sectioned}
    <LayoutSection>
      {@render children?.()}
    </LayoutSection>
  {:else}
    {@render children?.()}
  {/if}
</div>
