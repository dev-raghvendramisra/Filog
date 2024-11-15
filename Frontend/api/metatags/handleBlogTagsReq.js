// Description: Metatags API for blog posts. This API is used to generate metatags for blog posts.
// It receives a request with a blog ID and generates metatags for the blog post with that ID.
// It uses the getBlogMetatags function from the utils folder to generate the metatags.
// It returns the generated metatags in the response body.

import conf from '../conf/conf.js';
import { getBlogMetatags } from '../utils/index.js';
import dbServices from '../services/dbService.js';

export default async function handleBlogTagsReq(req, res) {
  const { id } = req.query;
  const maxIdLength = 20;
  console.log('Metatags API - BlogID:', id);

  if (id.length !== maxIdLength) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(conf.defaultBody);
    console.log('Blog ID length is not 20. Default body sent:', conf.defaultBody);
    return;
  }

  const blogData = {
    imgUrl: null,
    title: null,
    siteUrl: null,
  };


  console.log('Fetching blog data...');
  const blog = await dbServices.getBlog(id);

  if (blog.$id) {
    blogData.imgUrl = blog['coverImageUrl'];
    blogData.title = blog['title'];
    blogData.siteUrl = `https://filog.in/blog/${id}`;

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
  }
  else {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(conf.defaultBody);
    console.log('Blog Data not found. Default body sent:', conf.defaultBody);
  }
}


