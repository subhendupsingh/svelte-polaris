<script>
    import { ActionList } from 'svelte-polaris';
  
    const actions = [
      { content: 'Import file', onAction: () => console.log('Import file') },
      { content: 'Export file', onAction: () => console.log('Export file') },
      { content: 'Duplicate', onAction: () => console.log('Duplicate') },
      { content: 'Print', onAction: () => console.log('Print') }
    ];
  </script>
  
  <ActionList items={actions} />