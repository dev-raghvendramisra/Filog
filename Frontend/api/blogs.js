import getBlogMetaTags from "./meta-tags/getBlogMetaTags.js";
import conf from "./config/conf.js";
import dbService from "./services/dbService.js"
import getDefaultHtml from "./utils/getDefaultMetaTags.js";

export default async function handler(req,res) {
    try {
         const slug = req.query.blogId;
         const blog = await dbService.getBlog(slug);
         if(blog){
            const tagsData = {
              imgUrl: blog['coverImageURI'],
              title: blog['title'],
              siteUrl: `${conf.FRONTEND_ENDPOINT}/blog/${slug}`
            }
             const body = getBlogMetaTags(tagsData);
             res.setHeader('Cache-Control', 'public, max-age=15000, immutable')
             res.status(200).send(body);
         }
         else res.send(getDefaultHtml());
        
     } catch (error) {
         
         res.send(getDefaultHtml());
     }
}