<script lang="ts">
    import { setContext } from 'svelte';
    import { PORTALS_MANAGER_KEY, type PortalsManager, type PortalsContainerElement } from '$lib/utilities/contexts.js';
    import { type Snippet } from 'svelte'; 

    let { container, children }: {container?: PortalsContainerElement, children: Snippet} =$props();
  
    setContext(PORTALS_MANAGER_KEY, () => ({ container }));
  
  </script>
  
  <div bind:this={container}>
    {#if children}
      {@render children()}
    {/if}
  </div>