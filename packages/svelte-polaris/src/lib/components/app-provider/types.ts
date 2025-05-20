export interface MediaQueryState {
    isNavigationCollapsed: boolean;
    // Add other media query states you might need, e.g., isMobile, isTablet, etc.
    // isMobile: boolean;
}

// Unique key for the Svelte context
export const MEDIA_QUERY_CONTEXT_KEY = Symbol('MediaQueryContext');
export const FILTER_ACTIONS_CONTEXT_KEY = Symbol('FilterActionsContext');