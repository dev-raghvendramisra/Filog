import app from "app";
import conf from "config/conf";
import { createServer } from "http";
import mongoose, { connect } from "mongoose";
import { envLogger as logger } from "@lib";
const server = createServer(app);

export async function startServer() {
   console.log("----------------------------------------------------");
   logger.info("Starting backend...");
   try {
      if (mongoose.connection.readyState===1 || mongoose.connection.readyState===2  ) {
         console.log("------------------------");
         logger.error("Database already connected");
      } else {
         await connect(conf.DB_URI);
         console.log("------------------------");
         logger.info("Database connected");
      }
      if (server.listening) {
         console.log("------------------------");
         logger.error("Server is already running");
      } else {
         console.log("------------------------");
         server.listen(conf.PORT, () =>
            logger.info("Server listening on http://localhost:" + conf.PORT)
         );
      }
   } catch (err) {
      logger.error(`ERR_STARTING_BACKEND ${err}`);
   }
}

export async function shutdownServer() {
   console.log("----------------------------------------------------");
   logger.info("Shutting-down backend");
   try {
      if (!mongoose.connection) {
         console.log("------------------------");
         logger.error("ERR_DISCONNECTING_DATABASE: DATABASE NOT CONNECTED");
      } else {
         await mongoose.disconnect();
         console.log("------------------------");
         logger.info("Database disconnected");
      }
      if (!server.listening) {
         console.log("------------------------");
         logger.error("ERR_SHUTTING_DOWN_SERVER: Server is not running");
      } else {
         server.close((err) => {
            if (err) {
               console.log("------------------------");
               logger.error(`ERR_SHUTTING_DOWN_SERVER: ${err}`);
               process.exit(1);
            }
            console.log("------------------------");
            logger.info("Server shutdown successfully");
         });
      }
   } catch (err) {
      logger.error(`ERR_SHUTTING_DOWN_BACKEND ${err}`);
   }
}


startServer()
