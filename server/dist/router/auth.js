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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bcrypt = require("bcryptjs");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
router.use((0, cookie_parser_1.default)());
const authenticate = require("../middleware/authenticate");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const User = require("../model/userSchema");
const Bill = require("../model/billSchema");
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, password, cpassword } = req.body;
    const regex = /^[0-9]+$/;
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(206).json({ error: "Fill all the fields" });
    }
    else if (password !== cpassword) {
        return res.status(412).json({ error: "Password doesn't match" });
    }
    else if (password.length < 6) {
        return res
            .status(412)
            .json({ error: "Length of password must be of atleast 6" });
    }
    else if (phone.length < 10) {
        return res.status(412).json({ error: "Invalid Phone number" });
    }
    else if (!regex.test(phone)) {
        return res.status(412).json({ error: "Invalid Phone number" });
    }
    try {
        const emailExist = yield User.findOne({ email: email });
        if (emailExist) {
            return res.status(422).json({ error: "Email id already registered" });
        }
        const user = new User({ name, email, phone, password });
        const userRegister = yield user.save();
        if (userRegister) {
            return res.status(200).json({ message: "User registered successfully" });
        }
    }
    catch (error) {
        console.log("/register " + error);
        res.status(503).json({ error: "Internal Server Error" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(206).json({ error: "Fill all the fields" });
    }
    try {
        const userExist = yield User.findOne({ email: email });
        if (!userExist) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const isMatch = yield bcrypt.compare(password, userExist.password);
        const Token = yield userExist.generateAuthToken();
        res.cookie("jwtoken", Token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
            secure: true, // Mark as secure if using HTTPS
            sameSite: "none", // Set SameSite attribute for cross-origin requests
            path: "/",
        });
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        return res.status(200).json(userExist);
    }
    catch (error) {
        console.log("/login " + error);
        res.status(503).json({ error: "Internal Server Error" });
    }
}));
router.post("/create-new-bill", authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, memberNames } = req.body;
    if (!title)
        return res.status(206).json({ error: "Fill all the fields" });
    memberNames.map((item, index) => {
        if (item === "")
            return res.status(206).json({ error: `Member ${index + 1} is empty` });
    });
    try {
        const newBill = new Bill({
            title: title,
            members: memberNames.map((memberName) => ({
                name: memberName,
            })),
            createdBy: req.userID,
        });
        const savedBill = yield newBill.save();
        res.status(200).json(savedBill);
    }
    catch (error) {
        console.log("/created-new-bill " + error);
        res.status(503).json({ error: "Internal Server Error" });
    }
}));
router.put("/addAmount/:id", authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { selectedMember, inputAmount } = req.body;
    try {
        const existingBill = yield Bill.findOne({
            _id: id,
            "members._id": selectedMember,
        });
        if (!existingBill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        const memberIndex = existingBill.members.findIndex((member) => member._id.toString() === selectedMember);
        if (memberIndex === -1) {
            return res.status(404).json({ error: "Member not found in the bill" });
        }
        const parsedTotalSpends = parseFloat(existingBill.members[memberIndex].totalSpends);
        const inputAmountNumber = parseFloat(inputAmount);
        const newTotalSpends = (parsedTotalSpends + inputAmountNumber).toString();
        const bill = yield Bill.findOneAndUpdate({ _id: id, "members._id": selectedMember }, { $set: { "members.$.totalSpends": newTotalSpends } }, { new: true });
        if (!bill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        else {
            return res.status(200).json(bill);
        }
    }
    catch (error) {
        console.log("/addAmount " + error);
        res.status(503).json({ error: "Internal Server Error" });
    }
}));
router.put("/subAmount/:id", authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { selectedMember, inputAmount } = req.body;
    try {
        const existingBill = yield Bill.findOne({
            _id: id,
            "members._id": selectedMember,
        });
        if (!existingBill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        const memberIndex = existingBill.members.findIndex((member) => member._id.toString() === selectedMember);
        if (memberIndex === -1) {
            return res.status(404).json({ error: "Member not found in the bill" });
        }
        const parsedTotalSpends = parseFloat(existingBill.members[memberIndex].totalSpends);
        const inputAmountNumber = parseFloat(inputAmount);
        const newTotalSpends = (parsedTotalSpends - inputAmountNumber).toString();
        if (parseFloat(newTotalSpends) < 0) {
            return res
                .status(404)
                .json({ error: "Can't substract this much amount" });
        }
        const bill = yield Bill.findOneAndUpdate({ _id: id, "members._id": selectedMember }, { $set: { "members.$.totalSpends": newTotalSpends } }, { new: true });
        if (!bill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        else {
            return res.status(200).json(bill);
        }
    }
    catch (error) {
        console.log("/subAmount " + error);
        res.status(503).json({ error: "Internal Server Error" });
    }
}));
router.delete("/delete/:id", authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bill = yield Bill.findById(id);
        if (!bill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        if (req.rootUser._id.equals(bill.createdBy)) {
            yield bill.deleteOne(); // Invoke remove() to delete the post
            res.status(200).json({ message: "Post deleted successfully" });
        }
        else {
            return res.status(422).json({ error: "You can't delete this post" });
        }
    }
    catch (error) {
        console.log("/delete " + error);
        res.status(503).json({ error: "Internal Server Error" });
    }
}));
router.get("/getBills", authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bills = yield Bill.find({ createdBy: req.userID })
            .select("-members")
            .sort("-date");
        res.status(200).json(bills);
    }
    catch (error) {
        console.log("/getBills " + error);
        res.status(503).json({ error: "Internal Server Error" });
    }
}));
router.get("/:id/getsinglebill", authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send({ error: "Invalid ID format" });
    }
    try {
        const bill = yield Bill.findOne({ _id: id });
        if (!bill) {
            return res.status(422).json({ error: "Bill not found" });
        }
        res.status(200).json(bill);
    }
    catch (error) {
        console.log("/getsinglebill " + error);
        res.status(503).json({ error: "Internal Server Error" });
    }
}));
router.get("/user", authenticate, (req, res) => {
    res.status(200).send(req.rootUser);
});
router.get("/logout", (req, res) => {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).json({ message: "User Logout" });
});
router.get("/", (req, res) => {
    res.json({ message: "Hello, TypeScript Node Express!" });
});
module.exports = router;
