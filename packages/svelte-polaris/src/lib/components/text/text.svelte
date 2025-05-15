<script lang='ts'>
	import { classNames } from '../../utilities/css.js';
    import styles from './text.module.css';
	import type { TextProps } from './types.js';
    let {
        alignment = 'start',
        as = 'span',
        breakWord = false,
        children,
        tone = undefined,
        fontWeight = 'regular',
        id,
        numeric = false,
        truncate = false,
        variant = 'bodyMd',
        visuallyHidden = false,
        textDecorationLine = undefined,
    }: TextProps = $props();

    const className = $derived(
            classNames(
            styles.root,
            variant && styles[variant],
            fontWeight && styles[fontWeight],
            (alignment || truncate) && styles.block,
            alignment && styles[alignment],
            breakWord && styles.break,
            tone && styles[tone],
            numeric && styles.numeric,
            truncate && styles.truncate,
            visuallyHidden && styles.visuallyHidden,
            textDecorationLine && styles[textDecorationLine],
        )
    );
</script>

<svelte:element this={as} class={className} {...(id && {id})}>
    {@render children?.()}
</svelte:element>