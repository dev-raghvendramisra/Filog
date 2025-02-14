import { accessLogger } from "@lib";
import { NextFunction, Request, Response } from "express";


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
