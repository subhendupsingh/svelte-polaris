<script lang="ts">
	import { PORTALS_MANAGER_KEY, useContext, type PortalsManager } from '$utilities/contexts.js';
	import { noop } from '$utilities/noop.js';
	import { onMount } from 'svelte';
	import type { PortalProps } from './types.js';
	import { Portal } from 'bits-ui';

	let { children, idPrefix = '', onPortalCreated = noop }: PortalProps = $props();

	//const themeName = useThemeName();
	let context = useContext<PortalsManager | undefined>(PORTALS_MANAGER_KEY);
	const container = $derived(context()?.container);
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
