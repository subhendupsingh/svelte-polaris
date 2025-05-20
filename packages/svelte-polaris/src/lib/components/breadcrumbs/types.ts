// Type definitions for breadcrumbs

import type { CallbackAction, LinkAction } from "$utilities/types.js";

export interface BreadcrumbsProps {
    /**
     * @deprecated Back action link
     * Use `breadcrumbs` prop instead as documented [here](https://shopify.dev/docs/api/app-bridge/previous-versions/actions/titlebar#using-titlebar-with-polaris)
     */
    backAction: CallbackAction | LinkAction;
}