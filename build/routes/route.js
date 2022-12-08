"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usageConroller_1 = require("../controllers/usageConroller");
const loginController_1 = require("../controllers/loginController");
const auth_1 = require("../Auth/auth");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post("/usage", auth_1.auth, usageConroller_1.createUsage);
router.get("/usage", auth_1.auth, usageConroller_1.getAllUsage);
router.get("/usage/:id", auth_1.auth, usageConroller_1.getUsageById);
router.put("/usag/e:id", auth_1.auth, usageConroller_1.updateUsage);
router.delete("/usage/:id", auth_1.auth, usageConroller_1.deleteUsage);
router.post("/user", userController_1.createUSER);
router.get("/user", userController_1.getAllUSER);
router.get("/user/:id", userController_1.getUSERById);
router.put("/user/:id", userController_1.updateUSER);
router.post("/dayusage", auth_1.auth, usageConroller_1.getdayWiseusage);
router.post("/totalusage", auth_1.auth, usageConroller_1.getTotalusage);
//login
router.post("/login", loginController_1.loginSession); //getAllcurrentUSER
router.get("/currentuser", loginController_1.getAllcurrentUSER);
router.delete("/logout/:id", auth_1.auth, loginController_1.logoutSession);
exports.default = router;
//getdayWiseusage
