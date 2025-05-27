<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import styles from '../../tabs.module.css';
	import type { PanelProps } from './types.js';
	let { hidden, id, tabID, children }: PanelProps = $props();
	const className = classNames(styles.Panel, hidden && styles['Panel-hidden']);
</script>

<div class={className}></div>

<div class={className} {id} role="tabpanel" aria-labelledby={tabID} tabIndex={-1}>
	{@render children?.()}
</div>
