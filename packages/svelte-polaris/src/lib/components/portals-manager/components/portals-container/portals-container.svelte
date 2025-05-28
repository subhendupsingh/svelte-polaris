<script lang="ts">
	import type { PropsWithChildren } from '$utilities/props-with-children.js';
	import type { PolarisContainerProps } from './types.js';


	let { ref = $bindable(), ...rest }: PolarisContainerProps = $props();
</script>

<div id="PolarisPortalsContainer" {...rest} bind:this={ref}>
</div>

