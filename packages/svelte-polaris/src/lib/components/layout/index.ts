import LayoutSectionComponent from "./components/layout-section/layout-section.svelte";
import AnnotatedLayoutSectionComponent from "./components/annotated-layout-section/annotated-layout-section.svelte";
import LayoutComponent from "./layout.svelte";

type LayoutCompoundType = typeof LayoutComponent & {
    Section: typeof LayoutSectionComponent;
    AnnotatedSection: typeof AnnotatedLayoutSectionComponent;
};

const Layout = LayoutComponent as LayoutCompoundType;
Layout.Section = LayoutSectionComponent;
Layout.AnnotatedSection = AnnotatedLayoutSectionComponent;

export default Layout;

    