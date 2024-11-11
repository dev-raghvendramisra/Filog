import { Client, Storage } from 'node-appwrite';
import conf from '../conf/conf.js';

// Initialize Appwrite client and storage service
const client = new Client();
client.setEndpoint(conf.appwriteUrl).setProject(conf.projectId);

const storage = new Storage(client);

export default async function handler(req, res) {
  const { imageId } = req.query;

  try {
    // Get the file from Appwrite storage using the imageId
    const file = await storage.getFile(conf.bucketId, imageId);
    // Fetch the file as a buffer
    const fileBuffer = file.buffer;

    // Set Cache-Control headers for 1 month (30 days)
    res.setHeader('Cache-Control', 'public, max-age=2592000, immutable'); // 30 days in seconds
    res.setHeader('Content-Type', file.mimeType); // Use the correct MIME type based on the file
    res.send(fileBuffer); // Send the image data as the response
  } catch (err) {
    console.error('Error fetching image from Appwrite', err);
    res.status(500).send('Error fetching image');
  }
}
