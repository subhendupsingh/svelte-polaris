<script>
    import { ActionList } from 'svelte-polaris';
    import ImportIcon from '@shopify/polaris-icons/dist/svg/ImportIcon.svg?component';
    import ExportIcon from '@shopify/polaris-icons/dist/svg/ExportIcon.svg?component';
    import DuplicateIcon from '@shopify/polaris-icons/dist/svg/DuplicateIcon.svg?component';
    import DeleteIcon from '@shopify/polaris-icons/dist/svg/DeleteIcon.svg?component';
  
    const actions = [
      {
        content: 'Import file',
        icon: ImportIcon,
        onAction: () => console.log('Import file')
      },
      {
        content: 'Export file',
        icon: ExportIcon,
        onAction: () => console.log('Export file')
      },
      {
        content: 'Duplicate',
        icon: DuplicateIcon,
        onAction: () => console.log('Duplicate')
      },
      {
        content: 'Delete',
        icon: DeleteIcon,
        destructive: true,
        onAction: () => console.log('Delete')
      }
    ];
  </script>
  
  <ActionList items={actions} />