import type { Key } from "$utilities/types.js";
import type { Snippet } from "svelte";

// Type definitions for pagination
export interface AccessibilityLabels {
    previous: string;
    next: string;
}

export interface PaginationProps {
    /** Keyboard shortcuts for the next button */
    nextKeys?: Key[];
    /** Keyboard shortcuts for the previous button */
    previousKeys?: Key[];
    /** Tooltip for the next button */
    nextTooltip?: string;
    /** Tooltip for the previous button */
    previousTooltip?: string;
    /** The URL of the next page */
    nextURL?: string;
    /** The URL of the previous page */
    previousURL?: string;
    /** Whether there is a next page to show */
    hasNext?: boolean;
    /** Whether there is a previous page to show */
    hasPrevious?: boolean;
    /** Accessible label for the pagination */
    accessibilityLabel?: string;
    /** Accessible labels for the buttons and UnstyledLinks */
    accessibilityLabels?: AccessibilityLabels;
    /** Callback when next button is clicked */
    onNext?(): void;
    /** Callback when previous button is clicked */
    onPrevious?(): void;
    /** Text to provide more context in between the arrow buttons */
    label?: Snippet|string;
    /** Layout structure of the component */
    type?: 'page' | 'table';
}