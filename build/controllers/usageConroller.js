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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalusage = exports.getdayWiseusage = exports.updateUsage = exports.getUsageById = exports.getAllUsage = exports.deleteUsage = exports.createUsage = void 0;
const power_1 = require("../models/power");
const createUsage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { id } = req.params;
    // const currUser: Login | null =  await Login.findOne({
    //     where: {
    //      token: id
    //     }});
    //  if(currUser==null)
    //  {
    //   return res
    //   .status(200)
    //   .json({ message: " User not logged in"});
    //  }
    const time1 = new Date(req.body.fromTime);
    const time2 = new Date(req.body.toTime);
    let t = time2.getTime() - time1.getTime();
    t = Math.floor(t / 60000);
    const num = Math.floor(t / (60));
    const min = Math.floor(t % (60));
    let str = "";
    if (min < 10 && num < 10)
        str += "0" + num + ":" + "0" + min + ":" + "00";
    else if (min >= 10 && num < 10)
        str += "0" + num + ":" + min + ":" + "00";
    else if (min < 10 && num >= 10)
        str += num + ":" + "0" + min + ":" + "00";
    const v = req.body;
    let c = 0;
    if (v.applianceType == "low-power")
        c += 2 * num;
    if (v.applianceType == "mid-power")
        c += 3 * num;
    if (v.applianceType == "high-power")
        c += 4 * num;
    let normalid = v.UserId;
    //  if(v.userId==undefined)
    //    normalid=currUser.userId;
    //  console.log(normalid)
    var Usage = yield power_1.Powers.create({ fromTime: v.fromTime, toTime: v.toTime, applianceType: v.applianceType, unitConsumed: c, duration: str, userId: normalid });
    return res
        .status(200)
        .json({ message: " created successfully", data: Usage });
});
exports.createUsage = createUsage;
const deleteUsage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedUsage = yield power_1.Powers.findByPk(id);
    yield power_1.Powers.destroy({ where: { id } });
    return res
        .status(200)
        .json({ message: " deleted successfully", data: deletedUsage });
});
exports.deleteUsage = deleteUsage;
const getAllUsage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsage = yield power_1.Powers.findAll();
    if (allUsage.length == 0) {
        return res
            .status(400)
            .json({ message: "No usage data", data: allUsage });
    }
    return res
        .status(200)
        .json({ message: " fetched successfully", data: allUsage });
});
exports.getAllUsage = getAllUsage;
const getUsageById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const Usage = yield power_1.Powers.findByPk(id);
    if (Usage == null) {
        return res
            .status(400)
            .json({ message: "No usage data", data: Usage });
    }
    return res
        .status(200)
        .json({ message: " data fetched successfully", data: Usage });
});
exports.getUsageById = getUsageById;
const updateUsage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield power_1.Powers.update(Object.assign({}, req.body), { where: { id } });
    const updatedUsage = yield power_1.Powers.findByPk(id);
    return res
        .status(200)
        .json({ message: "updated successfully", data: updatedUsage });
});
exports.updateUsage = updateUsage;
//day wise usage
const getdayWiseusage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Op } = require('sequelize');
    const allUsage = yield power_1.Powers.findAll({
        where: { fromTime: { [Op.between]: [req.body.fromTime, req.body.toTime] }
        }
    });
    if (allUsage.length == 0) {
        return res
            .status(400)
            .json({ message: "No usage data", data: allUsage });
    }
    return res
        .status(200)
        .json({ message: " fetched successfully", data: allUsage });
});
exports.getdayWiseusage = getdayWiseusage;
//list usage
const getTotalusage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { Op } = require('sequelize');
    const allUsage = yield power_1.Powers.findAll({
        where: { fromTime: { [Op.between]: [req.body.fromTime, req.body.toTime] }
        }
    });
    if (allUsage.length == 0) {
        return res
            .status(400)
            .json({ message: "No usage data", data: allUsage });
    }
    let usage = 0;
    for (let i = 0; i < allUsage.length; i++) {
        usage += allUsage[i].unitConsumed;
    }
    const time1 = new Date(req.body.fromTime);
    const time2 = new Date(req.body.toTime);
    let t = time2.getTime() - time1.getTime();
    t = Math.floor(t / 60000);
    const num = Math.floor(t / (60 * 24));
    let dur;
    if (num < 2)
        dur = num + " day";
    else
        dur = num + " days";
    return res
        .status(200)
        .json({ fromTime: req.body.fromTime, toTime: req.body.toTime, unitconsumed: usage, duration: dur });
});
exports.getTotalusage = getTotalusage;
