import DatabaseService from "./Services/dbService.js";
export default async function handler({req,res}){
  const dbService = new DatabaseService()
  console.log(req);
  
} 


