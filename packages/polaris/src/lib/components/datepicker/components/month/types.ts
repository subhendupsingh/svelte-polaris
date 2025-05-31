import type { Range } from "$utilities/dates.js";

export interface MonthProps {
    focusedDate?: Date;
    selected?: Range;
    hoverDate?: Date;
    month: number;
    year: number;
    disableDatesBefore?: Date;
    disableDatesAfter?: Date;
    disableSpecificDates?: Date[];
    allowRange?: boolean;
    weekStartsOn: number;
    accessibilityLabelPrefixes: [string | undefined, string];
    onChange?(date: Range): void;
    onHover?(hoverEnd: Date): void;
    onFocus?(date: Date): void;
}