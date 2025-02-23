import dbService from "@services/dbService";
import { AuthenticatedRequest, UpdateBlogBody, UpdateProfileBody, UserDataInCookie } from "@type/request/body";
import { NextFunction, Response } from "express";

export async function ownershipValidator(req:AuthenticatedRequest<{},{},UpdateBlogBody | UpdateProfileBody>,res:Response,next:NextFunction){
    const {_id:userId} = req.userData as UserDataInCookie
    let doc;

    // Check if the userId in the document and the user's _id in cookie are present in a document
    if("_profileId" in req.body) doc =  await dbService.getUserProfiles({filters:{userId,_id:req.body._profileId}})
    
    else doc = await dbService.getBlogs({filters:{userId,_id:req.body._blogId}})

    if(doc.code==500){res.status(doc.code).send(doc);return}

    // 0 document means that userId in the document does'nt matches the user's  _id in the cookie
    if(!doc.res?.length){res.status(403).send({res:null,message:"Request to update the decument is forbidden",code:403});return}

    next()   
}