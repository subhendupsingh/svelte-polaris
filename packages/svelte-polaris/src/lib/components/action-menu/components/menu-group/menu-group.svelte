<script lang="ts">
	import ActionList from '$lib/components/action-list/action-list.svelte';
	import Popover from '$lib/components/popover/index.js';
	import SecondaryAction from '../secondary-action/secondary-action.svelte';
	import styles from './menu-group.module.css';
	import type { MenuGroupProps } from './types.js';
	let {
		accessibilityLabel,
		active,
		actions,
		details,
		title,
		icon,
		disabled,
		onClick,
		onClose,
		onOpen,
		sections
	}: MenuGroupProps = $props();

	const handleClose = () => {
		onClose?.(title);
	};

	const handleOpen = () => {
		onOpen?.(title);
	};

	const handleClick = () => {
		if (onClick) {
			onClick(handleOpen);
		} else {
			handleOpen();
		}
	};
</script>

{#snippet popoverActivator()}
	<SecondaryAction disclosure {disabled} {icon} {accessibilityLabel} onClick={handleClick}>
		{title}
	</SecondaryAction>
{/snippet}

<Popover
	active={Boolean(active)}
	preferredAlignment="left"
	onClose={handleClose}
	hideOnPrint>
	{#snippet trigger()}
		{@render popoverActivator()}
	{/snippet}

	<ActionList items={actions} {sections} onActionAnyItem={handleClose} />
	
    {#if details}
        <div class={styles.Details}>{details}</div>
    {/if}
</Popover>
