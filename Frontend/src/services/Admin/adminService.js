import conf from "../../conf/conf";
import {downloadFiles} from "../../utils";
import action from "../Action/ActionGenerator"

class AdminService {

    adminToken;
    constructor(token){
        this.adminToken = token
    }

    async adminLogin(email,password){
        try {
            const rawRes = await fetch(conf.ADMIN_API_LOGIN_ENDPOINT,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:action.adminLogin(email,password)
            })
            const res = await rawRes.json();
            this.adminToken = res.res.token;
            return res;
        } catch (error) {
            console.log("auth service error :: admin login error: ",error)
            return error
        }
    }

    async getLogs(){
        try{
            const res = await fetch(conf.ADMIN_API_ENDPOINT+"/logs",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Token ${this.adminToken}` 
                }
            })
            const file = await downloadFiles(res)
        }catch(error){
            console.log("admin service error :: getLogs error: ",error)
            return error
        }
    }

    async getProfiles(){
        try{
            const res = await fetch(conf.ADMIN_API_ENDPOINT+"/profiles",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Token ${this.adminToken}` 
                }
            })
            const file = await downloadFiles(res)
        }catch(error){
            console.log("admin service error :: getUsers error: ",error)
            return error
        }
    }
    async getBlogs(){
        try{
            const res = await fetch(conf.ADMIN_API_ENDPOINT+"/blogs",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Token ${this.adminToken}` 
                }
            })
            const file = await downloadFiles(res)
        }catch(error){
            console.log("admin service error :: getUsers error: ",error)
            return error
        }
    }
}

export default AdminService;
export const adminService = new AdminService();