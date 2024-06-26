"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // Check for token expiration
        if (!verifyToken) {
            throw new Error("Token has expired");
        }
        const rootUser = yield User.findOne({
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
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send("Unauthorized: Token has expired");
        }
        else {
            return res.status(401).send("Unauthorized: No valid token provided");
        }
    }
});
module.exports = authenticate;
