<script lang="ts">
	import ActionList from '$lib/components/action-list/action-list.svelte';
	import Popover from '$lib/components/popover/popover.svelte';
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

{#snippet popoverActivator(triggerProps: any)}
	<SecondaryAction disclosure {disabled} {icon} {accessibilityLabel} onClick={handleClick} {...triggerProps}>
		{title}
	</SecondaryAction>
{/snippet}

<Popover
	active={Boolean(active)}
	preferredAlignment="start"
	onClose={handleClose}
	hideOnPrint>
	{#snippet activator({props})}
		{@render popoverActivator(props)}
	{/snippet}

	<ActionList items={actions} {sections} onActionAnyItem={handleClose} />
	
    {#if details}
        <div class={styles.Details}>{details}</div>
    {/if}
</Popover>
