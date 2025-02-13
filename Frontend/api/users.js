import conf from "./config/conf.js";
import getProfileMetaTags from "./meta-tags/getProfileMetaTags.js";
import dbService from "./appwrite/dbService.js"
import getDefaultHtml from "./utils/getDefaultMetaTags.js";

export default async function handler(req, res) {
    try {

        let username = req.query.userId;
        if(username.includes('@')) username = username.split('@')[1];
        else throw false
        const profile = await dbService.getProfile(username);
        if (profile) {
            const tagsData = {
                imgUrl: profile['userAvatar'],
                title: profile['fullName'],
                description: `Followers: ${profile['followers'].length} | Following: ${profile['following'].length} | Blogs: ${profile['blogsWritten']}`,
                siteUrl: `${conf.FRONTEND_ENDPOINT}/blog/@${username}`
            }
            const body = getProfileMetaTags(tagsData);
            res.setHeader('Cache-Control', 'public, max-age=15000, immutable')
            res.status(200).send(body);
        }
        else res.send(getDefaultHtml());
    } catch (error) {
        console.log(error)
        res.send(getDefaultHtml());
    }
}