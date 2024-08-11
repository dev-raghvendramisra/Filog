import DatabaseService from "./Services/dbService.js";
export default async function handler({req,res,log}){
  const dbService = new DatabaseService()
  log(req)
  return res.send("<div>hello</div>") 
} 


