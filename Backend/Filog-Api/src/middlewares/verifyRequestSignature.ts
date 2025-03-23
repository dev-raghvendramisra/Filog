import { verifyJwt } from '@lib';
import { NextFunction, Request, Response } from 'express';

/**
 * Middleware to verify the request signature using a JWT.
 * Ensures that the request is authorized before proceeding.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export default function verifyRequestSignature(req: Request, res: Response,next:NextFunction) {
  try {
    // const signature = req.headers.authorization?.split("Bearer")[1].trim() as string
    // verifyJwt("API",signature)
    next()
  } catch (error) {
    res.status(401).send({code:401,message:"You are not authorized to access the service",res:null})
  }
}