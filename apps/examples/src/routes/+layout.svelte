<script lang='ts'>
    import { PolarisAppProvider } from 'svelte-polaris';
    let { children } = $props()
</script>

<PolarisAppProvider>
    {@render children?.()}
</PolarisAppProvider>