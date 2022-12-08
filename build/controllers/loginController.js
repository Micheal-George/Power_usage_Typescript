"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logoutSession = exports.getAllcurrentUSER = exports.loginSession = void 0;
const login_1 = require("../models/login");
const user_1 = require("../models/user");
const loginUser_1 = require("../models/loginUser");
const uuid_1 = require("uuid");
const { QueryTypes } = require('sequelize');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { env } from 'process';
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// const key=require('dotenv').config({path:"../.env"} );
require("path");
//login
const loginSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const myId = (0, uuid_1.v4)();
    var currData;
    const v = req.body;
    var loginUser = loginUser_1.LoginUser.build({ username: v.username, password: v.password, email: v.email, mobileNum: v.mobileNum });
    if (v.username != undefined) {
        currData = yield user_1.User.findOne({ where: { username: loginUser.username } });
    }
    else if (v.email != undefined) {
        currData = yield user_1.User.findOne({ where: { email: loginUser.email } });
    }
    else if (v.mobileNum != undefined) {
        currData = yield user_1.User.findOne({ where: { mobileNum: loginUser.mobileNum } });
    }
    console.log(currData);
    //   console.log(currData?.length)
    if (currData == undefined) {
        return res
            .status(400)
            .json({ message: "User not registered" });
    }
    const alreadyPresnt = yield login_1.Login.findOne({
        where: {
            userId: currData.id
        }
    });
    if (alreadyPresnt != undefined) {
        return res
            .status(400)
            .json({ message: "User already logged in" });
    }
    const isMatch = bcrypt_1.default.compareSync(v.password, currData.password);
    if (isMatch) {
        const check = process.env.JWT_SECRET || "";
        const token1 = jsonwebtoken_1.default.sign({ id: (_a = currData.id) === null || _a === void 0 ? void 0 : _a.toString(), username: currData.username }, check, {
            expiresIn: '4m'
        });
        console.log(token1);
        var USER = yield login_1.Login.create({ username: currData.username, token: token1, userId: currData.id, date: Date.now() });
        return res
            .status(200)
            .json({ message: "created successfully", data: USER });
    }
    else {
        return res
            .status(400)
            .json({ message: "Incorrect password" });
    }
});
exports.loginSession = loginSession;
const getAllcurrentUSER = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUSER = yield login_1.Login.findAll();
    if (allUSER.length == 0) {
        return res
            .status(400)
            .json({ message: " No User" });
    }
    return res
        .status(200)
        .json({ message: " fetched successfully", data: allUSER });
});
exports.getAllcurrentUSER = getAllcurrentUSER;
//logout
const logoutSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const deletedUsage = yield login_1.Login.findOne({
        where: {
            userId: id
        }
    });
    console.log(deletedUsage);
    if (deletedUsage == undefined) {
        return res
            .status(400)
            .json({ message: " Invalid id" });
    }
    const token = (_b = req.header('Authorization')) === null || _b === void 0 ? void 0 : _b.replace('Bearer ', '');
    console.log(token);
    const check = process.env.JWT_SECRET || "";
    if (token == deletedUsage.token) {
        yield login_1.Login.destroy({ where: { id: deletedUsage.id } });
        return res
            .status(200)
            .json({ message: `${deletedUsage.username} loged out successfully` });
    }
    return res
        .status(400)
        .json({ message: "Autenticate" });
});
exports.logoutSession = logoutSession;
