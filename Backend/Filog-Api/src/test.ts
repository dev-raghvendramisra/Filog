// import authService from "@services/authService";
// import dbService from "@services/dbService";
// import { readFileSync } from "fs";
// import { Client, Databases, ID, Query, Users } from "node-appwrite";
// import { InferSchemaType } from "mongoose";
// import { UserProfileSchema, UserSchema } from "@db/schema";
// import { Blog, User, UserProfile } from "@db/models";
// import axios from "axios";
// import bucketService from "@services/bucketService";
// import { uploadBlogImage } from "@controller/bucket/createFiles";
// import sharp from "sharp";

// const APPWRITE_URI = "https://cloud.appwrite.io/v1";
// const APPWRITE_PROJECT_ID = "6690300d00092f960ee8";
// const APPWRITE_API_KEY =
//   "96785d9e8de35d415e8e71e80fcc1f6d0c67f438283cbbcf1e3ac7e32c7fb8b10c5982201d2867e7a9734c1d498a78b22c1e9b6f2a3bda9870530940b64f44787e6078f58550315f0b75017b23241d80ea88e8e5547a489f59f7f2ebb93f812899d049cd79602087125df209670b607605cafe7123d0c6286cfb6a0b1e6a2009";

// // type Post = {
// //   title: string;
// //   createdAt: string;
// //   userId: string;
// //   tags: string[];
// //   coverImageId: string;
// //   subImageId: string[];
// //   coverImageUrl: string;
// //   subImageUrl: string[];
// //   status: boolean;
// //   content: string;
// //   likeCount: number;
// //   commentCount: number;
// //   slug: string;
// //   $id: string;
// //   $createdAt: string;
// //   $updatedAt: string;
// //   $permissions: string[];
// //   authorData: {
// //     userId: string;
// //     userAvatar: string;
// //     userName: string;
// //     userAvatarId: string;
// //     following: string[];
// //     followers: string[];
// //     blogsLiked: string[];
// //     isFilogVerified: boolean;
// //     priority: number;
// //     version: number;
// //     blogsWritten: number;
// //     stagedAction: string | null;
// //     fullName: string;
// //     $id: string;
// //     $createdAt: string;
// //     $updatedAt: string;
// //     $permissions: string[];
// //     $databaseId: string;
// //     $collectionId: string;
// //   };
// //   $databaseId: string;
// //   $collectionId: string;
// // };

// // export async function populateDb() {
// //   try {
// //     const client = new Client()
// //       .setEndpoint(APPWRITE_URI)
// //       .setProject(APPWRITE_PROJECT_ID)
// //       .setKey(APPWRITE_API_KEY);
// //     const auth = new Users(client);
// //     const db = new Databases(client);

// //     const profiles = (
// //       await db.listDocuments("669032750007dcf41f64", "66d39be0003c59800a72")
// //     ).documents;
// //     const users = (await auth.list()).users;
// //     const blogs = (
// //       await db.listDocuments("669032750007dcf41f64", "6690327f00341dbfdb7b")
// //     ).documents;

// //     for (const profile of profiles) {
// //       const email = users.find((user) => user.$id == profile.userId)
// //         ?.email as string;
// //       if (!email) continue;
// //       const mongoAcc = await User.create({
// //         userName: profile.userName,
// //         fullName: profile.fullName,
// //         email,
// //         password: profile.$id,
// //       });
// //       if (!mongoAcc) continue;

// //       console.log(mongoAcc);
// //       const mongoProfile = await UserProfile.create({
// //         userName: profile.userName,
// //         fullName: profile.fullName,
// //         userId: mongoAcc.id,
// //         activeness: profile.version,
// //         isFilogVerified: profile.isFilogVerified,
// //         userAvatar: profile.userAvatar,
// //         userAvatarId: profile.userAvatarId,
// //       });
// //       if (!mongoProfile) continue;
// //       console.log(mongoProfile);

// //       for (const blog of blogs) {
// //         if (blog.authorData.userName == profile.userName) {
// //           const mongoBlog = await Blog.create({
// //             title: blog.title,
// //             content: blog.title,
// //             userId: mongoAcc.id,
// //             tags: blog.tags,
// //             author: mongoProfile._id,
// //             coverImageId: blog.coverImageId,
// //             coverImageURI: blog.coverImageUrl,
// //             subImagesId: blog.subImageId,
// //             subImageURI: blog.subImageUrl,
// //             slug: blog.slug,
// //             createdAt: blog.createdAt,
// //             permissions: blog.$permissions,
// //             status: blog.status,
// //             likeCount: blog.likeCount,
// //           });

// //           if (!mongoBlog) continue;
// //           console.log(mongoBlog);
// //         }
// //       }
// //     }

// //     //
// //   } catch (err) {
// //     console.error(err);
// //   }
// // }

// // export async function populateBucket(){
// //     try {
// //         const client = new Client()
// //       .setEndpoint(APPWRITE_URI)
// //       .setProject(APPWRITE_PROJECT_ID)
// //       .setKey(APPWRITE_API_KEY);
// //           const db = new Databases(client);
// //       const blogs = 
// //           await db.listDocuments("669032750007dcf41f64", "6690327f00341dbfdb7b",[Query
// //             .limit(40)
// //           ])
// //           ;
// //       for (let blog of blogs.documents){
// //         const res = await axios.get(`https://cloud.appwrite.io/v1/storage/buckets/6690398b001dde7591a4/files/${(blog as any).coverImageId}/view?project=6690300d00092f960ee8`,{responseType:"arraybuffer"})
// //         const image = Buffer.from(res.data,"binary")
// //         const mongoUser = await dbService.getUserProfiles({filters:{userName:{$eq:(blog as any).authorData.userName as string}}})
// //         if(mongoUser.code!==200){
// //             continue
// //         }
// //         if(mongoUser.res!==null){
// //             const webpImage = await sharp(image).toFormat("webp").webp({quality:50}).toBuffer()
// //             const uplaodedImage = await bucketService.uploadImage(webpImage,mongoUser.res[0]?.userId as string,"blog")
// //             if(uplaodedImage.code!==200){
// //                 continue
// //             }
// //             const mongoBlog = await dbService.getBlogs({filters:{slug:{$eq:blog.slug as string}}})
// //             if(mongoBlog.res!==null){
// //                 const updateMongoBlog = await dbService.updateBlog({_blogId : mongoBlog.res[0].id as string,updatedFields:{
// //                     coverImageURI:uplaodedImage.res?.imageURI as string,
// //                     coverImageId:uplaodedImage.res?.imageId as string,
// //                 }})
// //                 if(updateMongoBlog.code==200){
// //                     console.log(`${mongoBlog.res[0].title} \nUPDATED\n`)
// //                 }
// //                 else console.log(`${mongoBlog.res[0].title} \nFAILED\n`)
// //             }
// //         }
        
// //       }
// //     } catch (error) {
// //         console.log("An error occured",error)
// //     }
// // }
