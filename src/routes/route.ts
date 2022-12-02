import { Router } from "express";

import {
  createUsage,
  deleteUsage,
  getAllUsage,
  updateUsage,
  getUsageById,
  getdayWiseusage,
  getTotalusage
} from "../controllers/usageConroller";

import{loginSession,getAllcurrentUSER,logoutSession} from "../controllers/loginController"

import {
    createUSER,
    getAllUSER,
    updateUSER,
    getUSERById,
  } from "../controllers/userController";

const router = Router();

router.post("/usage/:id", createUsage);

router.get("/usage", getAllUsage);

router.get("/usage/:id", getUsageById);

router.put("/usag/e:id", updateUsage);

router.delete("/usage/:id", deleteUsage);

router.post("/user", createUSER);

router.get("/user", getAllUSER);

router.get("/user/:id", getUSERById);

router.put("/user/:id", updateUSER);

router.post("/dayusage", getdayWiseusage);

router.post("/totalusage", getTotalusage);

//login
router.post("/login", loginSession);  //getAllcurrentUSER

router.get("/currentuser", getAllcurrentUSER);

router.delete("/logout/:id", logoutSession);

export default router;


//getdayWiseusage