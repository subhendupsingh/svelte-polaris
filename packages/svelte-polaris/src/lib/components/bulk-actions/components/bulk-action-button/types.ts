import type { ButtonProps } from "$lib/components/button/button.types.js";
import type { DestructableAction, DisableableAction } from "$utilities/types.js";

export type BulkActionButtonProps = {
    disclosure?: boolean;
    indicator?: boolean;
    handleMeasurement?(width: number): void;
    showContentInButton?: boolean;
    size?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
} & DisableableAction &
    DestructableAction;