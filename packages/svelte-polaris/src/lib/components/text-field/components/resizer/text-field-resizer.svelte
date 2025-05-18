<script lang="ts">
	import styles from '../../text-field.module.css';
	import type { ResizerProps } from '../../types.js';
	let {
		contents,
		currentHeight: currentHeightProp = null,
		minimumLines,
		onHeightChange
	}: ResizerProps = $props();

	let animationFrame = $state<number>();
	let currentHeight = $derived<number | null>(currentHeightProp);
	let minimumLinesNode: HTMLDivElement | undefined = $state();
	let contentNode: HTMLDivElement | undefined = $state();

	const handleHeightCheck = () => {
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}

		animationFrame = requestAnimationFrame(() => {
			if (!contentNode || !minimumLinesNode) {
				return;
			}

			const newHeight = Math.max(contentNode.offsetHeight, minimumLinesNode.offsetHeight);

			if (newHeight !== currentHeight) {
				onHeightChange(newHeight);
			}
		});
	};
	const ENTITIES_TO_REPLACE = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'\n': '<br>',
		'\r': ''
	};

	const REPLACE_REGEX = new RegExp(`[${Object.keys(ENTITIES_TO_REPLACE).join()}]`, 'g');

	function replaceEntity(matchedSubstring: string): string {
		const entityKey = matchedSubstring as keyof typeof ENTITIES_TO_REPLACE;
		return ENTITIES_TO_REPLACE[entityKey];
	}
</script>

{#snippet minimumLinesMarkup()}
	{#if minimumLines}
		<div bind:this={minimumLinesNode} class={styles.DummyInput}>
			{#each Array.from({ length: minimumLines }) as _}
				<br />
			{/each}
		</div>
	{/if}
{/snippet}

<div class={styles.Resizer} onresize={handleHeightCheck}>
	<div bind:this={contentNode} class={styles.DummyInput}>
		{#if contents}
			{contents.replace(REPLACE_REGEX, replaceEntity)}
		{:else}
			<br />
		{/if}
	</div>
	{@render minimumLinesMarkup()}
</div>
