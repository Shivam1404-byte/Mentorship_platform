import { Request,Response,NextFunction } from "express";
import { AppError } from "../utils/appError";

export const authoriseRoles = (...roles:string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if (!req.user){
            return next(new AppError("Unauthorised access",401))
        }

        if (!roles.includes(req.user.role)){
            return next(new AppError("Forbidden",403))
        }
        next()
    }
}