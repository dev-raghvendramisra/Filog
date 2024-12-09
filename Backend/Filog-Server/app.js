const express = require('express');
const app = express();
const blogRoute = require('./router/blogRoute');
const userRoute = require('./router/userRoute');
const constants = require('./config/constants');

app.use("/blog",blogRoute);
app.use("/user",userRoute)
app.use(express.static('public'));
app.get("*",(req,res)=>{
    res.sendFile(constants.DEFAULT_HTML_FILE)
})


app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})
