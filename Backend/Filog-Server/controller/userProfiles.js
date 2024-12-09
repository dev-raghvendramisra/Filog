const { appwriteDBService } = require('../appwrite-services/appwriteDbService');
const getUserMetaTags = require('../utils/getUserMetaTags');
const { conf } = require('../config/conf');
const constants = require('../config/constants');


module.exports = async function (req, res) {
    try {

        const username = req.params.id;
        const profile = await appwriteDBService.getProfile(username);
        if (profile) {
            const tagsData = {
                imgUrl: profile['userAvatar'],
                title: profile['fullName'],
                description: `Followers: ${profile['followers'].length} | Following: ${profile['following'].length} | Blogs: ${profile['blogsWritten']}`,
                siteUrl: `${conf.FRONTEND_ENDPOINT}/blog/@${username}`
            }
            const body = getUserMetaTags(tagsData);
            res.status(200).send(body);
        }
        else res.sendFile(constants.DEFAULT_HTML_FILE);
    } catch (error) {
        console.log(error)
        res.sendFile(constants.DEFAULT_HTML_FILE);
    }
}
