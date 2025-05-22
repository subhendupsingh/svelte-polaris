import type { ThemeName } from "@shopify/polaris-tokens";
import { getContext, setContext } from "svelte";

export const SCROLLABLE_CONTEXT_KEY = Symbol("scrollable");
export type ScrollToPositionFn = (scrollY: number) => void;
export const useContext = <T>(key: symbol) => getContext<T>(key);

export const PORTALS_MANAGER_KEY = Symbol('PortalsManager'); // Unique key for the context

// Define the types for your context value (mirroring your React types)
export type PortalsContainerElement = HTMLDivElement | null; // Or your actual definition
export interface PortalsManager {
  container?: PortalsContainerElement;
}

export function usePortalsManager() {
  const portalsManager = useContext<PortalsManager | undefined>(PORTALS_MANAGER_KEY);

  if (!portalsManager) {
    throw new Error(
      'No portals manager was provided. Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return portalsManager;
}

export const THEME_NAME_KEY = Symbol('ThemeName');
export function useThemeName() {
  const themeName = useContext<ThemeName | null>(THEME_NAME_KEY);

  if (!themeName) {
    throw new Error(
      'No themeName was provided. Your application must be wrapped in an <AppProvider> or <ThemeProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.',
    );
  }

  return themeName;
}

