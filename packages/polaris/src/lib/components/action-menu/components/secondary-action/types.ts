import type { ButtonProps } from "$lib/components/button/button.types.js";
import type { VueNode } from "$utilities/types.js";

export interface SecondaryAction extends ButtonProps {
    helpText?: VueNode;
    destructive?: boolean;
    onAction?(): void;
}