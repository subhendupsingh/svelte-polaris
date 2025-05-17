<script lang="ts">
	import type { ImageProps } from './types.js';

	let { alt, sourceSet, source, crossOrigin, ref, onLoad, className, ...rest }: ImageProps = $props();

	const finalSourceSet = $derived(
		sourceSet
			? sourceSet.map(({ source: subSource, descriptor }) => `${subSource} ${descriptor}`).join(',')
			: null
	);
</script>

<img
	{alt}
	bind:this={ref}
	src={source}
	crossorigin={crossOrigin}
	class={className}
	onload={onLoad}
	{...finalSourceSet ? { srcset: finalSourceSet } : {}}
	{...rest}
/>
