import { EPHEMERAL_PRESENCE_MANAGER_CONTEXT_KEY, type EphemeralPresenceManagerContextType } from "$lib/components/app-provider/types.js";
import type { ThemeName } from "@shopify/polaris-tokens";
import { getContext, setContext } from "svelte";
import { MAPPED_ACTION_CONTEXT_KEY, type MappedActionContextType } from "./listbox/types.js";

export const SCROLLABLE_CONTEXT_KEY = 'scrollable';
export type ScrollToPositionFn = (scrollY: number) => void;
export const useContext = <T>(key: string): (() => T | undefined) => {
  const context = getContext<T>(key) as any;
  if (!context) {
    return () => undefined;
  }
  return context;
}


// Define the types for your context value (mirroring your React types)
export type PortalsContainerElement = HTMLDivElement | null; // Or your actual definition
export interface PortalsManager {
  container?: PortalsContainerElement;
}

/* export function usePortalsManager() {
  const portalsManager = useContext<PortalsManager | undefined>(PORTALS_MANAGER_KEY);

  if (!portalsManager) {
    throw new Error(
      'No portals manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return portalsManager;
} */

export const THEME_NAME_KEY = 'ThemeName';
export function useThemeName() {
  const themeName = useContext<ThemeName | null>(THEME_NAME_KEY);

  if (!themeName) {
    throw new Error(
      'No themeName was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return themeName;
}

/* export function useEphemeralPresenceManager() {
    const ephemeralPresenceManager = useContext<EphemeralPresenceManagerContextType | undefined>(EPHEMERAL_PRESENCE_MANAGER_CONTEXT_KEY);

    if (!ephemeralPresenceManager) {
        throw new Error(
            'No ephemeral presence manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
        );
    }

    return ephemeralPresenceManager;
} */

/* export function useMappedAction() {
    const mappedAction = useContext<MappedActionContextType | undefined>(MAPPED_ACTION_CONTEXT_KEY);

    if (!mappedAction) {
        throw new Error(
            'No mapped action was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
        );
    }

    return mappedAction;
} */



