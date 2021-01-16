const express = require("express");
const authRouter = require("./api/auth.router");
const usersRouter = require("./api/users/users.router");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api", authRouter);

module.exports = server;
