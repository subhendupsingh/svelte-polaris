<script lang='ts'>
	import type { Snippet } from 'svelte';
    import type { LinkButtonProps } from './button.types.js';
	import { unstyled } from '$utilities/shared.js';
    let {url, external, download, target, children, ...restProps }: LinkButtonProps & { children?: Snippet } = $props();
    const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
</script>

{#if external}
    <a href={url} target="_blank" {...unstyled.props} download={download} rel={rel} {...restProps}>
        {@render children?.()}
    </a>
{:else}
    <a href={url} target="_self" {...unstyled.props} download={download} rel={rel} {...restProps}>
        {@render children?.()}
    </a>
{/if}