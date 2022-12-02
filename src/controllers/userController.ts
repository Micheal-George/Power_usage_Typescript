import { RequestHandler } from "express";
import { Powers } from "../models/power";
import { User } from "../models/user";
import { v4 as uuid } from 'uuid';
export const createUSER: RequestHandler = async (req, res, next) => {
   const v=req.body ;
   const pUsage = User.hasMany(Powers, { as: 'categories' });
  var USER = await User.create({ username:v.username,displayName:v.displayName,password:v.password,email:v.email,mobileNum:v.mobileNum});
  
  return res
    .status(200)
    .json({ message: "created successfully", data: USER});
};



export const getAllUSER: RequestHandler = async (req, res, next) => {
  
  const allUSER: User[] = await User.findAll({include:[Powers]});
  if(allUSER.length==0)
  {
    return res
    .status(400)
    .json({ message: " No User"});
  }
  return res
    .status(200)
    .json({ message: " fetched successfully", data: allUSER });
};

export const getUSERById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const USER: User | null = await User.findByPk(id,{include:[Powers]});
  if(USER==null)
  {
    return res
    .status(400)
    .json({ message: " Invalid user ID"});
  }
  return res
    .status(200)
    .json({ message: " fetched successfully", data: USER });
};

export const updateUSER: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await User.update({ ...req.body }, { where: { id } });
  const updatedUSER: User | null = await User.findByPk(id);
  if(updatedUSER==null)
  {
    return res
    .status(400)
    .json({ message: " Invalid user ID"});
  }
  return res
    .status(200)
    .json({ message: "updated successfully", data: updatedUSER });
};

