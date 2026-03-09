import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
import { asyncHandler } from '../utils/asyncHandler'
import { Request,Response,NextFunction } from 'express'
import { AppError } from '../utils/appError'
import { prisma } from '../db/config'
import { Role } from '../generated/prisma/enums'
config()

declare global{
    namespace Express{
        interface Request{
            user?:{id:string,role:Role}
        }
    }
}

export const middleware = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers['authorization']

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new AppError("Token not provided",401)
    }

    const token = authHeader.split(" ")[1]

    let decoded

    try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    } catch (err) {
    throw new AppError("Invalid or expired token", 401)
    }

    const user = await prisma.user.findUnique({
        where:{id:decoded.userId}
    })

    if(!user){
        throw new AppError("User not found",404)
    }

    req.user = {
        id:user.id,
        role:user.role
    }

    next()
}) 