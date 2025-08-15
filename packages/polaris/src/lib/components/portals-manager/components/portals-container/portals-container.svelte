<script lang="ts">
	import type { PolarisContainerProps } from './types.js';


	let { ref = $bindable(), ...rest }: PolarisContainerProps = $props();
</script>

<div id="PolarisPortalsContainer" {...rest} bind:this={ref}>
</div>

