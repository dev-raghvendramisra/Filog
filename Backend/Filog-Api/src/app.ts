import express from 'express'
import conf from 'config/conf';
import cors from 'cors'
import path from 'path'
import { logger as accessLogger } from '@middleware';
import {authRouter } from '@route';
import { envLogger } from '@lib';

const app = express();
const publicDir = path.join(__dirname, 'public');

const corsOptions = {
    origin: conf.FRONTEND_ENDPOINT,
    methods: 'GET,POST,OPTIONS,PATCH',
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
};

app.use(cors(corsOptions))
app.use(accessLogger)
app.use(express.static(publicDir))
app.use(express.json())
app.use('/apis/auth',authRouter)
app.use((req,res)=>{
    res.status(404).send({message: 'Invalid Endpoint',code: 404, ok:false})
})

app.listen(conf.PORT,()=>envLogger.info("Server listening on http://localhost:"+conf.PORT))
