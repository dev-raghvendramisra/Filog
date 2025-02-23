import { createBlog } from "@controller/db/createDocuments";
import { getBlogs, getUsers } from "@controller/db/fetchDocuments";
import { updateBlog, updateProfile } from "@controller/db/updateDocuments";
import { queryParser, requestValidator } from "@middleware";
import { Router } from "express";
import authenticateUser from "middlewares/authenticateUser";
import { ownershipValidator } from "middlewares/ownershipValidator";
const router = Router()

router.get("/users",queryParser,getUsers)
router.get("/blogs",queryParser,getBlogs)
router.patch("/profile/update",authenticateUser,requestValidator,ownershipValidator,updateProfile)
router.patch("/blog/update",authenticateUser,requestValidator,ownershipValidator,updateBlog)
router.put("/blog/create",authenticateUser,requestValidator,createBlog)
export default router