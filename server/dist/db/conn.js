"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DB = process.env.DATABASE;
if (!DB) {
    console.error("Database connection string is not defined in the .env file");
    process.exit(1); // Exit the process if there's an issue
}
mongoose_1.default.connect(DB).then(() => {
    console.log("Connection successful");
}).catch((err) => console.log('No connection ' + err));
