import {prisma} from "../db/config"
import { AppError } from "../utils/appError"


export const create_student = async(name:string,id:string)=>{
    if(!name){
        throw new AppError("Name required!",403)
    }

    const student = await prisma.student.create({
        data:{
            name:name,
            parentId:id
        }
    })

    return student
}

export const get_students = async(id:string)=>{
    const student = await prisma.student.findMany({
        where:{parentId:id}
    })

    return student
}