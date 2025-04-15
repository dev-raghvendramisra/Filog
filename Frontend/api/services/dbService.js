import conf from '../config/conf.js';

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
          console.log(blog)

         if(blog.code==200){
             return blog.res[0];
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
            slug:{
              $eq:userName
            }
          }
        })));
       if(user.code==200){
           return user.res[0];
       }
       throw false
      } catch (error) {
         return null;
      }
   }
}

const dbService = new DBService();
export default dbService;
