import fetch from 'node-fetch'; 
import conf from '../conf/conf.js';

export default async function handler(req, res) {
  try {
    const imageUrl = `${conf.bucketURI}${req.url}`;

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image from Appwrite: ${imageResponse.statusText}`);
    }

    res.setHeader('Cache-Control', 'public, max-age=15000, immutable'); 

    const contentType = imageResponse.headers.get('Content-Type');
    const contentLength = imageResponse.headers.get('Content-Length');
    const contentDisposition = imageResponse.headers.get('Content-Disposition');

    // Set headers only if they are not null
    if (contentType) res.setHeader('Content-Type', contentType);
    else res.setHeader('Content-Type', 'application/octet-stream'); // Default fallback if missing

    if (contentLength) res.setHeader('Content-Length', contentLength);
    if (contentDisposition) res.setHeader('Content-Disposition', contentDisposition);

    // Stream image data directly to the client
    imageResponse.body.pipe(res);
  } catch (err) {
    console.error('Error fetching image from Appwrite:', err);
    res.status(500).send('Error fetching image');
  }
}
