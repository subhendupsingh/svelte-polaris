import type { ButtonProps } from "$lib/components/button/button.types.js";
import type { MenuGroupDescriptor } from "$utilities/types.js";

export interface BulkActionsMenuProps extends MenuGroupDescriptor {
    isNewBadgeInBadgeActions: boolean;
    size?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
}
