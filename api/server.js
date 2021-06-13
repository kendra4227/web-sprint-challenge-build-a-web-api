const express = require('express');
const server = express();

const projectRouter = require('./projects/projects-router')
const actionsRouter =require('./actions/actions-router')

//GLOBAL MIDDLEWARE
server.use(express.json())
// Configure your server here
server.use("/",(req,res)=>{
    res.send({message:"Server is sending "})
    })
// ROUTERS
    server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

//EXPORT SERVER
module.exports = server
