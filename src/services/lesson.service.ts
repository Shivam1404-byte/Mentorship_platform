import {prisma} from "../db/config"
import { AppError } from "../utils/appError"

export const create_lessons = async(title:string,description:string,id:string)=>{
    if (!title){
        throw new AppError("Title required",402)
    }

    if(!description){
        throw new AppError("Description Required",402)
    }

    const lesson = await prisma.lesson.create({
        data:{
            title:title,
            description:description,
            mentorId:id
        }
    })

    return lesson
}