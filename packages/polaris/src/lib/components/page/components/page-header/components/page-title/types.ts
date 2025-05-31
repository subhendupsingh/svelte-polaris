import type { Snippet } from "svelte";

export interface TitleProps {
    /**
     * @deprecated Page title, in large type
     * Use `breadcrumbs` prop instead as documented [here](https://shopify.dev/docs/api/app-bridge/previous-versions/actions/titlebar#using-titlebar-with-polaris)
     */
    title?: string;
    /** Page subtitle, in regular type */
    subtitle?: string;
    /** Important status information shown immediately after the title. */
    titleMetadata?: Snippet;
    /** Removes spacing between title and subtitle */
    compactTitle?: boolean;
    /** Whether or not to add a max-width to the subtitle. Gets calculated by
     * the presence of either the secondaryActions or actionGroups props on the
     * Header that consumes this component */
    hasSubtitleMaxWidth?: boolean;
}