<script>
    import { ActionList } from 'svelte-polaris';
  
    const sections = [
      {
        title: 'File actions',
        items: [
          { content: 'Import', onAction: () => console.log('Import') },
          { content: 'Export', onAction: () => console.log('Export') }
        ]
      },
      {
        title: 'Edit actions',
        items: [
          { content: 'Duplicate', onAction: () => console.log('Duplicate') },
          { content: 'Edit', onAction: () => console.log('Edit') }
        ]
      },
      {
        items: [
          {
            content: 'Delete',
            destructive: true,
            onAction: () => console.log('Delete')
          }
        ]
      }
    ];
  </script>
  
  <ActionList sections={sections} />