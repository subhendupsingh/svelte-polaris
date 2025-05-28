<script lang="ts">
	import { classNames, variationName } from '$utilities/css.js';
  import styles from './list.module.css';
	import type { ListProps } from './types.js';

  let {children, gap = 'loose', type = 'bullet'}: ListProps = $props();

  const className = $derived(
    classNames(
      styles.List,
      gap && styles[variationName('spacing', gap)],
      type && styles[variationName('type', type)],
    )
  );
</script>

<svelte:element this={type === 'bullet' ? 'ul' : 'ol'} class={className}>
	{@render children?.()}
</svelte:element>
	