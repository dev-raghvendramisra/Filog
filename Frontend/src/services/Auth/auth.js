import { Client,ID,Account } from "appwrite";
import conf from "../../conf/conf";
import {dbServices} from "../../services"

export class Auth{
      
    client = new Client()
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.projectId)
    account;

    constructor(){
         this.account = new Account(this.client)
    }

    async createAccount({id=ID.unique(),email,password,name,prefs={}}){
         try {
            
            const createdAccount =  await this.account.create(id,email,password,name)
            if(createdAccount){
                const res = await this.login(email,password);
                if(res.code!=401 || res.code!==429){
                       const dbRes = await dbServices.createProfileDocument({userName:name,
                        userAvatar:prefs.avatarUrl,
                        userId:id,
                        version:1
                        },id)
                       return dbRes
                    }
                return res;
            }
            else{
                throw {err:"failed to create account: ", createdAccount:createdAccount}
            }

         } catch (error) {
             console.log("auth service error :: account creation error: " ,error)
             return error

         }
    }

    async login(email,password){
        try {
        console.log("calling-auth");
           const res =  await this.account.createEmailPasswordSession(email,password);
                if(res.$id){
            return res;
           }
           else {
            throw {err:"auth service error :: failed to  logIn user: ",res:res}
           }

        } catch (error) {
            console.log("auth service error :: account login error:", error)
            return error
        }
    }
    async logout(){
        const result  = await this.account.deleteSession("current");
        localStorage.removeItem("cookieFallback")
        localStorage.removeItem("authObj")
        
        return result;
    }

    async getLoggedInUser(){
        try {
            const res = await this.account.get()
            
             if(res.code!==401){
                return res;
            }
            else{
                throw {err:"auth service error :: failed to retreive loggedIn user: ",res:res}
            }
        } catch (error) {
            return error
        }
       

    }
    
    async updatePreferences(prefs){
        try {
            const updatedPrefs = await this.account.updatePrefs(prefs)
            if(updatedPrefs.code!==401 && updatedPrefs.code!==500){
             return updatedPrefs;
            }
            else{
                throw {err:"failed to update prefs: ",res:updatedPrefs}
            }

        } catch (error) {
            console.log("auth service error :: failed to update prefs ",error)
            return error
        }
    }

    async verifyEmail(userId,secret){
        try {        
            const res = await this.account.updateVerification(userId, secret)
             return res;
        } catch (error) {
            console.log("auth service error :: failed to verify email: ",error)
            return error
        }

    }
    async createEmailVerification(){
      try{
        const res = await this.account.createVerification(conf.emailVerificationEndpoint)
        return res
      }catch(error){
        console.log("auth service error :: failed to create email verification: ",error)
        return error;
      }
    }

}

 const authServices = new Auth();
 export default authServices;


 ///----test-----

// (
    // const fetchdata = async ()=>{
    //   console.log(authServices.account)
    //   const res =  await authServices.createAccount({email:"itsraghav12@gmail.com",password:"raghav12", name:"name"})
    //   console.log("res:",res)
    //   console.log("after login",authServices.account)
     
    // }
// )();

