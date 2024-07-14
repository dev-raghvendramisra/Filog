import { Client,ID,Account } from "appwrite";
import conf from "../../Conf/conf";

export class Auth{
      
    client = new Client()
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.projectId)
    account;

    constructor(){
         this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
         try {
            
            const createdAccount =  await this.account.create(ID.unique(),email,password,name)
            if(createdAccount){
                return await this.login(email,password);
            }
            else{
                throw {err:"failed to create account: ", createdAccount:createdAccount}
            }

         } catch (error) {
             console.log("auth service error :: account creation error: " ,error)
             return error.createAccount

         }
    }

    async login(email,password){
        try {
            
           const res =  await this.account.createEmailPasswordSession(email,password);
           if(res.ok){
            return res;
           }

        } catch (error) {
            console.log("auth service error :: account login error:", error)
        }
    }
    async logout(){
        const result  = await this.account.deleteSession("current");
        return result;
    }

    async getLoggedInUser(){
        try {
            const res = await this.account.get()

             if(res.name){
                return res;
            }
            else{
                throw {err:"auth service error :: failed to retreive loggedIn user: ",res}
            }
        } catch (error) {
            console.log("auth service error :: failed to retreive loggedIn user: ",error)
            return error
        }
       

    }

}

 const authServices = new Auth();
 export default authServices;


 ///----test-----

// (
//     async ()=>{
//       console.log(authService.account)
//       const res =  await authService.createAccount({email:"itsraghav12@gmail.com",password:"raghav12", name:"name"})
//       console.log("res:",res)
//       console.log("after login",authService.account)
     
//     }
// )();

