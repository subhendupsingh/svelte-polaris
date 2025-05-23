import type { Snippet } from "svelte";

export interface OptionProps {
    // Unique item value
    value: string;
    // Visually hidden text for screen readers
    accessibilityLabel?: string;
    // Children. When a string, children are rendered in a styled TextOption
    children?: string | Snippet;
    // Option is selected
    selected?: boolean;
    // Option is disabled
    disabled?: boolean;
    // Adds a border-bottom to the Option
    divider?: boolean;
}