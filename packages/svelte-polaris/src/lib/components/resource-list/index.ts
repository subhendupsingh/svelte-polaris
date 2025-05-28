import ResourceItem from '../resource-item/resource-item.svelte';
import ResourceListComponent from './resource-list.svelte';

type CompoundResourceListType = typeof ResourceListComponent & {
    Item : typeof ResourceItem
}

const ResourceList = ResourceListComponent as CompoundResourceListType;
ResourceList.Item = ResourceItem;

export default ResourceList;