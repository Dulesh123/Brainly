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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const cors_1 = __importDefault(require("cors"));
mongoose_1.default.connect("mongodb://localhost:27017/Brainly");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashpassword = yield bcrypt_1.default.hash(password, 5);
    try {
        yield db_1.UserModel.create({
            username: username,
            password: hashpassword,
        });
    }
    catch (e) {
        res.status(400).json({
            msg: "Unable To signup",
        });
    }
    res.status(200).json({
        msg: "SignUp Succesfull",
    });
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db_1.UserModel.findOne({
        username: username,
    });
    //@ts-ignore
    const validpassword = bcrypt_1.default.compare(password, user.password);
    if (!validpassword) {
        res.status(401).json({
            msg: "User Not Found",
        });
    }
    else {
        //@ts-ignore
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_SECRET);
        res.json({
            token: token,
        });
    }
}));
app.post("/api/v1/content", middleware_1.Authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, title, type, tag } = req.body;
    //@ts-ignore
    const userid = req.headers;
    try {
        yield db_1.ContentModel.create({
            link: link,
            type: type,
            title: title,
            tag: tag,
            userid: userid,
        });
    }
    catch (e) {
        res.json({
            msg: "Unable to add content",
        });
    }
    res.json({
        msg: "Content Sucessfully added",
    });
}));
app.get("/api/v1/content", middleware_1.Authmiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //@ts-ignore
    const userid = req.headers;
    try {
        const content = yield db_1.ContentModel.find({
            userid: userid,
        });
        res.json({
            content
        });
    }
    catch (e) {
        res.status(400).json({
            msg: "Content Not Found",
        });
    }
}));
app.listen(3000);
