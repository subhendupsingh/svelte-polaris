export interface MediaQueryState {
  isNavigationCollapsed: boolean;
  // Add other media query states you might need, e.g., isMobile, isTablet, etc.
  // isMobile: boolean;
}

// Unique key for the Svelte context
export const MEDIA_QUERY_CONTEXT_KEY = 'MediaQueryContext';
export const FILTER_ACTIONS_CONTEXT_KEY = 'FilterActionsContext';
export const EPHEMERAL_PRESENCE_MANAGER_CONTEXT_KEY = 'EphemeralPresenceManagerContext';
export const RESOURCE_LIST_CONTEXT_KEY = 'ResourceListContext';

export type EphemeralPresenceKey = 'tooltip';

export interface EphemeralPresenceManagerContextType {
  presenceList: {
    [key in EphemeralPresenceKey]: boolean;
  };
  presenceCounter: {
    [key in EphemeralPresenceKey]: number;
  };
  addPresence: (key: EphemeralPresenceKey) => void;
  removePresence: (key: EphemeralPresenceKey) => void;
}

export const FEATURES_CONTEXT_KEY = 'FEATURESCONTEXT';

export interface FeaturesConfig {
  [key: string]: boolean | undefined;
}

export interface Features { }