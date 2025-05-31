<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import styles from './indicator.module.css';
	import type { IndicatorProps } from './types.js';

	let { pulse }: IndicatorProps = $props();

	const className = $derived(classNames(styles.Indicator, pulse && styles.pulseIndicator));
</script>

<span class={className}></span>
