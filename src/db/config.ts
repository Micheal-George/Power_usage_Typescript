import { Sequelize } from "sequelize-typescript";
import { Days } from "../models/days";
import { Login } from "../models/login";
import { LoginUser } from "../models/loginUser";
import { Powers } from "../models/power";
import { User } from "../models/user";

const connection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "Polakulam",
  database: "powers",
  logging: false,
  models: [Powers,User,Login,LoginUser],
});

export default connection;

// HOST: "localhost",
// USER: "postgres",
// PASSWORD: "Polakulam",
// DB: "power_usage",
// dialect: "postgres"