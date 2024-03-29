"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./data/config/mongoose");
const server = (0, express_1.default)();
server.use(express_1.default.urlencoded({ extended: false }));
server.use(express_1.default.json());
exports.default = server;
