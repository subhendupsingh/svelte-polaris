<script lang="ts">
	import type { ComplexAction } from '$utilities/types.js';
	import type { Snippet } from 'svelte';
	import styles from '../../legacy-card.module.css';
	import { classNames } from '$utilities/css.js';
	import Text from '$lib/components/text/text.svelte';
	import InlineStack from '$lib/components/inline-stack/inline-stack.svelte';
	import ButtonFrom from '$lib/components/button/button-from.svelte';
	import ButtonGroup from '$lib/components/button-group/index.js';

	interface LegacyCardSectionProps {
		title?: string;
		children?: Snippet;
		subdued?: boolean;
		flush?: boolean;
		fullWidth?: boolean;
		/** Allow the card to be hidden when printing */
		hideOnPrint?: boolean;
		actions?: ComplexAction[];
	}

	let { children, title, subdued, flush, fullWidth, actions, hideOnPrint }: LegacyCardSectionProps =
		$props();

	const className = $derived(
		classNames(
			styles.Section,
			flush && styles['Section-flush'],
			subdued && styles['Section-subdued'],
			fullWidth && styles['Section-fullWidth'],
			hideOnPrint && styles['Section-hideOnPrint']
		)
	);
</script>

<div class={className}>
	{#if title || actions}
		<div class={styles.SectionHeader}>
            <InlineStack blockAlign="baseline">
                {#if title}
                    <Text as="h3" variant="headingSm" fontWeight="medium">{title}</Text>
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
            </InlineStack>
		</div>
	{/if}
	{@render children?.()}
</div>
