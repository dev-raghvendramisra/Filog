// api/metatags/[id].js

export default async function handler(req, res) {
    const { id } = req.query; // Extract the dynamic `id` from the query
  
    try {
      // Your logic to handle the request based on the `id`
      res.status(200).json({ message: `Metatags for ID ${id}` });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  