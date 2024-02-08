"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbOptions = {
    user: process.env.MONGODB_USER || "",
    pass: process.env.MONGODB_PASSWORD || "",
};
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/pokemon";
mongoose_1.default.connect(mongoURI, dbOptions);
const connection = mongoose_1.default.connection;
connection.once("open", () => {
    console.log("Mongodb Connection stablished");
});
connection.on("error", (err) => {
    console.log("Mongodb connection error:", err);
    process.exit();
});
