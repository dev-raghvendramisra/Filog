const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');
const { conf } = require('./config/conf');
const {logger} = require('./middlewares');
const publicDir = path.join(__dirname, 'public');


const corsOptions = {
    origin: conf.FRONTEND_ENDPOINT,
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.static(publicDir));
app.use(express.json())
app.use(logger);
app.use('/apis',apiRoutes)
app.use((req,res)=>{
    res.status(404).send({message: 'Invalid URL',code: 404, ok:false})
})

app.listen(conf.PORT,()=>{
    console.log(`Server started on port ${conf.PORT}`)
})