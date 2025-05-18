<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import styles from '../../form-layout.module.css';
	import type { ItemProps } from '../../types.js';
	let { children, condensed }: ItemProps = $props();

	const className = $derived(classNames(styles.Item, condensed ? styles.condensed : styles.grouped));
</script>

<div class={className}>
    {@render children?.()}
</div>
