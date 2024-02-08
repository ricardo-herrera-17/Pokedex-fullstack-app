import express from "express";
import "./data/config/mongoose";

const server = express();
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

export default server;
