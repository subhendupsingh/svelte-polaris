<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import BlockStack from '../block-stack/block-stack.svelte';
	import ButtonGroup from '../button-group/button-group.svelte';
	import ButtonFrom from '../button/button-from.svelte';
	import Button from '../button/button.svelte';
	import LegacyCardSection from '../legacy-card/components/section/legacy-card-section.svelte';
	import LegacyCard from '../legacy-card/legacy-card.svelte';
	import styles from './callout-card.module.css';
	import type { CalloutCardProps } from './types.js';
	import XIcon from '@shopify/polaris-icons/dist/svg/XIcon.svg?component';
	import Text from '../text/text.svelte';
	import Image from '../image/image.svelte';

	let {
		children,
		title,
		illustration,
		primaryAction,
		secondaryAction,
		onDismiss
	}: CalloutCardProps = $props();

	const imageClassName = $derived(classNames(styles.Image, onDismiss && styles.DismissImage));
	const containerClassName = $derived(classNames(styles.Container, onDismiss && styles.hasDismiss));
</script>

{#snippet primaryActionMarkup()}
	{#if primaryAction}
		<ButtonFrom action={primaryAction} overrides={{ variant: 'primary' }} />
	{/if}
{/snippet}

{#snippet secondaryActionMarkup()}
	{#if secondaryAction}
		<ButtonFrom
			action={secondaryAction}
			overrides={{ variant: secondaryAction.variant ? 'secondary' : 'tertiary' }}
		/>
	{/if}
{/snippet}

{#snippet buttonMarkup()}
	{#if secondaryAction}
		<ButtonGroup>
			{@render primaryActionMarkup()}
			{@render secondaryActionMarkup()}
		</ButtonGroup>
	{:else}
		{@render primaryActionMarkup()}
	{/if}
{/snippet}

{#snippet dismissButton()}
	{#if onDismiss}
		<div class={styles.Dismiss}>
			<Button variant="tertiary" icon={XIcon} onClick={onDismiss} accessibilityLabel="Dismiss" />
		</div>
	{/if}
{/snippet}

<LegacyCard>
	<div class={containerClassName}>
		{@render dismissButton()}
		<LegacyCardSection>
			<div class={styles.CalloutCard}>
				<div class={styles.Content}>
					<div class={styles.Title}>
						<Text variant="headingSm" as="h2">
							{title}
						</Text>
					</div>
					<Text as="span" variant="bodyMd">
						<BlockStack>
							{@render children?.()}
						</BlockStack>
					</Text>
					<div class={styles.Buttons}>{@render buttonMarkup()}</div>
				</div>

				<Image alt="" class={imageClassName} source={illustration} />
			</div>
		</LegacyCardSection>
	</div>
</LegacyCard>
