<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import {
		avatarStrokeWidth,
		Status,
		STYLE_CLASSES,
		styleClass,
		xorHash,
		type AvatarProps
	} from './types.js';
	import styles from './avatar.module.css';
	import { variationName } from '$utilities/css.js';
	import { browser } from '$app/environment';
	import Image from '../image/image.svelte';

	let {
		name,
		source,
		onError,
		initials,
		customer,
		size = 'md',
		accessibilityLabel
	}: AvatarProps = $props();

	let status = $state();

	$effect(() => {
		if (source) {
			status = Status.Pending;
		}

		if (accessibilityLabel) {
			label = accessibilityLabel;
		} else if (name) {
			label = name;
		} else if (initials) {
			const splitInitials = initials.split('').join(' ');
			label = `Avatar with initials ${splitInitials}`;
		}
	});

	const handleError = () => {
		status = Status.Errored;
		if (onError) {
			onError();
		}
	};

	const handleLoad = () => {
		status = Status.Loaded;
	};

	const hasImage = $derived(source && status !== Status.Errored);
	const nameString = name || initials;
	let label: string | undefined = $state();

	const className = $derived(
		classNames(
			styles.Avatar,
			size && styles[variationName('size', size)],
			hasImage && status === Status.Loaded && styles.imageHasLoaded,
			!customer && !hasImage && styles[variationName('style', styleClass(nameString))]
		)
	);

	const textClassName = $derived(
		classNames(styles.Text, (initials?.length || 0) > 2 && styles.long)
	);

	const imageClassName = $derived(
		classNames(styles.Image, status !== Status.Loaded && styles.hidden)
	);

	// Use `dominant-baseline: central` instead of `dy` when Edge supports it.
	const verticalOffset = '0.35em';
</script>

{#snippet imageMarkUp()}
	{#if source && browser && status !== Status.Errored}
		<Image
			className={imageClassName}
			{source}
			alt=""
			role="presentation"
			onLoad={handleLoad}
			onError={handleError}
		/>
	{/if}
{/snippet}

{#snippet avatarPath()}
	<path
		fill="none"
		d="M25.5 13.5C25.5 16.5376 23.0376 19 20 19C16.9624 19 14.5 16.5376 14.5 13.5C14.5 10.4624 16.9624 8 20 8C23.0376 8 25.5 10.4624 25.5 13.5Z"
		stroke="currentColor"
		stroke-width={avatarStrokeWidth[size]}
	/>
	<path
		fill="none"
		d="M10.3433 29.682L9.47 31.254C9.03481 32.0373 9.60125 33 10.4974 33H29.5026C30.3988 33 30.9652 32.0373 30.53 31.254L29.6567 29.682C27.7084 26.175 24.0119 24 20 24C15.9882 24 12.2916 26.175 10.3433 29.682Z"
		stroke="currentColor"
		stroke-width={avatarStrokeWidth[size]}
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
{/snippet}

{#snippet avatarBody()}
	{#if customer || !initials}
		{@render avatarPath()}
	{:else}
		<text
			class={textClassName}
			x="50%"
			y="50%"
			dy={verticalOffset}
			fill="currentColor"
			text-anchor="middle"
		>
			{initials}
		</text>
	{/if}
{/snippet}

{#snippet svgMarkUp()}
	{#if !hasImage}
		<span class={styles.Initials}>
			<svg class={styles.Svg} viewBox="0 0 40 40">
				{@render avatarBody()}
			</svg>
		</span>
	{/if}
{/snippet}

<span aria-label={label} role={label ? 'img' : 'presentation'} class={className}>
	{@render svgMarkUp()}
	{@render imageMarkUp()}
</span>
