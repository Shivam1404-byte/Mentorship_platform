import { Request,Response } from 'express' 
import {login,register} from '../services/auth.service'
import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler'
import { config } from 'dotenv'
config()

export const Register = asyncHandler(async(req:Request,res:Response)=>{
    const {email,password,role} = req.body

    const user = await register(email,password,role)

    res.status(200).json({
        Message:"User registered successfully",
        User:user
    })
})

export const Login = asyncHandler(async(req:Request,res:Response)=>{
    const {email,password,role} = req.body

    const user = await login(email,password,role)

    const token = jwt.sign(
        {userId:user.id},
        process.env.JWT_SECRET!,
        {expiresIn:"1h"}
    )

    res.status(200).json({
        message:"Login Successfull",
        User:user,
        token
    })
})