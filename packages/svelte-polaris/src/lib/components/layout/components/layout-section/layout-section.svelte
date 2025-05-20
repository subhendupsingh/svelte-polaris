<script lang='ts'>
	import { classNames } from '$utilities/css.js';
    import styles from '../../layout.module.css';
    import type { SectionProps } from '../../types.ts';
    let { children, variant }: SectionProps = $props();

    const className = $derived(classNames(styles.Section, styles[`Section-${variant}`]));
</script>

<div class={className}>{@render children?.()}</div>