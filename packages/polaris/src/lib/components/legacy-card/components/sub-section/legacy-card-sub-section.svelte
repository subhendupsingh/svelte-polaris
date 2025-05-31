<script lang='ts'>
    import styles from '../../legacy-card.module.css';
    import type { LegacyCardSubsectionProps } from './types.ts';

    let { children }: LegacyCardSubsectionProps = $props();
</script>

<div class={styles.Subsection}>
    {@render children?.()}
</div>