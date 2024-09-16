import conf from "../conf/conf.js";
import dbServices from "../services/dbService.js";
import {getProfileMetatags} from "../utils/index.js";

export default async function handleUserProfileTagsReq(req, res) {
    const id = req.query.id;
    const maxIdLength = 20;
    console.log('Metatags API - ProfileID:', id);

    if (id.length !== maxIdLength) {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(conf.defaultBody);
        console.log('Profile ID length is not 20. Default body sent:', conf.defaultBody);
        return;
    }
    const profileData = {
        imgUrl: null,
        title: null,
        description: null,
        siteUrl: null,
    };

    console.log('Fetching profile data...');
    const profile = await dbServices.getProfile(id);
    if(profile.userId){
        profileData.imgUrl = profile['userAvatar'];
        profileData.title = profile['userName'];
        profileData.description = `Followers: ${profile['followers'].length} | Following: ${profile['following'].length} | Blogs: ${profile['blogsWritten']}`;
        profileData.siteUrl = `https://fiilog.vercel.app/user/${id}`;

        const newBody = await getProfileMetatags(profileData);

        if (newBody) {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(newBody);
            console.log('Profile Data found. Body generation successful. New body sent:', newBody);
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(conf.defaultBody);
            console.log('Profile Data found. Body generation failed. Default body sent:', conf.defaultBody);
        }
    }
    else {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(conf.defaultBody);
        console.log('Profile Data not found. Default body sent:', conf.defaultBody);
    }
}