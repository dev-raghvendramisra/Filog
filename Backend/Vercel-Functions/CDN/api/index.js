
import fetch from 'node-fetch'; 
import conf from '../conf/conf.js'

export default async function handler(req, res) {
  const { imageId } = req.query;

  try {
  
    const imageUrl = `${conf.appwriteUrl}/storage/buckets/${conf.bucketId}/files/${imageId}/view?project=${conf.projectId}`;

  
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image from Appwrite: ${imageResponse.statusText}`);
    }
    
   
    res.setHeader('Cache-Control', 'public, max-age=2592000, immutable'); // 30 days in seconds
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