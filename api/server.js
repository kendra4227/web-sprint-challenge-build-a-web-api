const express = require("express");
const server = express();
const helmet = require("helmet");

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const projectRouter = require("./projects/projects-router");
const actionRouter = require("./actions/actions-router");

server.use(helmet());
server.use(express.json());
server.use(projectRouter);
server.use(actionRouter);

server.use((err, req, res, next) => {
  res.status(500).json({
    message: "Something went wrong",
  });
});

module.exports = server;