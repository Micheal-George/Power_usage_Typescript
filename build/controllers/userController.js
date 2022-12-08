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
exports.updateUSER = exports.getUSERById = exports.getAllUSER = exports.createUSER = void 0;
const power_1 = require("../models/power");
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUSER = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const v = req.body;
    const saltRounds = 8;
    function call() {
    }
    const password = yield bcrypt_1.default.hash(v.password, saltRounds);
    var USER = yield user_1.User.create({ username: v.username, displayName: v.displayName, password: password, email: v.email, mobileNum: v.mobileNum });
    return res
        .status(200)
        .json({ message: "created successfully", data: USER });
});
exports.createUSER = createUSER;
const getAllUSER = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUSER = yield user_1.User.findAll({ include: [power_1.Powers] });
    if (allUSER.length == 0) {
        return res
            .status(400)
            .json({ message: " No User" });
    }
    return res
        .status(200)
        .json({ message: " fetched successfully", data: allUSER });
});
exports.getAllUSER = getAllUSER;
const getUSERById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const USER = yield user_1.User.findByPk(id, { include: [power_1.Powers] });
    if (USER == null) {
        return res
            .status(400)
            .json({ message: " Invalid user ID" });
    }
    return res
        .status(200)
        .json({ message: " fetched successfully", data: USER });
});
exports.getUSERById = getUSERById;
const updateUSER = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield user_1.User.update(Object.assign({}, req.body), { where: { id } });
    const updatedUSER = yield user_1.User.findByPk(id);
    if (updatedUSER == null) {
        return res
            .status(400)
            .json({ message: " Invalid user ID" });
    }
    return res
        .status(200)
        .json({ message: "updated successfully", data: updatedUSER });
});
exports.updateUSER = updateUSER;
