<script lang="ts">
	import styles from './thumbnail.module.css';
	import type { ThumbnailProps } from './types.js';
	import { classNames } from '$utilities/css.js';
	import { variationName } from '$utilities/css.js';
	import Image from '$lib/components/image/image.svelte';
	import Icon from '../icon/icon.svelte';
	let { source, alt, size = 'medium', transparent }: ThumbnailProps = $props();

	const className = $derived(
		classNames(
			styles.Thumbnail,
			size && styles[variationName('size', size)],
			transparent && styles.transparent
		)
	);
</script>

<span class={className}>
	{#if typeof source === 'string'}
		<Image {alt} {source} />
	{:else}
		<Icon accessibilityLabel={alt} {source} />
	{/if}
</span>
