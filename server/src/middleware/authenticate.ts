import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
import { Document } from "mongoose";

interface AuthenticatedRequest extends Request {
  token?: string;
  rootUser?: Document;
  userID?: string;
}

const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    // Check for token expiration
    if (!verifyToken) {
      throw new Error("Token has expired");
    }

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send("Unauthorized: Token has expired");
    } else {
      return res.status(401).send("Unauthorized: No valid token provided");
    }
  }
};

module.exports = authenticate;
