import fetch from 'node-fetch'; 
import conf from '../conf/conf.js';

export default async function handler(req, res) {
  try {

    const imageUrl = `${conf.bucketURI}${req.url}`;

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image from AWS: ${imageResponse.statusText}`);
    }
   
    res.setHeader('Cache-Control', 'public, max-age=15000, immutable'); 
    res.setHeader('Content-Type', imageResponse.headers.get('Content-Type'));
    res.setHeader('Content-Length', imageResponse.headers.get('Content-Length'));
    res.setHeader('Content-Disposition', imageResponse.headers.get('Content-Disposition'));

    // Extract headers safely
    const contentType = imageResponse.headers.get('Content-Type') || 'application/octet-stream';
    const contentLength = imageResponse.headers.get('Content-Length');
    const contentDisposition = imageResponse.headers.get('Content-Disposition');

    // Set response headers
    res.setHeader('Cache-Control', 'public, max-age=15000, immutable');
    res.setHeader('Content-Type', contentType);
    if (contentLength) res.setHeader('Content-Length', contentLength);
    if (contentDisposition) res.setHeader('Content-Disposition', contentDisposition);
    // Stream image data directly to the client
    imageResponse.body.pipe(res);
  } catch (err) {
    console.error('Error fetching image from AWS:', err);
    res.status(500).send('Error fetching image');
  }
}
