import { Router } from "express";

import {
  createUsage,
  deleteUsage,
  getAllUsage,
  updateUsage,
  getUsageById,
  getdayWiseusage,
  getTotalusage,
} from "../controllers/usageConroller";

import {
  loginSession,
  getAllcurrentUSER,
  logoutSession,
} from "../controllers/loginController";
import { auth } from "../Auth/auth";
import {
  createUSER,
  getAllUSER,
  updateUSER,
  getUSERById,
  deleteUser,
} from "../controllers/userController";

const router = Router();

// router.post("/addusage", createUsage);
router.post("/addusage",auth, createUsage);

router.get("/usage", auth,getAllUsage);

// router.get("/usage", getAllUsage);

router.get("/usage/:id", getUsageById);
// router.get("/usage/:id", getUsageById);

router.put("/usage/:id", auth, updateUsage);

router.delete("/usage/:id", auth, deleteUsage);

router.post("/adduser", createUSER);

router.get("/user", getAllUSER);

router.get("/user/:id", getUSERById);

router.put("/user/:id", updateUSER);

router.delete("/user/:id", deleteUser);

router.post("/dayusage", auth, getdayWiseusage);

router.post("/totalusage", auth, getTotalusage);

//login
router.post("/login", loginSession); //getAllcurrentUSER

router.get("/currentuser", getAllcurrentUSER);

router.delete("/logout/:id", auth, logoutSession);

export default router;

//getdayWiseusage
