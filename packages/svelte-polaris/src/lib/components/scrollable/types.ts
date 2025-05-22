import { scrollable } from "$utilities/shared.js";
import type { Snippet } from "svelte";

export const MAX_SCROLL_HINT_DISTANCE = 100;
export const LOW_RES_BUFFER = 2;

export interface ScrollableProps {
    /** Content to display in scrollable area */
    children?: Snippet;
    /** Scroll content vertically
     * @default true
     * */
    vertical?: boolean;
    /** Scroll content horizontally
     * @default true
     * */
    horizontal?: boolean;
    /** Add a shadow when content is scrollable */
    shadow?: boolean;
    /** Slightly hints content upon mounting when scrollable */
    hint?: boolean;
    /** Adds a tabIndex to scrollable when children are not focusable */
    focusable?: boolean;
    /** Browser determined scrollbar width
     * @default 'thin'
     */
    scrollbarWidth?: 'thin' | 'none' | 'auto';
    /** Adds space to one or both sides to prevent content shift when scrolling is necessary */
    scrollbarGutter?: 'stable' | 'stable both-edges';
    /** Called when scrolled to the bottom of the scroll area */
    onScrolledToBottom?(): void;
}

export interface ScrollToOptions {
    behavior?: 'instant' | 'smooth' | 'auto';
}

export interface ScrollableRef {
    scrollTo: (scrollY: number, options?: ScrollToOptions) => void;
}

export function prefersReducedMotion() {
    try {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (err) {
        return false;
    }
}

export function performScrollHint(elem?: HTMLDivElement | null) {
    if (!elem || prefersReducedMotion()) {
        return;
    }

    const scrollableDistance = elem.scrollHeight - elem.clientHeight;
    const distanceToPeek =
        Math.min(MAX_SCROLL_HINT_DISTANCE, scrollableDistance) - LOW_RES_BUFFER;

    const goBackToTop = () => {
        requestAnimationFrame(() => {
            if (elem.scrollTop >= distanceToPeek) {
                elem.removeEventListener('scroll', goBackToTop);
                elem.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    };

    elem.addEventListener('scroll', goBackToTop);
    elem.scrollTo({ top: MAX_SCROLL_HINT_DISTANCE, behavior: 'smooth' });
}

export const forNode = (node: HTMLElement): HTMLElement | Document => {
    const closestElement = node.closest(scrollable.selector);
    return closestElement instanceof HTMLElement ? closestElement : document;
  };
  
