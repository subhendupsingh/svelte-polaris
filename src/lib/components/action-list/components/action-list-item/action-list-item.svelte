<script lang="ts">
	import type { ItemProps } from '../../types.ts';
	import styles from '../../action-list.module.css';
	import { classNames } from '$utilities/css.js';
	import Box from '$lib/components/box/box.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import Icon from '$lib/components/icon/icon.svelte';
	import Text from '$lib/components/text/text.svelte';
	import Badge from '$lib/components/badge/badge.svelte';
	import UnstyledLink from '$lib/components/button/unstyled-link.svelte';

	let {
		id,
		badge,
		content,
		accessibilityLabel,
		helpText,
		url,
		onAction,
		onMouseEnter,
		icon,
		image,
		prefix,
		suffix,
		disabled,
		external,
		destructive,
		ellipsis,
		truncate,
		active,
		role,
		variant = 'default'
	}: ItemProps = $props();

	const className = $derived(
		classNames(
			styles.Item,
			disabled && styles.disabled,
			destructive && styles.destructive,
			active && styles.active,
			variant === 'default' && styles.default,
			variant === 'indented' && styles.indented,
			variant === 'menu' && styles.menu
		)
	);
</script>

{#snippet contentWrapper()}
	<UnstyledLink url={disabled ? undefined : url} {external}>
		<Box width="100%">
			<InlineStack blockAlign="center" gap="150" wrap={false}>
				{#if prefix}
					<span class={styles.Prefix}>{prefix}</span>
				{:else if icon}
					<span class={styles.Prefix}>
						<Icon source={icon} />
					</span>
				{:else if image}
					<span role="presentation" class={styles.Prefix} style="background-image: url({image})"
					></span>
				{/if}
				{#if content}
					{#if truncate}
						<Text as="span" truncate>
							{content}
						</Text>
					{:else if ellipsis}
						<Text as="span" truncate>
							{content}…
						</Text>
					{:else}
						{content}
					{/if}
				{/if}
				{#if badge}
					<span class={styles.Suffix}>
						<Badge children={badge.content} tone={badge.tone} />
					</span>
				{/if}
				{#if suffix}
					<Box>
						<span class={styles.Suffix}>{suffix}</span>
					</Box>
				{/if}
			</InlineStack>
		</Box>
	</UnstyledLink>
{/snippet}

{#if url}
	{@render contentWrapper()}
{:else}
	<button
		{id}
		type="button"
		class={className}
		{disabled}
		aria-label={accessibilityLabel}
		onclick={onAction}
		{role}
		onmouseenter={onMouseEnter}
	>
		{@render contentWrapper()}
	</button>
{/if}
