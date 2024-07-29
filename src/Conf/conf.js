
const conf = {
   appWriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
   projectId:String(import.meta.env.VITE_PROJECT_ID),
   dbId:String(import.meta.env.VITE_DATABASE_ID),
   blogCollectionID:String(import.meta.env.VITE_BLOG_COLLECTION_ID),
   userProfilesCollectionID:String(import.meta.env.VITE_USERPROFILE_COLLECTION_ID),
   bucketId:String(import.meta.env.VITE_BUCKET_ID)
}

export const colorConf = [
   {
     tag: "Technology",
     color: "#1E90FF"
   },
   {
     tag: "Health",
     color: "#32CD32"
   },
   {
     tag: "Lifestyle",
     color: "#FF69B4"
   },
   {
     tag: "Travel",
     color: "#FF4500"
   },
   {
     tag: "Food",
     color: "#FFD700"
   },
   {
     tag: "Education",
     color: "#8A2BE2"
   },
   {
     tag: "Finance",
     color: "#2E8B57"
   },
   {
     tag: "Entertainment",
     color: "#FF6347"
   },
   {
     tag: "Fashion",
     color: "#FFC0CB"
   },
   {
     tag: "Sports",
     color: "#4682B4"
   },
   {
     tag: "Science",
     color: "#7FFF00"
   },
   {
     tag: "Politics",
     color: "#DC143C"
   }
 ];
 

 

export default conf;