import PaneComponent from "./components/pane/pane.svelte";
import PopoverPolarisComponent from "./popover.svelte";
import SectionComponent from "./components/section/section.svelte";

type PopoverCompoundType = typeof PopoverPolarisComponent & {
    Pane: typeof PaneComponent;
    Section: typeof SectionComponent;
};


const Popover = PopoverPolarisComponent as PopoverCompoundType;
Popover.Pane = PaneComponent;
Popover.Section = SectionComponent;

export default Popover;
