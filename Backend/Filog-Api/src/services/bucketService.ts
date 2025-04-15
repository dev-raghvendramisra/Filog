import conf from "config/conf"
import { envLogger as logger } from "@lib"
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { Types } from "mongoose"

class BucketService{
  _s3Client = new S3Client({region:conf.AWS_REGION})
  
  async uploadImage(imageBuffer:Buffer,ownerId:string,dir:"avatar"|"blog"){
    try {
      const imageId = `${dir}/${new Types.ObjectId().toString()}`
      await this._s3Client.send(new PutObjectCommand({
        Bucket:conf.AWS_S3_BUCKET_NAME,
        Key:imageId,
        Body:imageBuffer,
        ContentType:"image/webp",
        Metadata:{
          ownerId
        }
      }))
      return {code:200,message:"Image uploaded",res:{
        imageId,
        imageURI:conf.CDN_ENDPOINT+imageId
      }}
    } catch (error) {
      logger.error(`ERR_OCCURED_WHILE_UPLOADING_IMAGE_IN_BUCKET_SERVICE :${error}`)
      return {code:500,message:"Internal server error",res:null}
    }
  }

  async deleteImage(key:string){
    try {
       await this._s3Client.send(new DeleteObjectCommand(
        {
          Key:key,
          Bucket:conf.AWS_S3_BUCKET_NAME
        }
      ))
      return {code:200,message:"Image deleted",res:null}
    } catch (error) {
      logger.error(`ERR_OCCURED_WHILE_DELETING_IMAGE_IN_BUCKET_SERVICE :${error}`)
      return {code:500,message:"Internal server error",res:null}
    }
  }
}

const bucketService = new BucketService()
export default bucketService
