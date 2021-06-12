const express = require('express');
const server = express();

//GLOBAL MIDDLEWARE
server.use(express.json())
// Configure your server here
server.use("*",(req,res)=>{
    res.status(200).json({message:"Hi"})
    })

    //ENDPOINTS
    server.get('/api/projects', (req,res)=>{
    
    })
    server.get('/api/projects/:id', (req,res)=>{
        
    })
    server.post('/api/projects', (req,res)=>{
        
    })
    server.put('/api/projects/:id', (req,res)=>{
        
    })
    
    server.delete('/api/projects/:id', (req,res)=>{
        
    })
    server.get('/api/projects/:id/actions', (req,res)=>{
        
    })
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
