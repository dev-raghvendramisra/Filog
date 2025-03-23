import { Request } from "express"
import {z} from "zod"

/**
 * Zod schema for validating database query parameters.
 */
export const dbQuerySchema = z.object({
    limit:z.number().optional(),
    skip:z.number().optional(),
    sort:z.object({}).optional(),
    filters:z.object({}),
}).strict()

/**
 * Extended Express Request interface to include a parsed database query.
 */
export interface QueryRequest extends Request{
    dbQuery?:DBQuery
}

/**
 * Type definition for the parsed database query.
 */
export type DBQuery = z.infer<typeof dbQuerySchema>