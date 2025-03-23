import { envLogger } from "@lib";
import { genSalt, hash } from "bcrypt";
import { CallbackError, CallbackWithoutResultAndOptionalError, Document } from "mongoose";

interface IUser extends Document
    {userName:string,password:string,fullName:string,emailVerification:boolean,email:string}

export async function hashPassword(this :IUser ,next : CallbackWithoutResultAndOptionalError){
    if(!this.isModified("password")){
        return next()
    }
    try {
        const salt = await genSalt(10);
        this.password = await hash(this.password,salt)
    } catch (error) {
       envLogger.error(`ERR_OCCURED_WHILE_HASHING_PASS ${JSON.stringify(error,null,2)}`)
       next(error as CallbackError)
    }
} 