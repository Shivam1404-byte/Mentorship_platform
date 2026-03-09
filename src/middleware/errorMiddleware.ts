import { Request,Response,NextFunction } from "express";
import { AppError } from "../utils/appError";

export const errorHandler = async(err:any,req:Request,res:Response,next:NextFunction)=>{
    if (err instanceof AppError){
        return res.status(err.statusCode).json({Error:err.message})
    }
    console.error(err)
    return res.status(500).json({Error:"Internal Server Error"})

}