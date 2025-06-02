<script lang="ts">
    let { src, title } = $props();

    const isDev = import.meta.env.DEV;
    let finalUrl = $derived(isDev ? `http://localhost:5173/components/${src}` : `https://svelte-polaris-examples.storebud.workers.dev/components/${src}`);
    
</script>

{#if finalUrl}
    <iframe
        src={finalUrl}
        frameborder="0"
        {title}
        scrolling="no"
        style="width: 100%; height: 300px; border: none;"
    ></iframe>
{:else}
    <p>Preview not available</p>
{/if}
