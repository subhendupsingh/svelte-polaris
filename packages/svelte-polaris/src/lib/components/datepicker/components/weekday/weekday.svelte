<script lang="ts">
	import styles from '../../datepicker.module.css';
	import type { WeekdayProps } from './types.js';
	import Text from '$lib/components/text/text.svelte';
  let { label, title, current }: WeekdayProps = $props();
</script>

<th aria-label={label} scope="col" class={styles.Weekday}>
	<Text
		as="span"
		variant="bodySm"
		alignment="center"
		fontWeight={current ? 'bold' : 'regular'}
		tone={!current ? 'subdued' : undefined}
	>
		{title}
	</Text>
</th>
