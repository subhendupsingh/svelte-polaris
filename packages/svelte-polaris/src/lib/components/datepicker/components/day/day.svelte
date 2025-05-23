<script lang="ts">
	import { classNames } from '$utilities/css.js';
	import { noop } from '$utilities/noop.js';
	import styles from '../../datepicker.module.css';
	import type { DayProps } from './types.js';
  import Text from '$lib/components/text/text.svelte';
	import { isSameDay } from '$utilities/dates.js';
	import { monthName } from '../../utilities.js';

	let {
		day,
		focused,
		onClick,
		onHover = noop,
		onFocus = noop,
		selected,
		inRange,
		inHoveringRange,
		disabled,
		lastDayOfMonth,
		isLastSelectedDay,
		isFirstSelectedDay,
		isHoveringRight,
		rangeIsDifferent,
		weekday,
		selectedAccessibilityLabelPrefix
	}: DayProps = $props();

	let dayNode = $state<HTMLButtonElement | null>(null);
	let hoverValue = $derived(lastDayOfMonth || day);

	$effect(() => {
		if (focused && dayNode) {
			dayNode.focus();
		}
	});

	let handleClick = $derived(day ? (onClick && !disabled ? onClick.bind(null, day) : noop) : noop);
	let today = $derived(day ? isSameDay(new Date(), day) : false);

	const dayCellClassName = $derived(
		classNames(
			styles.DayCell,
			selected && styles['DayCell-selected'],
			(inRange || inHoveringRange) && !disabled && styles['DayCell-inRange'],
			isLastSelectedDay && styles['DayCell-lastInRange'],
			isFirstSelectedDay && styles['DayCell-firstInRange'],
			isHoveringRight && styles['DayCell-hoverRight'],
			rangeIsDifferent && styles['DayCell-hasRange']
		)
	);

	const dayClassName = $derived(
		classNames(
			styles.Day,
			selected && styles['Day-selected'],
			disabled && styles['Day-disabled'],
			(inRange || inHoveringRange) && !disabled && styles['Day-inRange'],
			isLastSelectedDay && styles['Day-lastInRange'],
			isFirstSelectedDay && styles['Day-firstInRange'],
			isHoveringRight && styles['Day-hoverRight'],
			rangeIsDifferent && styles['Day-hasRange']
		)
	);

	const date = day?.getDate();
	const tabIndex = $derived((focused || selected || today || date === 1) && !disabled ? 0 : -1);

	const ariaLabel = $derived([
		selected && selectedAccessibilityLabelPrefix ? `${selectedAccessibilityLabelPrefix} ` : '',
		`${today ? 'Today' : ''}`,
		`${weekday ? weekday : ''} `,
		`${monthName(day?.getMonth() ?? 0)}`,
		`${date} `,
		`${day?.getFullYear()}`
	].join(''));
</script>

{#if !day}
	<td
		class={styles.EmptyDayCell}
		onmouseover={() => onHover(hoverValue)}
		onfocus={() => onFocus(hoverValue)}
	></td>
{:else}
<td class={dayCellClassName}>
  <button
    onfocus={() => onFocus(day)}
    type="button"
    bind:this={dayNode}
    tabIndex={tabIndex}
    class={dayClassName}
    onmouseover={() => onHover(hoverValue)}
    onclick={handleClick}
    aria-label={ariaLabel}
    aria-disabled={disabled}
    aria-pressed={selected}
  >
    <Text
      as="span"
      variant="bodySm"
      alignment="center"
      fontWeight={today ? 'bold' : 'regular'}>
      {date}
    </Text>
  </button>
</td>
{/if}
