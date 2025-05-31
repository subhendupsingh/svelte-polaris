import type { CheckboxHandles } from "$utilities/types.js";

export interface CheckableButtonProps {
    accessibilityLabel?: string;
    label?: string;
    selected?: boolean;
    disabled?: boolean;
    onToggleAll?(): void;
    ariaLive?: 'off' | 'polite';
    ref?: CheckboxHandles | null
}