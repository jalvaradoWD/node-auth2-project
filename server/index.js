const express = require("express");
const { registerUser, loginUser } = require("./api/auth.models");
const usersRouter = require("./api/users/users.router");
const server = express();

server.use(express.json());

server.use("/api/register", registerUser);
server.use("/api/login", loginUser);
server.use("/api/users", usersRouter);

module.exports = server;
