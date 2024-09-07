export default async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing blog ID" });
  }

  const metaTags = await getBlogMetaTags(id); // Fetch meta tags logic
  if (!metaTags) {
    return res.status(404).json({ error: "Meta tags not found" });
  }

  return res.status(200).json(metaTags);
};
