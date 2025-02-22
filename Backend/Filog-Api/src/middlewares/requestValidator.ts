import { ROUTE_MAP } from "config/constants";
import { NextFunction, Request, Response } from "express";
import { ROUTES } from "config/constants";

export default async function requestValidator(req : Request,res: Response,next:NextFunction){
   const route = req.originalUrl as keyof typeof ROUTES
   try {
    await ROUTE_MAP[route].BODY_SCHEMA.parseAsync(req.body)
    next()
   } catch (error : any) {
      res.status(400)
      if(JSON.stringify(error).includes("unrecognized_keys")) {res.send({code:400,res:null,message:"Invalid request body"});return}
      res.send({code:400,res:null,message:ROUTE_MAP[route].ERROR_MESSAGE})
   }
}