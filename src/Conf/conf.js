
const conf = {
   appWriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
   projectId:String(import.meta.env.VITE_PROJECT_ID),
   dbId:String(import.meta.env.VITE_DATABASE_ID),
   collectionId:String(import.meta.env.VITE_COLLECTION_ID),
   bucketId:String(import.meta.env.VITE_BUCKET_ID)
}

export default conf;