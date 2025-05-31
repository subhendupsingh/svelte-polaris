import type { BorderWidthScale, ColorBorderAlias } from "@shopify/polaris-tokens";

export interface DividerProps {
    /**
     * Divider border color
     * @default 'border-secondary'
     */
    borderColor?: ColorBorderAlias | 'transparent';
    /**
     * Divider border width
     * @default '025'
     */
    borderWidth?: BorderWidthScale;
}