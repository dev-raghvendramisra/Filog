const { appwriteDBService } = require("../../appwrite-services")
const {pdfGenerator, envLogger :logger} = require("../../libs");
const {setContentHeaders} = require("../../utils");

module.exports = async function(req,res){
    try {
      const data = await appwriteDBService.listUserProfiles();
      if(data.length){
        setContentHeaders(res, 'user-profile-list', 'pdf')
        const pdf = await pdfGenerator(data, 'user-profile-list.pdf', undefined,undefined, {title : "User Profile List"},res);
      }
        else{
            res.status(404).send("No user profiles found");
            logger.error(`No user profiles found`);
        }
    } catch (error) {
        res.status(500).send("Failed to generate PDF");
        logger.error(`Failed to generate PDF ${error}`);
    }
}