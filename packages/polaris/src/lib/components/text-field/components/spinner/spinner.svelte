<script lang="ts">
	import Icon from '$lib/components/icon/icon.svelte';
	import ChevronUpIcon from '@shopify/polaris-icons/dist/svg/ChevronUpIcon.svg?component';
	import ChevronDownIcon from '@shopify/polaris-icons/dist/svg/ChevronDownIcon.svg?component';
	import styles from '../../text-field.module.css';
	import type { HandleStepFn, SpinnerProps } from '../../types.js';
	let { onChange, onClick, onMouseDown, onMouseUp, onBlur, ref }: SpinnerProps = $props();

	function handleStep(step: number) {
		return () => onChange(step);
	}

	function handleMouseDown(onChange: HandleStepFn) {
		return (event: MouseEvent) => {
			if (event.button !== 0) return;
			onMouseDown?.(onChange);
		};
	}
</script>

<div class={styles.Spinner} onclick={onClick} bind:this={ref}>
	<div
		role="button"
		class={styles.Segment}
		tabindex={-1}
		onclick={handleStep(1)}
		onmousedown={handleMouseDown(handleStep(1))}
		onmouseup={onMouseUp}
		onblur={onBlur}
	>
		<div class={styles.SpinnerIcon}>
			<Icon source={ChevronUpIcon} />
		</div>
	</div>
	<div
		role="button"
		class={styles.Segment}
		tabindex={-1}
		onclick={handleStep(-1)}
		onmousedown={handleMouseDown(handleStep(-1))}
		onmouseup={onMouseUp}
		onblur={onBlur}
	>
		<div class={styles.SpinnerIcon}>
			<Icon source={ChevronDownIcon} />
		</div>
	</div>
</div>
