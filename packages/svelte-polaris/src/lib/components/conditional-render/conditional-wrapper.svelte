<script lang="ts">
	interface ConditionalWrapperProps {
		children: any;
		condition: boolean;
		wrapper: (children: any) => any;
	}
	let { condition, children, wrapper }: ConditionalWrapperProps = $props();
</script>

{#if condition}
	{@render wrapper(children)}
{:else}
    {@render children()}
{/if}
