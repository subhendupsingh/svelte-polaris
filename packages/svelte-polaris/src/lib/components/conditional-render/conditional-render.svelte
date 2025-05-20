<script lang="ts">
	interface ConditionalRenderProps {
		condition: boolean;
		children: any;
	}
	let { condition, children }: ConditionalRenderProps = $props();
</script>

{#if condition}
	{@render children()}
{/if}
