import type { Error } from "$utilities/types.js";

export interface InlineErrorProps {
  /** Content briefly explaining how to resolve the invalid form field input. */
  message: Error;
  /** Unique identifier of the invalid form field that the message describes */
  fieldID: string;
}

export function errorTextID(id: string) {
  return `${id}Error`;
}