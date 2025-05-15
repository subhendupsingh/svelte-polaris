// ./build/postcss-plugins.js
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module'; // Import createRequire
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url); // Create a require function

// @ts-ignore
import postcssShopify from '@shopify/postcss-plugin';
import postcssImport from 'postcss-import';
import pxtorem from 'postcss-pxtorem';
import postcssCustomMedia from 'postcss-custom-media';
import postcssGlobalData from '@csstools/postcss-global-data';
import postcssNesting from 'postcss-nesting';
import postcssMixins from 'postcss-mixins';
import postcssDiscardComments from 'postcss-discard-comments';
import postcssModules from "postcss-modules";
import { generateScopedName } from './namespaced-classname.js';

const mediaQueriesCssPath = path.resolve(
  process.cwd(),
  'node_modules/@shopify/polaris-tokens/dist/css/media-queries.css',
);

const IS_BUILD_LIB_CSS_STEP = process.env.BUILD_CONTEXT === 'postcss_cli';

const postcssPlugins = [
  postcssImport(),
  postcssMixins({
    mixinsDir: path.join(__dirname, '../postcss-mixins'),
  }),
  postcssNesting({
    noIsPseudoSelector: true,
  }),
  postcssGlobalData({
    files: [mediaQueriesCssPath],
  }),
  postcssCustomMedia(),
  postcssShopify,
  pxtorem({
    rootValue: 16,
    replace: true,
    propList: ['*'],
  }),
  postcssDiscardComments()
];

/* postcssPlugins.push(
  postcssModules({
    generateScopedName: (name, fileName, css) => {
      return generateScopedName(name, fileName);
    },
    getJSON: (cssSourceFilePath, jsonMapping) => {
      const baseInputDir = path.resolve(process.cwd(), 'src/lib');
      const baseOutputDirForCssJs = path.resolve(process.cwd(), 'dist');
      const relativePathFromSrcLib = path.relative(baseInputDir, cssSourceFilePath);
      const componentName = path.basename(cssSourceFilePath, '.module.css');
      const targetDir = path.dirname(path.join(baseOutputDirForCssJs, relativePathFromSrcLib));
      const cssJsFilePath = path.join(targetDir, `${componentName}.css.js`);

      const jsContent = `var styles = ${JSON.stringify(jsonMapping, null, 2)};\n\nexport { styles as default };`;

      try {
        fs.mkdirSync(targetDir, { recursive: true });
        fs.writeFileSync(cssJsFilePath, jsContent);
        //console.log(`Generated CSS.JS map: ${cssJsFilePath}`);
      } catch (e) {
        console.error(`Failed to write CSS.JS map for ${cssSourceFilePath}:`, e);
      }
    }
  })
); */

export default postcssPlugins;