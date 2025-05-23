#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the base directory for components
const BASE_COMPONENTS_DIR = path.join(__dirname, '../src/lib/components');

/**
 * Generates component files (Svelte, CSS module, types.ts) within a specified directory.
 * @param {string} componentName - The name of the component.
 * @param {string} targetDir - The directory where the component files should be created.
 */
function generateComponentFiles(componentName, targetDir) {
  const svelteContent = `<script lang="ts">
  import styles from './${componentName}.module.css';
</script>

<div class={styles.container}>
  </div>
`;

  const cssModuleContent = `.container {
  /* Add your styles for ${componentName} here */
}`;

  const typesContent = `// Type definitions for ${componentName} component`;

  const filesToCreate = [
    {
      filePath: path.join(targetDir, `${componentName}.svelte`),
      content: svelteContent,
    },
    {
      filePath: path.join(targetDir, `${componentName}.module.css`),
      content: cssModuleContent,
    },
    {
      filePath: path.join(targetDir, 'types.ts'),
      content: typesContent,
    },
  ];

  filesToCreate.forEach(file => {
    try {
      fs.writeFileSync(file.filePath, file.content);
      console.log(`File created: ${file.filePath}`);
    } catch (err) {
      console.error(`Error creating file ${file.filePath}:`, err);
    }
  });
}

/**
 * Creates a component directory and its files, including subcomponents if specified.
 * @param {string} mainComponentName - The name of the main component.
 * @param {string[]} subComponentNames - An array of subcomponent names.
 */
function createComponent(mainComponentName, subComponentNames = []) {
  const componentDir = path.join(BASE_COMPONENTS_DIR, mainComponentName);

  // 1. Check if the component directory already exists
  if (fs.existsSync(componentDir)) {
    console.error(`Error: Component directory already exists: ${componentDir}. Aborting.`);
    process.exit(1);
  }

  try {
    fs.mkdirSync(componentDir, { recursive: true });
    console.log(`Directory created: ${componentDir}`);
    generateComponentFiles(mainComponentName, componentDir);

    // Create subcomponents if they exist
    if (subComponentNames.length > 0) {
      const subComponentsBaseDir = path.join(componentDir, 'components');
      fs.mkdirSync(subComponentsBaseDir, { recursive: true });
      console.log(`  Subcomponents directory created: ${subComponentsBaseDir}`);

      console.log(`\nGenerating subcomponents for ${mainComponentName}:`);
      subComponentNames.forEach(subName => {
        const subComponentDir = path.join(subComponentsBaseDir, subName);
        fs.mkdirSync(subComponentDir, { recursive: true });
        console.log(`    Subdirectory created: ${subComponentDir}`);
        generateComponentFiles(subName, subComponentDir);
      });
    }

    console.log(`\nSuccessfully generated files for component: ${mainComponentName}`);
  } catch (err) {
    console.error(`Error creating component ${mainComponentName}:`, err);
    process.exit(1);
  }
}

// Parse command-line arguments
const args = process.argv.slice(2);
const componentName = args[0];

if (!componentName) {
  console.error('Error: Please provide a component name as an argument.');
  console.log('Usage: pnpm gen <ComponentName> [-y <SubComponentName1> <SubComponentName2> ...]');
  process.exit(1);
}

let subcomponents = [];
const subcomponentFlagIndex = args.indexOf('-y');

if (subcomponentFlagIndex !== -1) {
  subcomponents = args.slice(subcomponentFlagIndex + 1);
  if (subcomponents.length === 0) {
    console.warn('Warning: -y flag provided but no subcomponent names found. Generating only the main component.');
  }
}

// Execute the component creation
createComponent(componentName, subcomponents);