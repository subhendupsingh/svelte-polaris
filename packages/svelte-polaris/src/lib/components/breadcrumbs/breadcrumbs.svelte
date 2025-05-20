<script lang="ts">
	import { handleMouseUpByBlurring } from '$utilities/focus.js';
	import ArrowLeftIcon from '@shopify/polaris-icons/dist/svg/ArrowLeftIcon.svg?component';
	import Button from '../button/button.svelte';
	import styles from './breadcrumbs.module.css';
	import type { BreadcrumbsProps } from './types.js';
	let { backAction }: BreadcrumbsProps = $props();
	const { content } = backAction;
</script>

<Button
	url={'url' in backAction ? backAction.url : undefined}
	onClick={'onAction' in backAction ? backAction.onAction : undefined}
	onPointerDown={handleMouseUpByBlurring}
	icon={ArrowLeftIcon}
	accessibilityLabel={backAction.accessibilityLabel ?? content}
/>
