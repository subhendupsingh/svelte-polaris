<script lang='ts'>
	import { useBreakpoints } from "$lib/use/use-breakpoints.svelte.js";
	import { classNames, variationName } from "$utilities/css.js";
	import Text from "../text/text.svelte";
    import styles from './icon.module.css';
    import type { IconProps } from './types.ts';
    let { source, tone, accessibilityLabel }: IconProps = $props();

    const className = $derived(
        classNames(
            styles.Icon,
            tone && styles[variationName('tone', tone)],
        )
    );

    const {mdDown} = useBreakpoints();
</script>

<span class={className}>
    {#if accessibilityLabel}
        <Text as="span" visuallyHidden>
            {accessibilityLabel}
        </Text>
    {/if}

    <!--svelte-ignore svelte_component_deprecated -->
    <svelte:component this={source} class={styles.Svg} focusable="false" aria-hidden="true" {...(mdDown ? {viewBox: '1 1 18 18'} : {})} />
</span>