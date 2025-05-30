<script lang="ts">
	import styles from './text-container.module.css';
	import type { TextContainerProps } from './types.ts';
	import { classNames, variationName } from '$utilities/css.js';
	let { spacing, children }: TextContainerProps = $props();

	const className = $derived(classNames(
    styles.TextContainer,
    spacing && styles[variationName('spacing', spacing)],
  ));
</script>

<div class={className}>{@render children?.()}</div>
