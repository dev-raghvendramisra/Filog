const { appwriteDBService } = require("../../appwrite-services")
const {pdfGenerator, envLogger :logger} = require("../../libs");
const setContentHeaders = require("../../utils/setContentHeaders");

module.exports = async function(req,res){
    try {
      const data = await appwriteDBService.listUsers();
      if(data.length){
        setContentHeaders(res, 'users', 'pdf')
        const pdf = await pdfGenerator(data, 'users.pdf', undefined,undefined, {title : "Users List"},res);
        logger.info(`PDF generated successfully`);
      }
        else{
            res.status(404).send("No users found");
            logger.error(`No users found`);
        }
    } catch (error) {
        res.status(500).send("Failed to generate PDF");
        logger.error(`Failed to generate PDF ${error}`);
    }
}