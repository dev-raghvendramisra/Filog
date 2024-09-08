import { Client, Databases } from 'node-appwrite';
import conf from '../conf/conf.js';
import { getBlogMetatags } from '../utils/index.js';

export default async function handleBlogTagsReq(req, res) {
  const { id } = req.query;
  console.log('Metatags API - BlogID:', id); 

  const blogData = {
    imgUrl: null,
    title: null,
    siteUrl: null,
  };

  if (id) {
    const client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId)
      .setKey(conf.appwriteApiKey);

    const database = new Databases(client);

    try {
      console.log('Fetching blog data...');
      const blog = await database.getDocument(
        conf.appwriteDbId,
        conf.appwriteBlogCollectionId,
        id
      );

      if (blog.$id) {
        blogData.imgUrl = blog['coverImageUrl'];
        blogData.title = blog['title'];
        blogData.siteUrl = `https://fiilog.vercel.app/blog/${id}`;

        const newBody = await getBlogMetatags(blogData);

        if (newBody) {
          res.setHeader('Content-Type', 'text/html');
          res.status(200).send(newBody);
          console.log('Blog Data found. Body generation successful. New body sent:', newBody);
        } else {
          res.setHeader('Content-Type', 'text/html');
          res.status(200).send(conf.defaultBody);
          console.log('Blog Data found. Body generation failed. Default body sent:', conf.defaultBody);
        }
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(conf.defaultBody);
        console.log('Blog Data not found. Default body sent:', conf.defaultBody);
      }
    } catch (error) {
      console.log('Error fetching blog data:', error);
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(conf.defaultBody);
    }
  }
}
