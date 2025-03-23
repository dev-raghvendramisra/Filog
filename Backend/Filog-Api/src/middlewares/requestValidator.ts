import { ROUTE_MAP } from "config/constants";
import { NextFunction, Request, Response } from "express";
import { ROUTES } from "config/constants";

/**
 * Middleware to validate the request body against a predefined schema.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export default async function requestValidator(req : Request,res: Response,next:NextFunction){

   const route = `${req.method} ${req.baseUrl}${req.route.path}` as  typeof ROUTES[number]
   try {
    await ROUTE_MAP[route].BODY_SCHEMA.parseAsync(req.body)
    next()
   } catch (error : any) {
      res.status(400)
      if(JSON.stringify(error).includes("unrecognized_keys")) {res.send({code:400,res:null,message:"Invalid request body"});return}
      res.send({code:400,message:ROUTE_MAP[route].ERROR_MESSAGE,res:null})
   }
}