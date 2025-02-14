import { ROUTE_MAP } from "config/constants";
import { NextFunction, Request, Response } from "express";
import { ROUTES } from "config/constants";

export default async function validateBody(req : Request,res: Response,next:NextFunction){
   const route = req.originalUrl as keyof typeof ROUTES
   try {
    const result = await ROUTE_MAP[route].BODY_SCHEMA.parseAsync(req.body)
    next()
   } catch (error) {
      console.log(error)
    res.status(400).send({message:ROUTE_MAP[route].ERROR_MESSAGE})
   }
}