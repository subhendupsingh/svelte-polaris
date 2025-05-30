import type { Snippet } from "svelte";

export enum AutoSelection {
    /** Default active option is the first selected option. If no options are selected, defaults to first interactive option. */
    FirstSelected = 'FIRST_SELECTED',
    /** Default active option is always the first interactive option. */
    First = 'FIRST',
    /** Default to the manual selection pattern. */
    None = 'NONE',
}

export interface ListboxProps {
    /** Inner content of the listbox */
    children: Snippet;
    /** Indicates the default active option in the list. Patterns that support option creation should default the active option to the first option.
     * @default AutoSelection.FirstSelected
     */
    autoSelection?: AutoSelection;
    /** Explicitly enable keyboard control */
    enableKeyboardControl?: boolean;
    /** Visually hidden text for screen readers */
    accessibilityLabel?: string;
    /** Provide a custom ID for the list element */
    customListId?: string;
    /** Callback fired when an option is selected */
    onSelect?(value: string): void;
    /** Callback fired when an option becomes active */
    onActiveOptionChange?(value: string, domId: string): void;
}

export type ArrowKeys = 'up' | 'down';

export const OPTION_SELECTOR = '[data-listbox-option]';
export const OPTION_VALUE_ATTRIBUTE = 'data-listbox-option-value';
export const OPTION_ACTION_ATTRIBUTE = 'data-listbox-option-action';
export const OPTION_FOCUS_ATTRIBUTE = 'data-focused';