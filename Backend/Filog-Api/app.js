const logger = require('./libs/winstonLogger').envLogger;
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const {authRoutes, adminRoutes} = require('./routes');
const { conf } = require('./config/conf');
const {loggerMiddleware} = require('./middlewares');
const publicDir = path.join(__dirname, 'public');


const corsOptions = {
    origin: conf.FRONTEND_ENDPOINT,
    methods: 'GET,POST,OPTIONS,PATCH',
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(loggerMiddleware);
app.use(express.static(publicDir));
app.use(express.json())
app.use('/apis/auth',authRoutes)
app.use('/apis/admin',adminRoutes)
app.use((req,res)=>{
    res.status(404).send({message: 'Invalid Endpoint',code: 404, ok:false})
})


app.listen(conf.PORT,()=>{
    logger.info(`Server started on port ${conf.PORT}`)
})
