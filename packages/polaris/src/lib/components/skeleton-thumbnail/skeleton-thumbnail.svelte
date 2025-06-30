<script lang="ts">
	import styles from './skeleton-thumbnail.module.css';
	import type { SkeletonThumbnailProps } from './types.js';
	import { classNames } from '$utilities/css.js';
	import { variationName } from '$utilities/css.js';
	let { size = 'medium' }: SkeletonThumbnailProps = $props();

	const className = $derived(
		classNames(styles.SkeletonThumbnail, size && styles[variationName('size', size)])
	);
</script>

<div class={className}></div>
