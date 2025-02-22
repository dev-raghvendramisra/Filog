import { getUsers } from "@controller/db/getUsers";
import { queryParser } from "@middleware";
import { Router } from "express";
import authenticateUser from "middlewares/authenticateUser";
const router = Router()

router.get("/users",authenticateUser,queryParser,getUsers)

export default router