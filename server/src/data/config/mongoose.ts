import mongoose, { ConnectOptions } from "mongoose";

const dbOptions: ConnectOptions = {
  user: process.env.MONGODB_USER || "",
  pass: process.env.MONGODB_PASSWORD || "",
};

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/pokemon";

mongoose.connect(mongoURI, dbOptions);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection stablished");
});
connection.on("error", (err) => {
  console.log("Mongodb connection error:", err);
  process.exit();
});
