import {prisma} from '../db/config'
import bcrypt from 'bcrypt'
import { AppError } from '../utils/appError'
import { Role } from '../generated/prisma/enums'


export const register = async(email:string,password:string,role:Role)=>{
    if(!email || !password){
        throw new AppError("Email and password required!",400)
    }

    if (!Object.values(Role).includes(role)){
        throw new AppError("Invalid role",400)
    }

    const checkUser = await prisma.user.findUnique({
        where:{email:email}
    })

    if(checkUser){
        throw new AppError("User already exist",401)
    }

    const password_hash = await bcrypt.hash(password,10)

    const user = await prisma.user.create({
        data:{
            email:email,
            password:password_hash,
            role:role
        }
    })

    return {
        id: user.id,
        email: user.email,
    }
}

export const login = async(email:string,password:string,role:Role) => {
    if (!email || !password || !role){
        throw new AppError("Email , password and role required",401)
    }

    if (!Object.values(Role).includes(role)){
        throw new AppError("Invalid role",400)
    }


    const checkUser = await prisma.user.findUnique({
        where:{email:email,role:role}
    })

    if(!checkUser){
        throw new AppError("Invalid credentials",401)
    }

    const checkPassword = await bcrypt.compare(password,checkUser.password)
    if(!checkPassword){
        throw new AppError("Invalid Credentials",401)
    }

    return {
        id: checkUser.id,
        email: checkUser.email,
    }
}

export const user = async(id:string)=>{
    const checkUser = await prisma.user.findUnique({
        where:{id:id}
    })

    if(!checkUser){
        throw new AppError("User not found",404)
    }

    return {
        id:checkUser.id,
        email:checkUser.email,
        Role:checkUser.role
    }
}