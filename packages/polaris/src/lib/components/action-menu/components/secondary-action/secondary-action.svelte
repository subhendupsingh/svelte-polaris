<script lang="ts">
	import Button from '$lib/components/button/button.svelte';
	import Tooltip from '$lib/components/tooltip/tooltip.svelte';
	import { classNames } from '$utilities/css.js';
	import styles from './secondary-action.module.css';
	import type { SecondaryAction } from './types.js';
	let { children, tone, helpText, onAction, destructive, ...rest }: SecondaryAction = $props();
</script>

{#snippet buttonMarkup()}
	<Button onClick={onAction} tone={destructive ? 'critical' : undefined} {...rest}>
		{@render children?.()}
	</Button>
{/snippet}

{#snippet actionMarkup()}
	{#if helpText}
		<Tooltip preferredPosition="bottom" content={helpText}>
			{#snippet trigger()}
				{@render buttonMarkup()}
			{/snippet}
		</Tooltip>
	{:else}
		{@render buttonMarkup()}
	{/if}
{/snippet}

<div class={classNames(styles.SecondaryAction, tone === 'critical' && styles.critical)}>
	{@render actionMarkup()}
</div>
