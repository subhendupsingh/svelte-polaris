<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import { DEFAULT_SIZE, progressIconMap, type BadgeProps } from './types.js';
	import styles from './badge.module.css';
	import { variationName } from '$utilities/css.js';
	import Icon from '$lib/components/icon/icon.svelte';
	import Text from '$lib/components/text/text.svelte';

	let {
		children,
		tone,
		progress,
		icon,
		size = DEFAULT_SIZE,
		toneAndProgressLabelOverride
	}: BadgeProps = $props();

	const className = $derived(
		classNames(
			styles.Badge,
			tone && styles[variationName('tone', tone)],
			size && size !== DEFAULT_SIZE && styles[variationName('size', size)]
		)
	);
</script>

<span class={className}>
	{#if progress && !icon}
		<span class={styles.Icon}>
			<Icon accessibilityLabel={toneAndProgressLabelOverride} source={progressIconMap[progress]} />
		</span>
	{:else if toneAndProgressLabelOverride}
		<Text as="span" visuallyHidden>
			{toneAndProgressLabelOverride}
		</Text>
	{/if}

	{#if icon}
		<span class={styles.Icon}>
			<Icon source={icon} />
		</span>
	{/if}
	
	{#if children}
		{#if typeof children === 'string'}
			<Text as="span" variant="bodySm" fontWeight={tone === 'new' ? 'medium' : undefined}>
				{children}
			</Text>
		{:else}
			{@render children()}
		{/if}
	{/if}
</span>
