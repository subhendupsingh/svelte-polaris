<script lang='ts'>
	import { isComponent, isSnippet } from "$utilities/is-svelte-component.js";
	import type { SvelteNode } from "$utilities/types.js";
	import type { Snippet } from "svelte";

    let { node, children }: { node: SvelteNode, children?: Snippet } = $props();
</script>

{#if isSnippet(node)}
    {@render node()}
{:else if isComponent(node)}
    <!-- svelte-ignore svelte_component_deprecated -->
    <svelte:component this={node}></svelte:component>
{:else}
    {node}
{/if}

{@render children?.()}