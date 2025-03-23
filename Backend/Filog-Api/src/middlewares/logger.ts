import { accessLogger } from "@lib";
import { NextFunction, Request, Response } from "express";

/**
 * Middleware to log incoming requests and their response times.
 * Logs are written to a file using Winston.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
export default function logger(req : Request, res: Response, next:NextFunction) {
    const clientIP = req.headers['x-forwarded-for'] || req.ip;
    const start = Date.now();
    res.setHeader('X-Powered-By', 'Filog-Express');
    res.on('finish', () => {
        const log = ` ${Date.now() - start}ms ${req.method} ${req.url} ${res.statusCode} ${clientIP} [${JSON.stringify(req.body || {})}] `;
        accessLogger.info(log);
    });

    next();
};
