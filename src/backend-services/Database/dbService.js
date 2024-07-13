import { Client, ID, Databases, Storage } from "appwrite";
import conf from "../../Conf/conf";

export class DatabaseService {
    client = new Client()
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.projectId);
    database;

    storageBucket;
    constructor() {
        this.database = new Databases(this.client);
        this.storageBucket = new Storage(this.client);
    }

    async createBlog({
        title,
        content,
        coverImageId,
        subImagesId = [],
        userId,
        status = true,
    }) {
        try {
            const res = await this.database.createDocument(
                conf.dbId,
                conf.collectionId,
                ID.unique(),
                title,
                content,
                coverImageId,
                subImagesId,
                userId,
                createdAt(),
                status
            );

            if (res.ok) {
                return res;
            } else
                throw { err: "dbService error :: failed to create document", res: res };
        } catch (error) {
            console.log("dbService error :: failed to create document", error);
            return error;
        }
    }

    async uploadImage(coverImage, subImages = []) {
        const imageIds = {};
        try {
            const { $id } = await this.storageBucket.createFile(
                conf.bucketId,
                ID.unique(),
                coverImage
            );
            imageIds.$id = $id;

            if (subImages.length !== 0) {
                const subImagesId = await Promise.all(
                    subImages.map(async (image) => {
                        return await this.storageBucket.createFile(
                            conf.bucketId,
                            ID.unique(),
                            image
                        );
                    })
                );
                imageIds.subImagesId = subImagesId;
                return imageIds;
            }
        } catch (error) {
            console.log("error in dbService :: imageUpload error: ", error);
            return { err: "error in dbService :: imageUpload error: ", error };
        }
    }
}

function createdAt() {
    const crrDate = new Date();
    let formattedDate = crrDate.toDateString();
    formattedDate = formattedDate.substring(
        formattedDate.indexOf(" ") + 1,
        formattedDate.length
    );
    let time = crrDate.toTimeString();
    time = time.substring(0, time.lastIndexOf(":"));
    if (time.substring(0, 1) <= 11) {
        time += " AM";
    } else {
        time += " PM";
    }

    formattedDate += " " + time;
    return formattedDate;
}

const dbServices = new DatabaseService();
export default dbServices;
