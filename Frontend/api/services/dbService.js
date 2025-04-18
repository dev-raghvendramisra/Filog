import conf from '../config/conf.js';
import axios from 'axios';

class DBService {


    async getBlog(slug){
        try {
          const blog = await axios.get(conf.DB_API_ENDPOINT+"/blogs?query="+encodeURIComponent(JSON.stringify({
            filters:{
              slug:{
                $eq:slug
              }
            }
          })));
          if(blog.data.code==200){
            return blog.data.res[0];
          }
          throw false
        } catch (error) {
           return null;
        }
     }
     async getProfile(userName){
      try {
        const user = await axios.get(conf.DB_API_ENDPOINT+"/users?query="+encodeURIComponent(JSON.stringify({
          filters:{
            userName:{
              $eq:userName
            }
          }
        })));
       if(user.data.code==200){
           return user.data.res[0];
       }
       throw false
      } catch (error) {
         return null;
      }
   }
}

const dbService = new DBService();
export default dbService;
