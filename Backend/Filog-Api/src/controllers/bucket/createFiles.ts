import { Response } from "express";
import sharp from "sharp";
import { AuthenticatedRequest } from "@type/request/body";
import { envLogger as logger } from "@lib";
import bucketService from "@services/bucketService";
import dbService from "@services/dbService";

export async function uploadBlogImage(req:AuthenticatedRequest,res:Response){
try {
    if (!req.file) {
       res.status(400).send({ code:400, message:"No image provided to upload", res:null });
       return;
    }
    const webpBuffer = await sharp(req.file.buffer).toFormat("webp").webp({quality:50}).toBuffer()
    const uploadedImage = await bucketService.uploadImage(webpBuffer,req.userData?._id as string,"blog")
    res.status(uploadedImage.code).send(uploadedImage)
} catch (error) {
    logger.error(`ERR_UPLOADING_IMAGE ${error}`)
    res.status(500).send({code:500,message:"Internal server error",res:null})
}
}

export async function uploadAvatar(req:AuthenticatedRequest, res:Response){
    if (!req.file) {
        res.status(400).send({ code:400, message:"No image provided to upload", res:null });
        return;
     }
     const webpBuffer = await sharp(req.file.buffer).toFormat("webp").webp({quality:50}).toBuffer()
     const uploadedAvatar = await bucketService.uploadImage(webpBuffer,req.userData?._id as string,"avatar")
     res.status(uploadedAvatar.code).send(uploadedAvatar)
     if(uploadedAvatar.code==200){
        const oldProfile = await dbService.updateProfile({_userId:req.userData?._id as string,updatedFields:{
            userAvatar:uploadedAvatar.res?.imageURI,
            userAvatarId:uploadedAvatar.res?.imageId
        }},false)
        await bucketService.deleteImage(oldProfile.res?.userAvatarId as string)
     }
}