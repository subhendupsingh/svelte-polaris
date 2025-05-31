import ScrollToComponent from "./components/scroll-to/scroll-to.svelte";
import ScrollableComponent from "./scrollable.svelte";

type ScrollableCompoundType = typeof ScrollableComponent & {
	ScrollTo: typeof ScrollToComponent;
};

const Scrollable = ScrollableComponent as ScrollableCompoundType;
Scrollable.ScrollTo = ScrollToComponent;

export default Scrollable;