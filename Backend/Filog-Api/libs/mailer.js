const { conf } = require('../config/conf');
const {constants} = require('../config/constants');
const { getMailContent } = require('../utils/mailContent');
const nodemailer = require('nodemailer')
const logger = require('./winstonLogger').envLogger;

module.exports = async function (emailType,mailData){
   try {
     if(!Object.keys(constants.EMAIL_TYPES).includes(emailType)){
        return {ok:false,res:"Invalid Email Type",code:400}
     }

     const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "filogteam@gmail.com",
            pass:conf.SERVICE_EMAIL_PASSWORD
        }
    })
    const mailOptions = {
        from:`Filog Team <${conf.SERVICE_EMAIL}>`,
        to: mailData.recipient,
        subject: constants.EMAIL_TYPES[emailType].SUBJECT,
        html: getMailContent(emailType,mailData.embeddedUrl),
    };

    const result =  await transporter.sendMail(mailOptions);
    return {ok:true,res:result};
         
   } catch (error) {
         logger.error("Error sending email:",error.message)
         return {ok:false,res}
   }
}

