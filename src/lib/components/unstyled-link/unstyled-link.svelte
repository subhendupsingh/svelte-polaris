<script lang="ts">
	import { unstyled } from "$utilities/shared.js";
	import type { UnstyledLinkProps } from "./types.js";

	let { external, url, target: targetProp, ref, ...rest }: UnstyledLinkProps = $props();

	let target = $derived(external ? '_blank' : (targetProp ?? undefined));
	const rel = $derived(target === '_blank' ? 'noopener noreferrer' : undefined);
</script>

<a {target} {...rest} href={url} {rel} {...unstyled.props} bind:this={ref}>
</a>
