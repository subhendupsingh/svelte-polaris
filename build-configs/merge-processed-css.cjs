const fs = require('fs-extra'); // For robust file operations
const path = require('node:path'); // Use node: prefix for clarity
const glob = require('glob'); // For finding all processed CSS files

// Define base directories
const projectRoot = path.resolve(__dirname, '..'); // Assumes this script is in PROJECT_ROOT/scripts/
const tempProcessedCssDir = path.join(projectRoot, 'dist', 'lib-temp');
const finalDistDir = path.join(projectRoot, 'dist');

async function mergeCSS() {
  try {
    console.log('### Merging CSS Modules after mixin resolution ###');
    console.log(`Looking for processed CSS in: ${tempProcessedCssDir}`);
    if (!await fs.pathExists(tempProcessedCssDir)) {
      console.log('No processed CSS found in temp directory. Skipping CSS merge.');
      return;
    }

    // Find all .module.css files in the temp processed CSS directory
    const processedCssFiles = glob.sync('**/*.module.css', { cwd: tempProcessedCssDir });

    if (processedCssFiles.length === 0) {
      console.log('No .module.css files found in the temp processed CSS directory.');
      await fs.remove(tempProcessedCssDir); // Clean up if empty
      return;
    }

    //console.log(`Found ${processedCssFiles.length} processed .module.css files to merge.`);

    for (const relativeCssPath of processedCssFiles) {
      const sourceCssPath = path.join(tempProcessedCssDir, relativeCssPath);
      // Determine the target path in the main dist directory.
      // This assumes svelte-package uses a similar structure under `dist/`
      // as your `src/lib/` structure.
      // e.g., if processedCssDir has components/Text/Text.module.css,
      // it will be copied to finalDistDir/components/Text/Text.module.css
      const targetCssPath = path.join(finalDistDir, relativeCssPath);

      // Ensure target directory exists
      await fs.ensureDir(path.dirname(targetCssPath));

      // Copy the processed CSS file, overwriting any unprocessed one
      //console.log(`Copying ${sourceCssPath} to ${targetCssPath}`);
      await fs.copy(sourceCssPath, targetCssPath, { overwrite: true });
    }

    // Clean up the temporary directory
    //console.log(`Cleaning up temporary processed CSS directory: ${tempProcessedCssDir}`);
    await fs.remove(tempProcessedCssDir);

    console.log('Processed CSS files merged successfully into dist.');

  } catch (error) {
    console.error('Error during CSS merge process:', error);
    process.exit(1);
  }
}

mergeCSS();