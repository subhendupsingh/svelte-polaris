export interface NavigableOption {
    domId: string;
    value: string;
    element: HTMLElement;
    disabled: boolean;
    isAction?: boolean;
    index?: number;
}

export const LISTBOX_CONTEXT_KEY = 'ListboxContext';
export const WITHIN_LISTBOX_CONTEXT_KEY = 'WithinListboxContext';
export const ACTION_CONTEXT_KEY = 'ActionContext';
export const MAPPED_ACTION_CONTEXT_KEY = 'MappedActionContext';

export interface MappedActionContextType {
    role?: string;
    url?: string;
    external?: boolean;
    onAction?(): void;
    destructive?: boolean;
}

export interface ListboxContextType {
    onOptionSelect(option: NavigableOption): void;
    setLoading(label?: string): void;
}