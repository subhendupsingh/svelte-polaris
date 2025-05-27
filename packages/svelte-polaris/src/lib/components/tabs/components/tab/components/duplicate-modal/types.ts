export interface DuplicateModalProps {
    open: boolean;
    isModalLoading?: boolean;
    name: string;
    helpText?: string;
    viewNames?: string[];
    onClose: () => void;
    onClickPrimaryAction: (value: string) => Promise<void>;
    onClickSecondaryAction?: () => void;
}

export const MAX_VIEW_NAME_LENGTH = 40;