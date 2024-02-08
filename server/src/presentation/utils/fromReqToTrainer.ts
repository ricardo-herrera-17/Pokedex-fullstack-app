import jwt from "jsonwebtoken";
import { Request } from "express";

interface jwtPayload {
  email: string;
}

const FromReqToTrainer = (req: Request): string | null => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer "))
    return null;

  const token = authorizationHeader.replace("Bearer ", "");
  if (!token) return null;

  const jwtSecret = process.env.JWT_SECRET || "jwt-secret";
  const jwtD = jwt.verify(token, jwtSecret) as jwtPayload;

  const trainerEmail = jwtD.email;
  if (!trainerEmail) return null;
  return trainerEmail;
};

export default FromReqToTrainer;
