import conf from "./config/conf.js";
import getProfileMetaTags from "./meta-tags/getProfileMetaTags.js";
export default async function handler(req, res) {
    try {

        const username = req.query.userId;
        const profile = await appwriteDBService.getProfile(username);
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
        else res.sendFile(constants.DEFAULT_HTML_FILE);
    } catch (error) {
        console.log(error)
        res.sendFile(constants.DEFAULT_HTML_FILE);
    }
}