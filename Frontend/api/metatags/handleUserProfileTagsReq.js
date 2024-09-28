// Description:  Metatags API for user profiles. This API is used to generate metatags for user profiles.
// It receives a request with a profile ID and generates metatags for the user profile with that ID.
// It uses the getProfileMetatags function from the utils folder to generate the metatags.
// It returns the generated metatags in the response body.

import conf from "../conf/conf.js";
import dbServices from "../services/dbService.js";
import {getProfileMetatags} from "../utils/index.js";

export default async function handleUserProfileTagsReq(req, res) {
    const id = req.query.username;
    console.log('Metatags API - Username:', username);

    const profileData = {
        imgUrl: null,
        title: null,
        description: null,
        siteUrl: null,
    };

    console.log('Fetching profile data...');
    const profile = await dbServices.getProfile(username);
    if(profile.userId){
        profileData.imgUrl = profile['userAvatar'];
        profileData.title = profile['fullName'];
        profileData.description = `Followers: ${profile['followers'].length} | Following: ${profile['following'].length} | Blogs: ${profile['blogsWritten']}`;
        profileData.siteUrl = `https://filog.in/user/${username}`;

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