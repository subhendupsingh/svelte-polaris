<script lang="ts">
	import type { ComplexAction } from '$utilities/types.js';
	import Button from './button.svelte';
	import type { ButtonProps } from './button.types.js';
	
	interface Props {
		action: ComplexAction;
		overrides?: Partial<ButtonProps>;
	}

	let { action, overrides, ...rest }: Props = $props();
	const plainVariant = $derived(overrides?.variant);
	const tone = $derived(!overrides?.tone && action.destructive ? 'critical' : overrides?.tone);
	const { onAction } = action;
</script>

<Button
	{...rest}
	{...action}
	{...overrides}
	onClick={onAction}
	variant={plainVariant}
	{tone}
	accessibilityLabel={action.accessibilityLabel}
	url={action.url}
	external={action.external}
	target={action.target}>
	{action.content}
</Button>
