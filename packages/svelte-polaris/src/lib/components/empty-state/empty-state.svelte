<script lang="ts">
	import type { EmptyStateProps } from './types.js';
	import styles from './empty-state.module.css';
	import { classNames } from '$utilities/css.js';
	import Image from '../image/image.svelte';
	import ButtonFrom from '../button/button-from.svelte';
	import Box from '../box/box.svelte';
	import Text from '../text/text.svelte';
	import InlineStack from '../inline-stack/inline-stack.svelte';
	import BlockStack from '../block-stack/block-stack.svelte';

	let {
		children,
		heading,
		image,
		largeImage,
		imageContained,
		fullWidth = false,
		action,
		secondaryAction,
		footerContent
	}: EmptyStateProps = $props();

	let imageLoaded = $state(false);
	let imageRef: HTMLImageElement | undefined = $state();
	$effect(() => {
		if (imageRef?.complete) {
			imageLoaded = true;
		}
	});

	const imageClassNames = $derived(
		classNames(styles.Image, imageLoaded && styles.loaded, imageContained && styles.imageContained)
	);

	const skeletonImageClassNames = $derived(
		classNames(styles.SkeletonImage, imageLoaded && styles.loaded)
	);

	const imageContainerClassNames = $derived(
		classNames(styles.ImageContainer, !imageLoaded && styles.SkeletonImageContainer)
	);
</script>

{#snippet loadedImageMarkup()}
	{#if largeImage}
		<Image
			alt=""
			role="presentation"
			ref={imageRef}
			source={largeImage}
			className={imageClassNames}
			sourceSet={[
				{ source: image, descriptor: '568w' },
				{ source: largeImage, descriptor: '1136w' }
			]}
			sizes="(max-width: 568px) 60vw"
			onLoad={() => (imageLoaded = true)}
		/>
	{:else}
		<Image
			alt=""
			role="presentation"
			ref={imageRef}
			className={imageClassNames}
			source={image}
			onLoad={() => (imageLoaded = true)}
		/>
	{/if}
{/snippet}

{#snippet imageMarkup()}
	<div class={imageContainerClassNames}>
		{@render loadedImageMarkup()}
		<div class={skeletonImageClassNames}></div>
	</div>
{/snippet}

{#snippet secondaryActionMarkup()}
	{#if secondaryAction}
		<ButtonFrom overrides={{ variant: 'secondary' }} action={secondaryAction} />
	{/if}
{/snippet}

{#snippet footerContentMarkup()}
	<Box paddingBlockStart="400">
		<Text as="span" alignment="center" variant="bodySm">
			{@render footerContent?.()}
		</Text>
	</Box>
{/snippet}

{#snippet primaryActionMarkup()}
	{#if action}
		<ButtonFrom overrides={{ variant: 'primary' }} {action} />
	{/if}
{/snippet}

{#snippet headingMarkup()}
	<Box paddingBlockEnd="150">
		<Text variant="headingMd" as="p" alignment="center">
			{heading}
		</Text>
	</Box>
{/snippet}

{#snippet childrenMarkup()}
	<Text as="span" alignment="center" variant="bodySm">
		{@render children?.()}
	</Text>
{/snippet}

{#snippet textContentMarkup()}
	<Box paddingBlockEnd="400">
		{@render headingMarkup()}
		{@render childrenMarkup()}
	</Box>
{/snippet}

{#snippet actionsMarkup()}
	<InlineStack align="center" gap="200">
		{@render secondaryActionMarkup()}
		{@render primaryActionMarkup()}
	</InlineStack>
{/snippet}

{#snippet detailsMarkup()}
	<Box maxWidth={fullWidth ? '100%' : '400px'}>
		<BlockStack inlineAlign="center">
			{@render textContentMarkup()}
			{@render actionsMarkup()}
			{@render footerContentMarkup()}
		</BlockStack>
	</Box>
{/snippet}

<Box paddingInlineStart="0" paddingInlineEnd="0" paddingBlockStart="500" paddingBlockEnd="1600">
	<BlockStack inlineAlign="center">
		{@render imageMarkup()}
		{@render detailsMarkup()}
	</BlockStack>
</Box>
