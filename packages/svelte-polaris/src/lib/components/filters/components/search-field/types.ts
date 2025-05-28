export interface SearchFieldProps {
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onClear?: () => void;
    focused?: boolean;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    borderlessQueryField?: boolean;
    /** Show a loading spinner to the right of the input */
    loading?: boolean;
    /** @deprecated If present, will show as a suffix in the text field when entering a search term */
    selectedViewName?: string;
}