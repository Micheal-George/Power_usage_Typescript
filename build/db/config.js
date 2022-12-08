"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const login_1 = require("../models/login");
const loginUser_1 = require("../models/loginUser");
const power_1 = require("../models/power");
const user_1 = require("../models/user");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "Polakulam",
    database: "powers",
    logging: false,
    models: [power_1.Powers, user_1.User, login_1.Login, loginUser_1.LoginUser],
});
exports.default = connection;
// HOST: "localhost",
// USER: "postgres",
// PASSWORD: "Polakulam",
// DB: "power_usage",
// dialect: "postgres"
