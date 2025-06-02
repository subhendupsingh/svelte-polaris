import type { ButtonProps } from "$lib/components/button/button.types.js";
import type { SvelteNode } from "$utilities/types.js";

export interface SecondaryAction extends ButtonProps {
    helpText?: SvelteNode;
    destructive?: boolean;
    onAction?(): void;
}