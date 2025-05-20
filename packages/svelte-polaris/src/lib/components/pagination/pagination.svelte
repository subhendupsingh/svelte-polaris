<script lang="ts">
	import { isInputFocused } from '$utilities/is-input-focused.js';
	import ChevronLeftIcon from '@shopify/polaris-icons/dist/svg/ChevronLeftIcon.svg?component';
	import Button from '../button/button.svelte';
	import styles from './pagination.module.css';
	import type { PaginationProps } from './types.js';
	import Tooltip from '../tooltip/tooltip.svelte';
	import ChevronRightIcon from '@shopify/polaris-icons/dist/svg/ChevronRightIcon.svg?component';
	import { noop } from '$utilities/noop.js';
	import KeypressListener from '../keypress-listener/keypress-listener.svelte';
	import Box from '../box/box.svelte';
	import Text from '../text/text.svelte';
	import { classNames } from '$utilities/css.js';
	import InlineStack from '../inline-stack/inline-stack.svelte';
	import ButtonGroup from '../button-group/button-group.svelte';
	let {
		hasNext,
		hasPrevious,
		nextURL,
		previousURL,
		onNext,
		onPrevious,
		nextTooltip,
		previousTooltip,
		nextKeys,
		previousKeys,
		accessibilityLabel,
		accessibilityLabels,
		label,
		type = 'page'
	}: PaginationProps = $props();

	let node: HTMLElement | undefined = $state();
	const navLabel = accessibilityLabel || 'Pagination';
	const previousLabel = accessibilityLabels?.previous || 'Previous';
	const nextLabel = accessibilityLabels?.next || 'Next';

	function clickPaginationLink(id: string, node: HTMLElement) {
		return () => {
			if (node == null) {
				return;
			}

			const link: HTMLAnchorElement | null = node.querySelector(`#${id}`);
			if (link) {
				link.click();
			}
		};
	}

	function handleCallback(fn: () => void) {
		return () => {
			if (isInputFocused()) {
				return;
			}

			fn();
		};
	}

	const previousHandler = $derived(onPrevious || noop);
	const nextHandler = $derived(onNext || noop);
</script>

{#snippet prev()}
	<Button
		icon={ChevronLeftIcon}
		accessibilityLabel={previousLabel}
		url={previousURL}
		onClick={() => console.log('Previous')}
		disabled={!hasPrevious}
		id="previousURL"
	/>
{/snippet}
{#snippet constructedPrevious()}
	{#if previousTooltip && hasPrevious}
		<Tooltip trigger={prev} activatorWrapper="span" preferredPosition="bottom">
			{previousTooltip}
		</Tooltip>
	{:else}
		{@render prev()}
	{/if}
{/snippet}

{#snippet next()}
	<Button
		icon={ChevronRightIcon}
		accessibilityLabel={nextLabel}
		url={nextURL}
		onClick={onNext}
		disabled={!hasNext}
		id="nextURL"
	/>
{/snippet}

{#snippet constructedNext()}
	{#if nextTooltip && hasNext}
		<Tooltip trigger={next} activatorWrapper="span" preferredPosition="bottom">
			{@render next()}
		</Tooltip>
	{:else}
		{@render next()}
	{/if}
{/snippet}

{#snippet previousButtonEvents()}
	{#if previousKeys && (previousURL || onPrevious) && hasPrevious && node}
		{#each previousKeys as key}
			<KeypressListener
				handler={previousURL
					? handleCallback(clickPaginationLink('previousURL', node))
					: handleCallback(previousHandler)}
				keyCode={key}
				useCapture
			/>
		{/each}
	{/if}
{/snippet}

{#snippet nextButtonEvents()}
	{#if nextKeys && (nextURL || onNext) && hasNext && node}
		{#each nextKeys as key}
			<KeypressListener
				handler={nextURL
					? handleCallback(clickPaginationLink('nextURL', node))
					: handleCallback(nextHandler)}
				keyCode={key}
				useCapture
			/>
		{/each}
	{/if}
{/snippet}

{#snippet labelMarkup()}
	{#if label}
		<Box padding="300" paddingBlockStart="0" paddingBlockEnd="0">
			<Text as="span" variant="bodySm" fontWeight="medium">
				{#if typeof label==='string'}
					{label}
				{:else}
					{@render label?.()}
				{/if}
			</Text>
		</Box>
	{/if}
{/snippet}

{#snippet labelTextMarkup()}
	{#if hasNext && hasPrevious}
		{#if typeof label==='string'}
			<span>{label}</span>
		{:else}
			{@render label?.()}
		{/if}
	{:else}
		<Text tone="subdued" as="span">
			{#if typeof label==='string'}
				{label}
			{:else}
				{@render label?.()}
			{/if}
		</Text>
	{/if}
{/snippet}

{#snippet labelMarkup1()}
	{#if label}
		<Box padding="300" paddingBlockStart="0" paddingBlockEnd="0">
			<div aria-live="polite">{@render labelTextMarkup()}</div>
		</Box>
	{/if}
{/snippet}

{#if type == 'table'}
	<nav aria-label={navLabel} bind:this={node} class={classNames(styles.Pagination, styles.table)}>
		{@render previousButtonEvents()}
		{@render nextButtonEvents()}

		<Box
			background="bg-surface-secondary"
			paddingBlockStart="150"
			paddingBlockEnd="150"
			paddingInlineStart="300"
			paddingInlineEnd="200"
		>
			<InlineStack align="center" blockAlign="center">
				<div class={styles.TablePaginationActions} data-buttongroup-variant="segmented">
					<div>{@render constructedPrevious()}</div>
					{@render labelMarkup()}
					<div>{@render constructedNext()}</div>
				</div>
			</InlineStack>
		</Box>
	</nav>
{:else}
	<nav aria-label={navLabel} bind:this={node} class={styles.Pagination}>
		{@render previousButtonEvents()}
		{@render nextButtonEvents()}
		<ButtonGroup variant="segmented">
			{@render constructedPrevious()}
			{@render labelMarkup1()}
			{@render constructedNext()}
		</ButtonGroup>
	</nav>
{/if}
