<script lang="ts">
	import type { BorderRadiusAliasOrScale, ShadowAliasOrScale } from '@shopify/polaris-tokens';
	import styles from './shadow-bevel.module.css';
	import type { ShadowBevelProps } from './types.js';
	import { applyStyles, classNames, createStyleString, getResponsiveValue, mapResponsiveProp, sanitizeCustomProperties } from '$utilities/css.js';

	let { as = 'div', bevel = true, borderRadius, boxShadow, children, zIndex = '0' }: ShadowBevelProps = $props();

    const className = $derived(
        classNames(
          styles.ShadowBevel,
        )
    );

    const style = $derived({
        '--pc-shadow-bevel-z-index': zIndex,
        ...getResponsiveValue(
          'shadow-bevel',
          'content',
          mapResponsiveProp(bevel, (bevel) => (bevel ? '""' : 'none')),
        ),
        ...getResponsiveValue(
          'shadow-bevel',
          'box-shadow',
          mapResponsiveProp(bevel, (bevel) =>
            bevel ? `var(--p-shadow-${boxShadow})` : 'none',
          ),
        ),
        ...getResponsiveValue(
          'shadow-bevel',
          'border-radius',
          mapResponsiveProp(bevel, (bevel) =>
            bevel
              ? `var(--p-border-radius-${borderRadius})`
              : 'var(--p-border-radius-0)',
          ),
        ),
    });
</script>

<svelte:element this={as} class={className} style={applyStyles(style)}>
    {@render children?.()}
</svelte:element>
