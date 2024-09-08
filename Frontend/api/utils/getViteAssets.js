import {promises as fs} from 'fs';
import { fileURLToPath } from 'url';
import {dirname, join} from 'path';

export default async function getViteAssets() {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename)

    const manifestPath = join(__dirname, '.vite/manifest.json');
   try {

    const data = await fs.readFile(manifestPath, 'utf-8');
    const manifest = JSON.parse(data);
    if(manifest){
        const jsFile = manifest['index.html']?.file || null;
        const cssFile = manifest['index.html']?.css || null;
        return {jsFile, cssFile};
    }
    
   } catch (error) {
         console.log('Error reading Vite assets:', error);
         return null;
   }
}