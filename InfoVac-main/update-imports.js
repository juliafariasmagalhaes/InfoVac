import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function updateImports(directory) {
  const files = readdirSync(directory);
  
  files.forEach(file => {
    const filePath = join(directory, file);
    const stats = statSync(filePath);
    
    if (stats.isDirectory()) {
      updateImports(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = readFileSync(filePath, 'utf8');
      if (content.includes('@/lib/utils')) {
        content = content.replace(/@\/lib\/utils/g, '@/utils');
        writeFileSync(filePath, content);
        console.log(`Updated imports in ${filePath}`);
      }
    }
  });
}

updateImports('./src'); 