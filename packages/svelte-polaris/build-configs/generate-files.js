#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("__dirname", __dirname)

// Get the component name from command-line arguments
const componentName = process.argv[2];

if (!componentName) {
  console.error('Error: Please provide a component name as an argument.');
  console.log('Usage: node generate-files.js <ComponentName>');
  process.exit(1); // Exit with an error code
}

// Define the directory where files will be created (e.g., 'src/components')
// You can customize this to your project structure
const baseDir = path.join(__dirname, '../src/lib/components'); // Example: creates in src/components/ComponentName
const componentDir = path.join(baseDir, componentName);

// Content for the files (you can customize this)
const svelteContent = `<script lang="ts">
  import styles from './${componentName}.module.css';
</script>
`;

const cssModuleContent = ``;

const typesContent = `// Type definitions for ${componentName}`;

// Create the directory if it doesn't exist
if (!fs.existsSync(componentDir)) {
  try {
    fs.mkdirSync(componentDir, { recursive: true });
    console.log(`Directory created: ${componentDir}`);
  } catch (err) {
    console.error(`Error creating directory ${componentDir}:`, err);
    process.exit(1);
  }
} else {
  console.log(`Directory already exists: ${componentDir}`);
}

// Define file paths and content
const filesToCreate = [
  {
    filePath: path.join(componentDir, `${componentName}.svelte`),
    content: svelteContent,
  },
  {
    filePath: path.join(componentDir, `${componentName}.module.css`),
    content: cssModuleContent,
  },
  {
    filePath: path.join(componentDir, 'types.ts'), // Standard name for types file
    content: typesContent,
  },
];

// Create each file
filesToCreate.forEach(file => {
  try {
    if (fs.existsSync(file.filePath)) {
      console.warn(`Warning: File already exists and will be overwritten: ${file.filePath}`);
    }
    fs.writeFileSync(file.filePath, file.content);
    console.log(`File created: ${file.filePath}`);
  } catch (err) {
    console.error(`Error creating file ${file.filePath}:`, err);
  }
});

console.log(`\nSuccessfully generated files for component: ${componentName}`);