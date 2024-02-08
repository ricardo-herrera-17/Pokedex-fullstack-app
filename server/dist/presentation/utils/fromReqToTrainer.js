"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const FromReqToTrainer = (req) => {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
        return null;
    const token = authorizationHeader.replace("Bearer ", "");
    if (!token)
        return null;
    const jwtSecret = process.env.JWT_SECRET || "jwt-secret";
    const jwtD = jsonwebtoken_1.default.verify(token, jwtSecret);
    const trainerEmail = jwtD.email;
    if (!trainerEmail)
        return null;
    return trainerEmail;
};
exports.default = FromReqToTrainer;
