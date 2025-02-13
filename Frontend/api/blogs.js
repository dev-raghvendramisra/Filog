import getBlogMetaTags from "./meta-tags/getBlogMetaTags.js";
import conf from "./config/conf.js";
import dbService from "./appwrite/dbService.js"

export default async function handler(req,res) {
    try {
         const slug = req.query.blogId;
         const blog = await dbService.getBlog(slug);
         if(blog){
            const tagsData = {
              imgUrl: blog['coverImageUrl'],
              title: blog['title'],
              siteUrl: `${conf.FRONTEND_ENDPOINT}/blog/${slug}`
            }
             const body = getBlogMetaTags(tagsData);
             res.status(200).send(body);
         }
         else res.send(conf.DEFAULT_HTML_FILE);
        
     } catch (error) {
         console.log(error)
         res.send(conf.DEFAULT_HTML_FILE);
     }
}