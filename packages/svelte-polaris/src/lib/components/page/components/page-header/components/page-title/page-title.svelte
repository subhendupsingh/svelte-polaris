<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import type { TitleProps } from './types.js';
	import styles from './page-title.module.css';
	import Text from '$lib/components/text/text.svelte';
	import Bleed from '$lib/components/bleed/bleed.svelte';

	let { title, subtitle, titleMetadata, compactTitle, hasSubtitleMaxWidth }: TitleProps = $props();
	const className = $derived(() => classNames(styles.Title, subtitle && styles.TitleWithSubtitle));
</script>

{#snippet titleMarkup()}
	{#if title}
		<h1 class={className}>
			<Text as="span" variant="headingLg" fontWeight="bold">
				{title}
			</Text>
		</h1>
	{/if}
{/snippet}

{#snippet titleMetadataMarkup()}
	{#if titleMetadata}
		{#if typeof titleMetadata === 'string'}
			<Bleed marginBlock="100">{titleMetadata}</Bleed>
		{:else}
			<Bleed marginBlock="100">
				{@render titleMetadata()}
			</Bleed>
		{/if}
	{/if}
{/snippet}

{#snippet wrappedTitleMarkup()}
	<div class={styles.TitleWrapper}>
		{@render titleMarkup()}
		{@render titleMetadataMarkup()}
	</div>
{/snippet}

{#snippet subtitleMarkup()}
	{#if subtitle}
		<div
			class={classNames(
				styles.SubTitle,
				compactTitle && styles.SubtitleCompact,
				hasSubtitleMaxWidth && styles.SubtitleMaxWidth
			)}
		>
			<Text as="p" variant="bodySm" tone="subdued">
				{subtitle}
			</Text>
		</div>
	{/if}
{/snippet}

{@render wrappedTitleMarkup()}
{@render subtitleMarkup()}
