<script lang="ts">
	import styles from '../../legacy-card.module.css';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import Text from '$lib/components/text/text.svelte';
	import ButtonGroup from '$lib/components/button-group/index.js';
	import ButtonFrom from '$lib/components/button/button-from.svelte';
	import type { LegacyCardHeaderProps } from './types.ts';

	let { title, actions, children }: LegacyCardHeaderProps = $props();
</script>

<div class={styles.Header}>
	{#if actions || children}
		<InlineStack wrap={false} gap="200" align="space-between" blockAlign="center">
			{#if title}
				<Text as="h2" variant="headingSm">{title}</Text>
			{/if}
			{#if actions}
				<InlineStack wrap={false} gap="400" blockAlign="center">
					<ButtonGroup>
						{#each actions as action}
							<ButtonGroup.Item>
								<ButtonFrom overrides={{ variant: 'plain' }} {action} />
							</ButtonGroup.Item>
						{/each}
					</ButtonGroup>
				</InlineStack>
			{/if}
			{#if children}
				{@render children?.()}
			{/if}
		</InlineStack>
	{:else if title}
		<Text as="h2" variant="headingSm">{title}</Text>
	{/if}
</div>
