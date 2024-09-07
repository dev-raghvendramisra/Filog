export default function handleBlogTagsReq(req, res) {
    const { id } = req.query;
    console.log('Metatags API - ID:', id); // Log the ID for debugging
    res.status(200).json({ message: `This is the blog post with ID: ${id}` });
  }
  