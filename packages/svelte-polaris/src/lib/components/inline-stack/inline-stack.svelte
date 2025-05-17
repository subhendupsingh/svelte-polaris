<script lang='ts'>
	import type { InlineStackProps } from "./types.js";
    import {
		applyStyles,
        classNames,
        createStyleString,
        getResponsiveProps,
        getResponsiveValue,
        sanitizeCustomProperties
    } from '$utilities/css.js';
    import styles from './inline-stack.module.css';

    let {
        as = 'div',
        align,
        direction = 'row',
        blockAlign,
        gap,
        wrap = true,
        children,
    } : InlineStackProps = $props();

    const style = {
    '--pc-inline-stack-align': align,
    '--pc-inline-stack-block-align': blockAlign,
    '--pc-inline-stack-wrap': wrap ? 'wrap' : 'nowrap',
    ...getResponsiveProps('inline-stack', 'gap', 'space', gap),
    ...getResponsiveValue('inline-stack', 'flex-direction', direction),
  }
</script>

<svelte:element this={as} class={styles.InlineStack} style={applyStyles(style)}>
    {@render children?.()}
</svelte:element>