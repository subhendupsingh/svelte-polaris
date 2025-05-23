<script lang="ts">
	import MappedactionContextProvider from '$lib/components/app-provider/mappedaction-context-provider.svelte';
	import Badge from '$lib/components/badge/badge.svelte';
	import Icon from '$lib/components/icon/icon.svelte';
	import Listbox from '$lib/components/listbox/index.js';
	import Text from '$lib/components/text/text.svelte';
	import { applyStyles, classNames } from '$utilities/css.js';
	import type { ActionListItemDescriptor } from '$utilities/types.js';
	import styles from './mapped-action.module.css';

	interface MappedAction extends ActionListItemDescriptor {
		wrapOverflow?: boolean;
	}

	let {
		active,
		content,
		disabled,
		icon,
		image,
		prefix,
		suffix,
		ellipsis,
		role,
		url,
		external,
		onAction,
		destructive,
		badge,
		helpText,
		wrapOverflow = false
	}: MappedAction = $props();

	let context = $derived({
		role,
		url,
		external,
		onAction,
		destructive
	});

	const actionClassNames = $derived(
		classNames(
			styles.Action,
			disabled && styles.disabled,
			destructive && styles.destructive,
			active && styles.selected
		)
	);

	$inspect("context in mapped-action", context);
</script>

{#snippet prefixMarkup()}
	{#if prefix}
		<div class={styles.Prefix}>{prefix}</div>
	{:else if icon}
		<div class={styles.Prefix}>
			<Icon source={icon} />
		</div>
	{:else if image}
		<div
			role="presentation"
			class={styles.Prefix}
			style={applyStyles({ backgroundImage: `url(${image}` })}
		></div>
	{/if}
{/snippet}

{#snippet badgeMarkup()}
	{#if badge}
		<span class={styles.Suffix}>
			<Badge tone={badge.tone}>{badge.content}</Badge>
		</span>
	{/if}
{/snippet}

{#snippet suffixMarkup()}
	{#if suffix}
		<span class={styles.Suffix}>{suffix}</span>
	{/if}
{/snippet}

{#snippet contentText()}
	{#if ellipsis && content}
		{content}...
	{:else}
		{content}
	{/if}
{/snippet}

{#snippet contentMarkup()}
	<div class={styles.Text}>
		<Text as="p" variant="bodyMd" breakWord={wrapOverflow}>
			{@render contentText()}
		</Text>
		{#if helpText}
			<Text as="p" variant="bodyMd" tone="subdued">
				{helpText}
			</Text>
		{/if}
	</div>
{/snippet}

<MappedactionContextProvider value={context}>
	<div class={styles.ActionContainer}>
		<Listbox.Action selected={active} {disabled} value={content || ''}>
			<div class={actionClassNames}>
				<div class={styles.Content}>
					{@render prefixMarkup()}
					{@render contentMarkup()}
					{@render badgeMarkup()}
					{@render suffixMarkup()}
				</div>
			</div>
		</Listbox.Action>
	</div>
</MappedactionContextProvider>
