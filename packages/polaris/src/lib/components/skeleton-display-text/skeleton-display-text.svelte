<script lang="ts">
	import {
		applyStyles,
		classNames,
		variationName
	} from '$utilities/css.js';
	import styles from './skeleton-display-text.module.css';
	import type { SkeletonDisplayTextProps } from './types.js';
	let { size = 'medium', maxWidth }: SkeletonDisplayTextProps = $props();

	const className = $derived(
		classNames(styles.DisplayText, size && styles[variationName('size', size)])
	);

	const style = {
		'--pc-skeleton-display-text-max-width': maxWidth ?? undefined
	};
</script>

<div class={className} style={applyStyles(style)}></div>
