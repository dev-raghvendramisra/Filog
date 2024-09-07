export default function handler(req, res) {
    // Get the `id` from the request query parameters
    const { id } = req.query;
  
    // Logic to generate meta tags for the specific blog post
    if (id) {
      // Replace with actual logic to fetch data based on `id`
      const metaTags = {
        title: `Blog Post ${id}`,
        description: `This is the description for blog post with id ${id}`,
        url: `https://your-domain.com/blog/${id}`,
      };
  
      // Return the meta tags in the response
      res.status(200).json(metaTags);
    } else {
      res.status(400).json({ error: "Blog ID not provided" });
    }
  }
  