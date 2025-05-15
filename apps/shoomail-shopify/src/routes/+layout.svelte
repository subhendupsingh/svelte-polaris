<script lang='ts'>
	import { PolarisStyles } from 'svelte-polaris';

    let {children} = $props()
</script>

<PolarisStyles />
{@render children?.()}