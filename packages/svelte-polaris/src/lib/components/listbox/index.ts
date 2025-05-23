import ListboxComponent from './listbox.svelte';
import OptionComponent from './components/option/option.svelte';
import LoadingComponent from './components/loading/loading.svelte';
import TextOptionComponent from './components/text-option/text-option.svelte';
import SectionComponent from './components/section/section.svelte';
import HeaderComponent from './components/header/header.svelte';
import ActionComponent from './components/action/action.svelte';

type ListboxCompoundType = typeof ListboxComponent & {
    Option: typeof OptionComponent;
    Loading: typeof LoadingComponent;
    TextOption: typeof TextOptionComponent;
    Section: typeof SectionComponent;
    Header: typeof HeaderComponent;
    Action: typeof ActionComponent;
};

const Listbox = ListboxComponent as ListboxCompoundType;
Listbox.Option = OptionComponent;
Listbox.Loading = LoadingComponent;
Listbox.TextOption = TextOptionComponent;
Listbox.Section = SectionComponent;
Listbox.Header = HeaderComponent;
Listbox.Action = ActionComponent;

export default Listbox;
