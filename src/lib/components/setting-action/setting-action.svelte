<script lang="ts">
	import styles from './setting-action.module.css';
	import type { SettingActionProps } from './types.js';

	let { action, children }: SettingActionProps = $props();
</script>

<div class={styles.SettingAction}>
	<div class={styles.Setting}>{@render children?.()}</div>
	<div class={styles.Action}>{@render action?.()}</div>
</div>
