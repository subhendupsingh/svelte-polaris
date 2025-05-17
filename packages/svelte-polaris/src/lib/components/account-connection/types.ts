import type { Action } from "$utilities/types.js";
import type { Snippet } from "svelte";

export interface AccountConnectionProps {
    /** Content to display as title */
    title?: string;
    /** Content to display as additional details */
    details?: string;
    /** Content to display as terms of service */
    termsOfService?: string |  Snippet;
    /** The name of the service */
    accountName?: string;
    /** URL for the user’s avatar image */
    avatarUrl?: string;
    /** Set if the account is connected */
    connected?: boolean;
    /** Action for account connection */
    action?: Action;
  }