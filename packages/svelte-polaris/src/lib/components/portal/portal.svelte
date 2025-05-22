<script lang="ts">
	import { usePortalsManager } from '$utilities/contexts.js';
	import { noop } from '$utilities/noop.js';
	import { onMount } from 'svelte';
	import type { PortalProps } from './types.js';
	import { Portal } from 'bits-ui';

	let { children, idPrefix = '', onPortalCreated = noop }: PortalProps = $props();

	//const themeName = useThemeName();
	const { container } = usePortalsManager();
	const uniqueId = $props.id();
	const portalId = $derived(idPrefix !== '' ? `${idPrefix}-${uniqueId}` : uniqueId);

	onMount(() => {
		onPortalCreated();
	});
</script>

{#if container}
	<Portal to={container} disabled={!container}>
		{@render children?.()}
	</Portal>
{:else}
	<Portal>
		{@render children?.()}
	</Portal>
{/if}
