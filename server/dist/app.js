"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/.env" });
const port = process.env.PORT;
require("./db/conn");
app.use(cors({
    // origin: true,
    origin: "https://split-your-bill.vercel.app",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(require("./router/auth"));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
