const { appwriteDBService } = require('../appwrite-services/appwriteDbService');
const getBlogMetaTags = require('../utils/getBlogMetaTags');
const { conf } = require('../config/conf');
const constants = require('../config/constants');


module.exports = async function (req, res) {
    try {
        const id = req.params.id;
        const blog = await appwriteDBService.getBlog(id);
        if (res) {
            const tagsData = {
                imgUrl: blog['coverImageUrl'],
                title: blog['title'],
                siteUrl: `${conf.FRONTEND_ENDPOINT}/blog/${res.$id}`
            }
            const body = getBlogMetaTags(tagsData);
            res.status(200).send(body);
        }
        else res.sendfile(constants.DEFAULT_HTML_FILE);

    } catch (error) {
        console.log(error)
        res.sendFile(constants.DEFAULT_HTML_FILE);

    }
}

