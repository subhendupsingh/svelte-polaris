<script lang="ts">
	import styles from '../../layout.module.css';
	import type { AnnotatedSectionProps } from '../../types.js';
	import Text from '../../../text/text.svelte';
	import Box from '../../../box/box.svelte';
	import TextContainer from '$lib/components/text-container/text-container.svelte';
	let { children, title, description, id }: AnnotatedSectionProps = $props();
</script>

{#snippet descriptionMarkup()}
	{#if typeof description === 'string'}
		<Text as="p" variant="bodyMd">
			{description}
		</Text>
	{:else}
		{@render description?.()}
	{/if}
{/snippet}

<div class={styles.AnnotatedSection}>
	<div class={styles.AnnotationWrapper}>
		<div class={styles.Annotation}>
			<TextContainer spacing="tight">
				<Text {id} variant="headingMd" as="h2">
					{title}
				</Text>
				<Box color="text-secondary">{@render descriptionMarkup()}</Box>
			</TextContainer>
		</div>

		<div class={styles.AnnotationContent}>{@render children?.()}</div>
	</div>
</div>
