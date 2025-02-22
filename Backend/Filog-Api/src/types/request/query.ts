import { Request } from "express"
import {z} from "zod"

export const dbQuerySchema = z.object({
    limit:z.number().optional(),
    skip:z.number().optional(),
    sort:z.object({}).optional(),
    filters:z.object({}),
}).strict()

export interface QueryRequest extends Request{
    dbQuery?:DBQuery
}

export type DBQuery = z.infer<typeof dbQuerySchema>