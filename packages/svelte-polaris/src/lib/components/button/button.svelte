<script lang="ts">
	import { classNames, variationName } from '$utilities/css.js';
	import type {
		ActionButtonProps,
		ButtonProps,
		CommonButtonProps,
		LinkButtonProps
	} from './button.types.js';
	import styles from './button.module.css';
	import { useBreakpoints } from '$lib/use/use-breakpoints.svelte.js';
	import UnstyledButton from './unstyled-button.svelte';
	import Text from '../text/text.svelte';
	import Spinner from '../spinner/spinner.svelte';
	import ChevronUpIcon from '@shopify/polaris-icons/dist/svg/ChevronUpIcon.svg?component';
	import CaretDownIcon from '@shopify/polaris-icons/dist/svg/CaretDownIcon.svg?component';
	import SelectIcon from '@shopify/polaris-icons/dist/svg/SelectIcon.svg?component';
	import type { IconSource } from '$utilities/types.js';
	import Icon from '../icon/icon.svelte';

	let {
		size = 'medium',
		variant = 'secondary',
		textAlign = 'start',
		disabled = false,
		loading = false,
		fullWidth = false,
		disclosure = false,
		removeUnderline = false,
		tone,
		pressed = false,
		url,
		icon,
		id,
		accessibilityLabel,
		ariaDescribedBy,
		role,
		dataPrimaryLink,
		external,
		download,
		target,
		submit,
		ariaControls,
		ariaExpanded,
		ariaChecked,
		triggerProps,
		onClick,
		onFocus,
		onBlur,
		onKeyDown,
		onKeyPress,
		onKeyUp,
		onMouseEnter,
		onTouchStart,
		children
	}: ButtonProps & LinkButtonProps & ActionButtonProps = $props();
	const hasPlainText = $derived(['plain', 'monochromePlain'].includes(variant));
	const { mdUp } = useBreakpoints();

	const textFontWeight = $derived(() => {
		if (hasPlainText) {
			return 'regular';
		}

		if (variant === 'primary') {
			return mdUp ? 'medium' : 'semibold';
		}

		return 'medium';
	});

	const textVariant = $derived(() => {
		if (size === 'large' || (hasPlainText && size !== 'micro')) {
			return 'bodyMd';
		}

		return 'bodySm';
	});

	const isDisabled = $derived(disabled || loading);

	const className = $derived(
		classNames(
			styles.Button,
			styles.pressable,
			styles[variationName('variant', variant)],
			styles[variationName('size', size)],
			styles[variationName('textAlign', textAlign)],
			fullWidth && styles.fullWidth,
			disclosure && styles.disclosure,
			icon && styles.iconWithText,
			icon && styles.iconOnly,
			isDisabled && styles.disabled,
			loading && styles.loading,
			pressed && !disabled && !url && styles.pressed,
			removeUnderline && styles.removeUnderline,
			tone && styles[variationName('tone', tone)]
		)
	);

	const commonProps: CommonButtonProps = $derived({
		class: className,
		'data-primary-link': dataPrimaryLink,
		id,
		accessibilityLabel,
		ariaDescribedBy,
		role
	});

	const linkProps: LinkButtonProps = $derived({
		url,
		external,
		download,
		target
	});

	const actionProps: ActionButtonProps = $derived({
		submit,
		disabled: isDisabled,
		loading,
		ariaControls,
		ariaExpanded,
		ariaChecked,
		pressed
	});

	function getDisclosureIconSource(
		disclosure: NonNullable<ButtonProps['disclosure']>,
		upIcon: IconSource,
		downIcon: IconSource
	) {
		if (disclosure === 'select') {
			return SelectIcon;
		}

		return disclosure === 'up' ? upIcon : downIcon;
	}
</script>
<UnstyledButton {onClick} {onFocus} {onBlur} {onKeyDown} {onKeyPress} {onKeyUp} {onMouseEnter} {onTouchStart} {triggerProps} {...commonProps} {...linkProps} {...actionProps} disabled={isDisabled}>
	{#if loading}
		<span class={styles.Spinner}>
			<Spinner size="small" accessibilityLabel="Loading" />
		</span>
	{/if}
	{#if icon}
		<span class={loading ? styles.hidden : styles.Icon}>
			<Icon source={icon} />
		</span>
	{/if}
	<Text as="span" variant={textVariant()} fontWeight={textFontWeight()}>
		{@render children?.()}
	</Text>
	{#if disclosure}
		<span class={loading ? styles.hidden : styles.Icon}>
			<!--svelte-ignore svelte_component_deprecated -->
			<Icon source={getDisclosureIconSource(disclosure, ChevronUpIcon, CaretDownIcon)} />
		</span>
	{/if}
</UnstyledButton>
