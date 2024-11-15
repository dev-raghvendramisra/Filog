import { Client,ID,Account } from "appwrite";
import conf from "../../conf/conf";
import {dbServices} from "../../services"
import {getFormattedTime} from "../../utils"
import action from "../Action/ActionGenerator";

export class Auth{
      
    client = new Client()
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.projectId)
    account;

    constructor(){
         this.account = new Account(this.client)
    }

    async createAccount({id=ID.unique(),email,password,name,userName,prefs={}}){
         try {
            
            const createdAccount =  await this.account.create(id,email,password,name)
            if(createdAccount){
                const res = await this.login(email,password);
                if(res.code!=401 || res.code!==429){
                       let blob
                       let avatar
                       let uploadRes
                       const avatarRes = await fetch(`https://api.dicebear.com/9.x/micah/webp?seed=${id}&scale=100&flip=true&baseColor=f9c9b6&backgroundColor=194FE6`)
                       if(avatarRes.status==200){
                          blob = await avatarRes.blob()
                          avatar = new File([blob],`${name}-avatar-${id}-${getFormattedTime(true)}.webp`,{type:"image/webp"})
                          uploadRes = await dbServices.uploadImage(avatar,id)
                       }
                       const profileCreationRes = await dbServices.createProfileDocument({
                        userName:userName.toLowerCase(),
                        fullName:name,
                        userAvatar:uploadRes.url?uploadRes.url:"",
                        userAvatarId:uploadRes.fileId?uploadRes.fileId:"",
                        userId:id,
                        version:1,
                        priority:0
                        },id)
                       return profileCreationRes
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

    async loginWithMagicUrl(secret){
      try {
        this.client.setJWT(secret);
        this.account = new Account(this.client);
      } catch (error) {
        console.log(error)
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
            const rawRes = await fetch(conf.emailApiEndpoint,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:action.verifyEmail(userId,secret)
            })
            const jsonRes = await rawRes.json();
            return jsonRes;
        } catch (error) {
            console.log("auth service error :: failed to verify email: ",error)
            return error
        }

    }
    async createEmailVerification(email,userId){
      try{
        const rawRes = await fetch(conf.emailApiEndpoint,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:action.generateEmailVerification(userId,email)
        })
        const jsonRes = await rawRes.json();
        return jsonRes;
      }catch(error){
        console.log("auth service error :: failed to create email verification: ",error)
        return error;
      }
    }

    async createMagicUrl(email){
        try {
            const rawRes = await fetch(conf.emailApiEndpoint,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:action.generateMagicUrl(email)
            });
            const jsonRes = await rawRes.json();
            return jsonRes;
        } catch (error) {
            console.log("auth service error :: failed to create magic url: ",error)
            return error;
          }
    }
    //verify magic url

    async verifyMagicUrl(userId,secret){
        try {
            const rawRes = await fetch(conf.emailApiEndpoint,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:action.verifyMagicUrl(userId,secret)
            });
            const jsonRes = await rawRes.json();
            return jsonRes;
        } catch (error) {
            console.log("auth service error :: failed to verify magic url: ",error)
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

