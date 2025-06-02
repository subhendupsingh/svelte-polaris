<script lang='ts'>
    import type { PageProps, PageServerData } from "./$types";
    import { componentsMap } from "./components";
    let { data }: PageProps = $props()

    let componentType = $derived(data.type ?? "base");
    let component = $derived(componentsMap[data.component][componentType]);
</script>

<div style="height: 100vh; width: 100vw; display: flex; justify-content: start; align-items: center; margin-left: 2rem;">
    {@render component?.()}
</div>