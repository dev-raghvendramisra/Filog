import express from 'express'
import conf from 'config/conf';
import cors from 'cors'
import path from 'path'
import { logger as accessLogger } from '@middleware';
import authRouter from '@router/auth/authRouter';
import dbRouter from "@router/db/dbRouter"
import cookieParser from 'cookie-parser';

const app = express();
const publicDir = path.join(__dirname, 'public');

const corsOptions = {
    origin: conf.FRONTEND_ENDPOINT,
    methods: 'GET,POST,OPTIONS,PATCH',
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
};

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(accessLogger)
app.use(express.static(publicDir))
app.use(express.json())
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/db',dbRouter)
app.use((req,res)=>{
    res.status(404).send({message: 'Invalid Endpoint',code: 404, ok:false})
})

export default app
