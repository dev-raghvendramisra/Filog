import {promisses as fs} from 'fs';
import path from 'path';

export default async function getViteAssets() {
   const manifestPath  = path.resolve(process.cwd(), 'dist','.vite','manifest.json');
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