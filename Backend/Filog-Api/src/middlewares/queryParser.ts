import { envLogger as logger } from "@lib";
import { QueryRequest, dbQuerySchema } from "@type/request/query";
import { NextFunction, Response } from "express";

/**
 * Middleware to parse and validate query parameters.
 * Attaches the parsed query to the request object.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export default async function queryParser(req:QueryRequest,res:Response,next:NextFunction){
    try {
        const queryObj = JSON.parse(decodeURIComponent(req.query.query as string))
        await dbQuerySchema.parseAsync(queryObj);
        console.log(queryObj)
        req.dbQuery = queryObj
        next()
    } catch (error:any) {
        logger.info(`ERR_WHILE_PARSING_QUERY ${error}`)
        res.status(400).send({code:400,message:"Invalid query params",res:error.name=="ZodError" ? error.issues : null})
    }
}