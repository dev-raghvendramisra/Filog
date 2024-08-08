const {Client,Database} = require('node-appwrite')
const conf =require('./conf')

const client = new Client()
               .setEndPoint(conf.appWriteUrl)
               .setProject(conf.projectId)
               .set

const database = new Database();
