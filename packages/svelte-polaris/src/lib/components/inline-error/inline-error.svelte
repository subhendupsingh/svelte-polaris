<script lang="ts">
	import Icon from '../icon/icon.svelte';
	import styles from './inline-error.module.css';
	import AlertCircleIcon from '@shopify/polaris-icons/dist/svg/AlertCircleIcon.svg?component';
	import Text from '../text/text.svelte';
	import type { InlineErrorProps } from './types.js';
	let { message, fieldID }: InlineErrorProps = $props();
	function errorTextID(id: string) {
		return `${id}Error`;
	}
</script>

{#if message}
	<div id={errorTextID(fieldID)} class={styles.InlineError}>
		<div class={styles.Icon}>
			<Icon source={AlertCircleIcon} />
		</div>
		<Text as="span" variant="bodyMd">
			{message}
		</Text>
	</div>
{/if}
