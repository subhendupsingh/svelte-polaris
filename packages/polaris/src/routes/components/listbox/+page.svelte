<script>
	import { List, Listbox } from "$lib/index.js";

</script>
<Listbox onSelect={(v)=> console.log(v)}>
    <Listbox.Option value="1">Option 1</Listbox.Option>
    <Listbox.Option value="2">Option 2</Listbox.Option>
</Listbox>