import { RequestHandler } from "express";

import { Powers } from "../models/power";

import {Login} from "../models/login"

import {User} from "../models/user"

import{Days} from "../models/days"

export const createUsage: RequestHandler = async (req, res, next) => {
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


    const time1:Date=new Date(req.body.fromTime)
    const time2:Date=new Date(req.body.toTime)
   let t=time2.getTime()-time1.getTime()
   t=Math.floor(t/60000);
   
   const num=Math.floor(t/(60));
   const min=Math.floor(t%(60));
 
   let str:string="";
   if(min<10&&num<10)
   str+="0"+num+":"+"0"+min+":"+"00"
   else if(min>=10&&num<10)
   str+="0"+num+":"+min+":"+"00"
   else if(min<10&&num>=10)
   str+=num+":"+"0"+min+":"+"00"
   const v=req.body ;
   let c:number=0;
   if(v.applianceType=="low-power")
   c+=2*num
   if(v.applianceType=="mid-power")
   c+=3*num
   if(v.applianceType=="high-power")
   c+=4*num
   let normalid:number=v.UserId
  //  if(v.userId==undefined)
  //    normalid=currUser.userId;
     
   console.log(normalid)
  
  var Usage = await Powers.create({fromTime: v.fromTime,toTime:v.toTime,applianceType:v.applianceType,unitConsumed:c,duration:str,userId:normalid})
 
  return res
    .status(200)
    .json({ message: " created successfully", data: Usage});
};

export const deleteUsage: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedUsage: Powers | null = await Powers.findByPk(id);
  await Powers.destroy({ where: { id } });
  return res
    .status(200)
    .json({ message: " deleted successfully", data: deletedUsage });
};

export const getAllUsage: RequestHandler = async (req, res, next) => {
  const allUsage: Powers[] = await Powers.findAll();
  if(allUsage.length==0)
  {return res
    .status(400)
    .json({ message: "No usage data", data: allUsage });}
    
  return res
    .status(200)
    .json({ message: " fetched successfully", data: allUsage });
};

export const getUsageById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const Usage: Powers | null = await Powers.findByPk(id);
  if(Usage==null)
  {
    return res
    .status(400)
    .json({ message: "No usage data", data: Usage });
  }
  return res
    .status(200)
    .json({ message: " data fetched successfully", data: Usage });
};

export const updateUsage: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await Powers.update({ ...req.body }, { where: { id } });
  const updatedUsage: Powers | null = await Powers.findByPk(id);
  return res
    .status(200)
    .json({ message: "updated successfully", data: updatedUsage });
};


//day wise usage
export const getdayWiseusage: RequestHandler = async (req, res, next) => {
  const {Op}=require('sequelize');
  const allUsage: Powers[] = await Powers.findAll({
    where: 
      {fromTime : {[Op.between] : [req.body.fromTime ,  req.body.toTime]}
      
    }});
  if(allUsage.length==0)
  {return res
    .status(400)
    .json({ message: "No usage data", data: allUsage });}
 
  return res
    .status(200)
    .json({ message: " fetched successfully", data: allUsage });
};


//list usage
export const getTotalusage: RequestHandler = async (req, res, next) => {
  const {Op}=require('sequelize');
  const allUsage: Powers[] = await Powers.findAll({
    where: 
      {fromTime : {[Op.between] : [req.body.fromTime ,  req.body.toTime]}
      
    }});
  if(allUsage.length==0)
  {return res
    .status(400)
    .json({ message: "No usage data", data: allUsage });}
  let usage:number=0;  
for(let i=0;i<allUsage.length;i++)
{
  usage+=allUsage[i].unitConsumed;
}
const time1:Date=new Date(req.body.fromTime)
    const time2:Date=new Date(req.body.toTime)
   let t=time2.getTime()-time1.getTime()
   t=Math.floor(t/60000);
   
   const num=Math.floor(t/(60*24));

 
  return res
    .status(200)
    .json({fromTime:req.body.fromTime,toTime:req.body.toTime,unitconsumed:usage,duration:num});
};