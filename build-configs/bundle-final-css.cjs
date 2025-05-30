// not used, may do this later
const fs = require('fs-extra');
const path = require('node:path');
const glob = require('glob');

const projectRoot = path.resolve(__dirname, '..');
const finalDistDir = path.join(projectRoot, 'dist');
const processedCssModulesDir = path.join(projectRoot, 'dist/components'); // Source of processed .module.css

async function bundleFinalCss() {
  try {
    let allCssContent = '';

    // 1. Add Polaris Tokens CSS (this already contains global variables)
    const polarisTokensCssPath = path.resolve(projectRoot, 'node_modules/@shopify/polaris-tokens/dist/css/styles.css');
    if (await fs.pathExists(polarisTokensCssPath)) {
      allCssContent += await fs.readFile(polarisTokensCssPath, 'utf8') + '\n\n';
    } else {
      console.warn(`Warning: Polaris Tokens CSS not found at ${polarisTokensCssPath}`);
    }

    // 2. Add Polaris Media Queries CSS
    const polarisMediaQueriesCssPath = path.resolve(projectRoot, 'node_modules/@shopify/polaris-tokens/dist/css/media-queries.css');
    if (await fs.pathExists(polarisMediaQueriesCssPath)) {
      allCssContent += await fs.readFile(polarisMediaQueriesCssPath, 'utf8') + '\n\n';
    } else {
      console.warn(`Warning: Polaris Media Queries CSS not found at ${polarisMediaQueriesCssPath}`);
    }

    // 3. Add all processed *.module.css files from dist/lib-temp
    const componentCssFiles = glob.sync('**/*.module.css', { cwd: processedCssModulesDir });
    console.log(`Found ${componentCssFiles.length} processed component CSS files in ${processedCssModulesDir}`);

    for (const relativeCssPath of componentCssFiles) {
      const cssFilePath = path.join(processedCssModulesDir, relativeCssPath);
      allCssContent += await fs.readFile(cssFilePath, 'utf8') + '\n\n';
    }

    // 4. Write the unified styles.css to the main dist folder
    const outputCssPath = path.join(finalDistDir, 'styles.css');
    await fs.ensureDir(path.dirname(outputCssPath)); // Ensures 'dist' exists
    await fs.writeFile(outputCssPath, allCssContent);
    console.log(`Unified styles.css generated at ${outputCssPath}`);

  } catch (error) {
    console.error('Error bundling final CSS:', error);
    process.exit(1);
  }
}

bundleFinalCss();