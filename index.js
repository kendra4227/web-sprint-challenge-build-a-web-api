const express = require('express')
const server = express('./api/server')


server.listen(3000, ()=>
console.log("Server running on http://localhost:3000")
);
