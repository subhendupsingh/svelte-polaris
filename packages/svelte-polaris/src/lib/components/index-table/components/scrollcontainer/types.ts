import type { Snippet } from 'svelte';

export interface ScrollContainerProps {
    children: Snippet;
    scrollableContainerRef: HTMLDivElement | undefined;
    onScroll(canScrollLeft: boolean, canScrollRight: boolean): void;
}