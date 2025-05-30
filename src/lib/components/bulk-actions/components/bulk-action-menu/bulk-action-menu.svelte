<script lang="ts">
	import ActionList from '$lib/components/action-list/action-list.svelte';
	import Popover from '$lib/components/popover/index.js';
	import { UseToggle } from '$lib/use/use-toggle.svelte.js';
	import BulkActionButton from '../bulk-action-button/bulk-action-button.svelte';
	import type { BulkActionsMenuProps } from './types.js';

	let { title, actions, isNewBadgeInBadgeActions, size }: BulkActionsMenuProps = $props();

	const isVisible = new UseToggle(false);
	const toggleMenuVisibility = isVisible.toggle;
</script>

<Popover active={isVisible.value} onClose={toggleMenuVisibility} preferInputActivator>
	{#snippet trigger()}
		<BulkActionButton
			disclosure
			showContentInButton
			onAction={toggleMenuVisibility}
			content={title}
			indicator={isNewBadgeInBadgeActions}
			size={size}
		/>
	{/snippet}
	<ActionList items={actions} onActionAnyItem={toggleMenuVisibility} />
</Popover>
