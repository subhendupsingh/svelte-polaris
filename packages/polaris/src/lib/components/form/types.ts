import type { Snippet } from "svelte";

type Enctype =
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain';

//type Method = 'post' | 'get' | 'action';
type Method = 'post' | 'get';

type Target = '_blank' | '_self' | '_parent' | '_top' | string;

export interface FormProps {
    /** Space separated list of character encodings */
    acceptCharset?: string;
    /** Where to send form-data on submittal */
    action?: string;
    /** Grants the browser the ability to autocomplete input elements */
    autoComplete?: boolean;
    /** The content to display inside the form. */
    children?: Snippet;
    /** Media type when submitting content to server */
    encType?: Enctype;
    /** Toggles if form submits on Enter keypress. Defaults to true. */
    implicitSubmit?: boolean;
    /** Method used to submit form */
    method?: Method;
    /** A unique name for the form */
    name?: string;
    /** Whether or not form is validated when submitting */
    noValidate?: boolean;
    /** Blocks the default form action */
    preventDefault?: boolean;
    /** Where to display response after form submittal */
    target?: Target;
    /** Callback when form is submitted */
    onSubmit(event: SubmitEvent): unknown;
}