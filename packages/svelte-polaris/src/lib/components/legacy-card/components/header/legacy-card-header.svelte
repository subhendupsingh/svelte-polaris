<script lang="ts">
	import type { DisableableAction } from '$utilities/types.js';
	import type { Snippet } from 'svelte';
	import styles from '../../legacy-card.module.css';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import Text from '$lib/components/text/text.svelte';
	import ButtonGroup from '$lib/components/button-group/button-group.svelte';
	import ButtonFrom from '$lib/components/button/button-from.svelte';

	interface LegacyCardHeaderProps {
		title?: string;
		actions?: DisableableAction[];
		children?: Snippet;
	}

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
							<ButtonFrom overrides={{ variant: 'plain' }} {action} />
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
