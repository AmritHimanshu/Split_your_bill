"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const billSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    members: [
        {
            name: {
                type: String,
                required: true,
            },
            totalSpends: {
                type: String,
                default: "0",
            },
        },
    ],
    createdBy: {
        type: ObjectId,
        ref: "USER",
    },
});
const Bill = mongoose_1.default.model("BILL", billSchema);
module.exports = Bill;
