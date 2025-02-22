import app from "app";
import conf from "config/conf";
import {createServer} from 'http'
import {connect} from "mongoose"
import { envLogger as logger } from "@lib";

const server = createServer(app)

connect(conf.DB_URI)
 .then(()=>{
    logger.info("Database connected")
    server.listen(conf.PORT,()=>logger.info("Server listening on http://localhost:"+conf.PORT))
 })
 .catch((err)=>logger.error(`ERR_STARTING_BACKEND ${err}`))
