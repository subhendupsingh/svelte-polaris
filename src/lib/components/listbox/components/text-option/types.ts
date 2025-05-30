import type { Snippet } from "svelte";

export interface TextOptionProps {
    children: Snippet|string;
    // Whether the option is selected
    selected?: boolean;
    // Whether the option is disabled
    disabled?: boolean;
}