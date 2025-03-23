
import fetch from 'node-fetch'; 
import conf from '../conf/conf.js'

export default async function handler(req, res) {
 
  try {
    
    const imageUrl = `${conf.bucketURI}${req.url}`;

  
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image from Appwrite: ${imageResponse.statusText}`);
    }
    
   
    res.setHeader('Cache-Control', 'public, max-age=15000, immutable'); 
    res.setHeader('Content-Type', imageResponse.headers.get('Content-Type'));
    res.setHeader('Content-Length', imageResponse.headers.get('Content-Length'));
    res.setHeader('Content-Disposition', imageResponse.headers.get('Content-Disposition'));

    // Stream image data directly to the client
    imageResponse.body.pipe(res);
  } catch (err) {
    console.error('Error fetching image from Appwrite:', err);
    res.status(500).send('Error fetching image');
  }
}
