"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authmiddleware = void 0;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Authmiddleware = function (req, res, next) {
    const token = req.headers.token;
    //@ts-ignore
    const verifytoken = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (verifytoken) {
        //@ts-ignore
        req.headers = verifytoken.id;
        next();
    }
    else {
        res.status(400).json({
            msg: "Invalid credntials",
        });
    }
};
exports.Authmiddleware = Authmiddleware;
