import conf from "./config/conf.js";
import getProfileMetaTags from "./meta-tags/getProfileMetaTags.js";
import dbService from "./appwrite/dbService.js"

export default async function handler(req, res) {
    try {

        const username = req.query.userId;
        const profile = await dbService.getProfile(username);
        if (profile) {
            const tagsData = {
                imgUrl: profile['userAvatar'],
                title: profile['fullName'],
                description: `Followers: ${profile['followers'].length} | Following: ${profile['following'].length} | Blogs: ${profile['blogsWritten']}`,
                siteUrl: `${conf.FRONTEND_ENDPOINT}/blog/@${username}`
            }
            const body = getProfileMetaTags(tagsData);
            res.status(200).send(body);
        }
        else res.send(constants.DEFAULT_HTML_FILE);
    } catch (error) {
        console.log(error)
        res.send(constants.DEFAULT_HTML_FILE);
    }
}