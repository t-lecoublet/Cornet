import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import r from './reference.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Récupérer les options depuis les variables d'environnement
const showOutput = process.env.DAISYUI_SHOW_OUTPUT !== 'false';
const failOnError = process.env.DAISYUI_FAIL_ON_ERROR === 'true';

// Configuration
const LIB_ROOT = path.resolve(__dirname, '..');
const APP_SRC = path.resolve(process.cwd(), 'src');
const OUTPUT_DIR = path.resolve(process.cwd(), '.');
const LIB_NAME = 'daisyui-vue-kit';

/**
 * Main function to detect unused components
 */
async function main() {
  try {
    if (showOutput) {
      console.log(`${r.Dim}Tree shaking unused components${r.Reset}`);
    }
    
    // 1. Get all available components from lib
    const allComponents = getAvailableComponents();
    if (showOutput) {
      console.log(`Total components : ${allComponents.size}`);
    }
    
    // 2. Find imported components in app
    const usedComponents = await findUsedComponents();
    if (showOutput) {
      console.log(`Used : ${r.Bright}${usedComponents.size}${r.Reset}`);
    }
    
    // 4. Generate CSS with component exclusions
    await generateExclusionCSS(allComponents, usedComponents);
    
    if (showOutput) {
      console.log(`${r.FgGreen}✓${r.Reset} ${allComponents.size - usedComponents.size} components excluded.`);
    }
  } catch (error) {
    console.error('❌ Error in component detection:', error);
    if (failOnError) {
      process.exit(1);
    }
  }
}

/**
 * Extract all components exported from the library
 */
function getAvailableComponents() {
  const components = new Set();
  const indexPath = path.resolve(LIB_ROOT, 'index.ts');
  
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Library index file not found at ${indexPath}`);
  }
  
  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  const exportRegex = /export\s*{\s*default\s+as\s+(\w+)\s*}\s+from\s+['"](.+?)['"]/g;
  let match;
  
  while ((match = exportRegex.exec(indexContent)) !== null) {
    const componentName = match[1];
    components.add(componentName);
  }
  
  return components;
}

/**
 * Find components used in the application
 */
async function findUsedComponents() {
  const usedComponents = new Set();
  
  if (!fs.existsSync(APP_SRC)) {
    console.warn(`⚠️ App source directory not found at ${APP_SRC}`);
    return usedComponents;
  }
  
  // Get all Vue, JS and TS files
  const files = getAllFiles(APP_SRC, ['.vue', '.js', '.ts', '.tsx', '.jsx']);
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Check for import statements
      const importRegex = new RegExp(`import\\s+{([^}]+)}\\s+from\\s+['"]${LIB_NAME}['"]`, 'g');
      let importMatch;
      
      while ((importMatch = importRegex.exec(content)) !== null) {
        const importedItems = importMatch[1].split(',').map(item => item.trim());
        importedItems.forEach(item => usedComponents.add(item));
      }
      
      // Check for component usage in templates
      const componentRegex = /<(Du\w+)[\s/>]/g;
      let componentMatch;
      
      while ((componentMatch = componentRegex.exec(content)) !== null) {
        usedComponents.add(componentMatch[1]);
      }
    } catch (error) {
      console.warn(`⚠️ Error processing file ${file}:`, error.message);
    }
  }
  
  return usedComponents;
}

/**
 * Get all files with specified extensions recursively
 */
function getAllFiles(dir, extensions) {
  let results = [];
  
  try {
    const list = fs.readdirSync(dir);
    
    for (const file of list) {
      const filePath = path.resolve(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        results = results.concat(getAllFiles(filePath, extensions));
      } else {
        const ext = path.extname(file);
        if (extensions.includes(ext)) {
          results.push(filePath);
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️ Error reading directory ${dir}:`, error.message);
  }
  
  return results;
}

/**
 * Generate CSS file to exclude unused components
 */
async function generateExclusionCSS(allComponents, usedComponents) {
  // Create component path mapping
  const componentPaths = {};
  const indexContent = fs.readFileSync(path.resolve(LIB_ROOT, 'index.ts'), 'utf-8');
  const exportRegex = /export\s*{\s*default\s+as\s+(\w+)\s*}\s+from\s+['"](.+?)['"]/g;
  let match;
  
  while ((match = exportRegex.exec(indexContent)) !== null) {
    const componentName = match[1];
    const componentPath = match[2];
    componentPaths[componentName] = componentPath;
  }
  
  const unusedComponents = [...allComponents].filter(component => !usedComponents.has(component));
  
  // Generate CSS content
  let cssContent = `/* Auto-generated file to exclude unused DaisyUI Vue components */
/* Generated on ${new Date().toISOString()} */
/* ${unusedComponents.length} components excluded */

`;
  
  for (const component of unusedComponents) {
    if (componentPaths[component]) {
      // Get relative path suitable for CSS @scope directive
      let relativePath = componentPaths[component].replace('./components/', 'components/');
      cssContent += `@source not "./${relativePath}";\n`;
    }
  }
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Write CSS file
  const outputFile = path.join(OUTPUT_DIR, 'index.css');
  fs.writeFileSync(outputFile, cssContent);

}

// Run the script
main();