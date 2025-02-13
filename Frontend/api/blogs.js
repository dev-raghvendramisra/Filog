import getBlogMetaTags from "./meta-tags/getBlogMetaTags.js";
import conf from "./config/conf.js";

export default async function handler(req,res) {
    try {
         const slug = req.query.blogId;
         const blog = await appwriteDBService.getBlog(slug);
         if(blog){
            const tagsData = {
              imgUrl: blog['coverImageUrl'],
              title: blog['title'],
              siteUrl: `${conf.FRONTEND_ENDPOINT}/blog/${slug}`
            }
             const body = getBlogMetaTags(tagsData);
             res.status(200).send(body);
         }
         else res.sendfile(conf.DEFAULT_HTML_FILE);
        
     } catch (error) {
         console.log(error)
         res.sendFile(conf.DEFAULT_HTML_FILE);
     }
}