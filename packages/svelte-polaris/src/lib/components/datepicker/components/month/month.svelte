<script lang="ts">
	import {
		dateIsInRange,
		dateIsSelected,
		getNewRange,
		getOrderedWeekdays,
		getWeeksForMonth,
		isDateAfter,
		isDateBefore,
		isDateDisabled,
		isSameDay
	} from '$utilities/dates.js';
	import { noop } from '$utilities/noop.js';
	import { monthName, weekdayName } from '../../utilities.js';
	import Day from '../day/day.svelte';
	import Weekday from '../weekday/weekday.svelte';
	import styles from '../../datepicker.module.css';
	import type { MonthProps } from './types.js';
	import type { Range } from '$utilities/dates.js';
	import Text from '$lib/components/text/text.svelte';

	let {
		focusedDate,
		selected,
		hoverDate,
		disableDatesBefore,
		disableDatesAfter,
		disableSpecificDates,
		allowRange,
		onChange = noop,
		onHover = noop,
		onFocus = noop,
		month,
		year,
		weekStartsOn,
		accessibilityLabelPrefixes
	}: MonthProps = $props();

	const now = new Date();
	const current = $derived(now.getMonth() === month && now.getFullYear() === year);
	const weeks = $state(getWeeksForMonth(month, year, weekStartsOn));

	function weekdayLabel(weekday: number) {
		return weekdayName(weekday);
	}

	function isDateStart(day: Date | null, range: Range) {
		if (day == null) return false;
		const { start } = range;

		return Boolean(start && isSameDay(start, day));
	}

	function isDateEnd(day: Date | null, range: Range) {
		if (day == null) return false;
		const { end } = range;

		return Boolean(end && isSameDay(end, day));
	}

	function hoveringDateIsInRange(day: Date | null, range: Range, hoverEndDate: Date) {
		if (day == null) {
			return false;
		}
		const { start, end } = range;
		return Boolean(isSameDay(start, end) && day > start && day <= hoverEndDate);
	}

	const handleDateClick = (selectedDate: Date) => {
		onChange(getNewRange(allowRange ? selected : undefined, selectedDate));
	};

	const lastDayOfMonth = new Date(year, (month as number) + 1, 0);
	const isInHoveringRange = allowRange ? hoveringDateIsInRange : () => false;
</script>

{#snippet weekdays()}
	{#each getOrderedWeekdays(weekStartsOn) as weekday}
		<Weekday
			title={weekdayName(weekday) ?? ''}
			label={weekdayLabel(weekday) ?? ''}
			current={current && new Date().getDay() === weekday}
		/>
	{/each}
{/snippet}

{#snippet renderWeek(day: Date, dayIndex: number)}
	{#if day == null}
		<Day {onHover} {lastDayOfMonth} />
	{:else}
		{@const disabled =
			(disableDatesBefore && isDateBefore(day, disableDatesBefore)) ||
			(disableDatesAfter && isDateAfter(day, disableDatesAfter)) ||
			(disableSpecificDates && isDateDisabled(day, disableSpecificDates))}
		{@const isFirstSelectedDay = allowRange && selected && isDateStart(day, selected)}
		{@const isLastSelectedDay =
			allowRange &&
			selected &&
			((!isSameDay(selected.start, selected.end) && isDateEnd(day, selected)) ||
				(hoverDate &&
					isSameDay(selected.start, selected.end) &&
					isDateAfter(hoverDate, selected.start) &&
					isSameDay(day, hoverDate) &&
					!isFirstSelectedDay))}
		{@const rangeIsDifferent = !(selected && isSameDay(selected.start, selected.end))}
		{@const isHoveringRight = hoverDate && isDateBefore(day, hoverDate)}
		{@const [firstAccessibilityLabelPrefix, lastAccessibilityLabelPrefix] =
			accessibilityLabelPrefixes}
		{@const accessibilityLabelPrefix =
			(allowRange && isFirstSelectedDay) || (!allowRange && firstAccessibilityLabelPrefix)
				? firstAccessibilityLabelPrefix
				: allowRange && isLastSelectedDay
					? lastAccessibilityLabelPrefix
					: ''}

		<Day
			selectedAccessibilityLabelPrefix={accessibilityLabelPrefix}
			weekday={weekdayLabel(dayIndex)}
			focused={focusedDate != null && isSameDay(day, focusedDate)}
			{day}
			{onFocus}
			onClick={handleDateClick}
			{onHover}
			selected={selected != null && dateIsSelected(day, selected)}
			inRange={selected != null && dateIsInRange(day, selected)}
			{disabled}
			inHoveringRange={selected != null &&
				hoverDate != null &&
				isInHoveringRange(day, selected, hoverDate)}
			{isLastSelectedDay}
			{isFirstSelectedDay}
			{isHoveringRight}
			{rangeIsDifferent}
		/>
	{/if}
{/snippet}

{#snippet weeksMarkup()}
	{#each weeks as week}
		<tr class={styles.Week}>
			{#each week as day, index}
				{#if day}
					{@render renderWeek(day, index)}
				{/if}
			{/each}
		</tr>
	{/each}
{/snippet}

<div class={styles.MonthContainer}>
	<table role="grid" class={styles.Month}>
		<caption class={styles.Title}>
			<Text as="span" variant="bodyMd" alignment="center" fontWeight={current ? 'bold' : 'medium'}>
				{monthName(month)}{' '}{year}
			</Text>
		</caption>
		<thead>
			<tr class={styles.WeekHeadings}>
				{@render weekdays()}
			</tr>
		</thead>
		<tbody>{@render weeksMarkup()}</tbody>
	</table>
</div>
