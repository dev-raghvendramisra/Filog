const { appwriteDBService } = require("../../appwrite-services");
const { pdfGenerator, envLogger : logger } = require("../../libs");
const { setContentHeaders } = require("../../utils");

module.exports = async function(req,res){
    try {
        const data = await appwriteDBService.listBlogs();
        if(data.length){
            setContentHeaders(res, 'blog-list', 'pdf');
            const pdf = await pdfGenerator(data, 'blog-list.pdf', undefined,undefined, {title : "Blog List"},res);
        }
        else{
            res.status(404).send("No blogs found");
            logger.error(`No blogs found`);
        }
    } catch (error) {
        res.status(500).send("Failed to generate PDF");
        logger.error(`Failed to generate PDF ${error}`);
    }
}