import { themes, type Theme, type ThemeName } from "@shopify/polaris-tokens";
import type { Snippet } from "svelte";

export const themeNamesLocal = ['light', 'dark-experimental'] as const;

export type ThemeNameLocal = (typeof themeNamesLocal)[number];

export const isThemeNameLocal = (name: string): name is ThemeNameLocal => themeNamesLocal.includes(name as any);

export interface ThemeProviderProps {
    as?: keyof HTMLElementTagNameMap;
    children: Snippet;
    className?: string;
    theme?: ThemeNameLocal;
    'data-portal-id'?: string;
}

export function getTheme(themeName: ThemeName): Theme {
    return themes[themeName];
}
