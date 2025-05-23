<script lang="ts">
	import { noop } from '$utilities/noop.js';
	import styles from './datepicker.module.css';
	import type { DatePickerProps } from './types.js';
	import {
		getNextDisplayMonth,
		getNextDisplayYear,
		getPreviousDisplayMonth,
		getPreviousDisplayYear,
		isDateAfter,
		isDateBefore,
		isDateDisabled,
		type Range
	} from '$utilities/dates.js';
	import { monthName } from './utilities.js';
	import Month from './components/month/month.svelte';
	import { classNames } from '$utilities/css.js';
	import Button from '../button/button.svelte';
	import ArrowLeftIcon from '@shopify/polaris-icons/dist/svg/ArrowLeftIcon.svg?component';
	import ArrowRightIcon from '@shopify/polaris-icons/dist/svg/ArrowRightIcon.svg?component';

	let {
		id,
		selected,
		month,
		year,
		allowRange,
		multiMonth,
		disableDatesBefore,
		disableDatesAfter,
		disableSpecificDates,
		weekStartsOn = 0,
		dayAccessibilityLabelPrefix,
		onMonthChange,
		onChange = noop
	}: DatePickerProps = $props();

	let hoverDate = $state<Date | undefined>(undefined);
	let focusDate = $state<Date | undefined>(undefined);

	$effect(() => {
		selected;
		focusDate = undefined;
	});

	const handleFocus = (date: Date) => {
		focusDate = date;
	};

	const setFocusDateAndHandleMonthChange = (date: Date) => {
		if (onMonthChange) {
			onMonthChange(date.getMonth(), date.getFullYear());
		}
		hoverDate = date;
		focusDate = date;
	};

	const handleDateSelection = (range: Range) => {
		const { end } = range;

		hoverDate = end;
		focusDate = new Date(end);
		onChange(range);
	};

	const handleMonthChangeClick = (month: number, year: number) => {
		if (!onMonthChange) {
			return;
		}
		focusDate = undefined;
		onMonthChange(month, year);
	};

	const handleHover = (date: Date) => {
		hoverDate = date;
	};

	function deriveRange(selected?: Date | Range) {
		return selected instanceof Date ? { start: selected, end: selected } : selected;
	}

	const handleKeyUp = (event: KeyboardEvent) => {
		const { key } = event;

		const range = deriveRange(selected);
		const focusedDate = focusDate || (range && range.start);

		if (focusedDate == null) {
			return;
		}

		if (key === 'ArrowUp') {
			const previousWeek = new Date(focusedDate);
			previousWeek.setDate(focusedDate.getDate() - 7);
			if (
				!(
					(disableDatesBefore && isDateBefore(previousWeek, disableDatesBefore)) ||
					(disableSpecificDates && isDateDisabled(previousWeek, disableSpecificDates))
				)
			) {
				setFocusDateAndHandleMonthChange(previousWeek);
			}
		}

		if (key === 'ArrowDown') {
			const nextWeek = new Date(focusedDate);
			nextWeek.setDate(focusedDate.getDate() + 7);
			if (
				!(
					(disableDatesAfter && isDateAfter(nextWeek, disableDatesAfter)) ||
					(disableSpecificDates && isDateDisabled(nextWeek, disableSpecificDates))
				)
			) {
				setFocusDateAndHandleMonthChange(nextWeek);
			}
		}

		if (key === 'ArrowRight') {
			const tomorrow = new Date(focusedDate);
			tomorrow.setDate(focusedDate.getDate() + 1);
			if (
				!(
					(disableDatesAfter && isDateAfter(tomorrow, disableDatesAfter)) ||
					(disableSpecificDates && isDateDisabled(tomorrow, disableSpecificDates))
				)
			) {
				setFocusDateAndHandleMonthChange(tomorrow);
			}
		}

		if (key === 'ArrowLeft') {
			const yesterday = new Date(focusedDate);
			yesterday.setDate(focusedDate.getDate() - 1);
			if (
				!(
					(disableDatesBefore && isDateBefore(yesterday, disableDatesBefore)) ||
					(disableSpecificDates && isDateDisabled(yesterday, disableSpecificDates))
				)
			) {
				setFocusDateAndHandleMonthChange(yesterday);
			}
		}
	};

	function handleKeyDown(event: KeyboardEvent) {
		const { key } = event;

		if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	const showNextYear = getNextDisplayYear(month, year);
	const showNextMonth = getNextDisplayMonth(month);

	const showNextToNextYear = getNextDisplayYear(showNextMonth, showNextYear);
	const showNextToNextMonth = getNextDisplayMonth(showNextMonth);

	const showPreviousYear = getPreviousDisplayYear(month, year);
	const showPreviousMonth = getPreviousDisplayMonth(month);

	const previousMonthName = monthName(showPreviousMonth);
	const nextMonth = multiMonth ? monthName(showNextToNextMonth) : monthName(showNextMonth);
	const nextYear = multiMonth ? showNextToNextYear : showNextYear;

	const monthIsSelected = $derived(deriveRange(selected));

	const firstDatePickerAccessibilityLabelPrefix = allowRange
		? 'Start of range'
		: dayAccessibilityLabelPrefix;
	const secondDatePickerAccessibilityLabelPrefix = 'End of range';

	const accessibilityLabelPrefixes: [string | undefined, string] = [
		firstDatePickerAccessibilityLabelPrefix,
		secondDatePickerAccessibilityLabelPrefix
	];

	const datePickerClassName = $derived(classNames(styles.DatePicker));
</script>

{#snippet secondDatePicker()}
	<Month
		onFocus={handleFocus}
		focusedDate={focusDate}
		month={showNextMonth}
		year={showNextYear}
		selected={monthIsSelected}
		{hoverDate}
		onChange={handleDateSelection}
		onHover={handleHover}
		{disableDatesBefore}
		{disableDatesAfter}
		{disableSpecificDates}
		{allowRange}
		{weekStartsOn}
		{accessibilityLabelPrefixes}
	/>
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div {id} class={datePickerClassName} onkeydown={handleKeyDown} onkeyup={handleKeyUp}>
	<div class={styles.Header}>
		<Button
			variant="tertiary"
			icon={ArrowLeftIcon}
			accessibilityLabel={`Show previous month, ${previousMonthName} ${showPreviousYear}`}
			onClick={() => handleMonthChangeClick(showPreviousMonth, showPreviousYear)}
		/>
		<Button
			variant="tertiary"
			icon={ArrowRightIcon}
			accessibilityLabel={`Show next month, ${nextMonth} ${nextYear}`}
			onClick={() => handleMonthChangeClick(showNextMonth, showNextYear)}
		/>
	</div>
	<div class={styles.MonthLayout}>
		<Month
			onFocus={handleFocus}
			focusedDate={focusDate}
			{month}
			{year}
			selected={deriveRange(selected)}
			{hoverDate}
			onChange={handleDateSelection}
			onHover={handleHover}
			{disableDatesBefore}
			{disableDatesAfter}
			{disableSpecificDates}
			{allowRange}
			{weekStartsOn}
			{accessibilityLabelPrefixes}
		/>
		{@render secondDatePicker()}
	</div>
</div>
