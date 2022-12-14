import { RequestHandler } from "express";
import { Login } from "../models/login";
import { User } from "../models/user";
import { LoginUser } from "../models/loginUser";
import { v4 as uuid } from 'uuid';
const { QueryTypes } = require('sequelize');
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Sequelize } from "sequelize-typescript";
import bcrypt from 'bcrypt';
// import { env } from 'process';
import * as dotenv from "dotenv";
 dotenv.config();
// const key=require('dotenv').config({path:"../.env"} );
require("path")

//login
export const loginSession: RequestHandler = async (req, res, next) => {
    const myId = uuid();
    
    var currData;

   const v=req.body;
   
    var loginUser=LoginUser.build({username:v.username,password:v.password,email:v.email,mobileNum:v.mobileNum})

    if(v.username!=undefined)
    {currData=await User.findOne({ where: { username: loginUser.username  }});}

  else if(v.email!=undefined)
  {currData=await User.findOne({ where: { email: loginUser.email }});}

  else if(v.mobileNum!=undefined)
  {currData=await User.findOne({ where: { mobileNum: loginUser.mobileNum }});}
  
    console.log(currData)
//   console.log(currData?.length)
  if(currData==undefined)
  {
    return res
      .status(400)
      .json({ message: "User not registered"}); 
  } 


  const alreadyPresnt=await Login.findOne({
    where: {
     userId: currData.id
     
    }});

  if(alreadyPresnt!=undefined)
  {
    return res
    .status(400)
    .json({ message: "User already logged in"}); 
  }

  
  const isMatch = bcrypt.compareSync(v.password, currData.password);
  if(isMatch)
  {   
    const check=process.env.JWT_SECRET ||""
    
    
    const token1 = jwt.sign({ id: currData.id?.toString(), username: currData.username }, check,{
        expiresIn: '4m'
    });
      console.log(token1)
     var USER = await Login.create({username:currData.username,token:token1,userId:currData.id,date:Date.now()});
    
    return res
      .status(200)
      .json({ message: "logged in  successfully", data: USER});
  }

  else 
  {
    return res
    .status(400)
    .json({ message: "Incorrect password"});
  }

}

  export const getAllcurrentUSER: RequestHandler = async (req, res, next) => {
  
    const allUSER: Login[] = await Login.findAll();
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


  //logout
  export const logoutSession: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const deletedUsage=  await Login.findOne({
        where: {
         userId: id
         
        }});console.log(deletedUsage)
        if(deletedUsage==undefined)
        {
            return res
            .status(400)
            .json({ message: " Invalid id" });
        }
        const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log(token)
        const check=process.env.JWT_SECRET ||""
        if(token==deletedUsage.token)
    {await Login.destroy({ where: { id:deletedUsage.id } });
    
    return res
      .status(200)
      .json({ message: `${ deletedUsage.username} loged out successfully` });
    }
    return res
    .status(400)
    .json({ message: "Autenticate" }); 
  };