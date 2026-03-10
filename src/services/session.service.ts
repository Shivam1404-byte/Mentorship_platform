import {prisma} from "../db/config"
import { AppError } from "../utils/appError"

export const create_session = async(id:string,date:Date,topic:string,summary:string,lessonId:string)=>{
    const lesson = await prisma.lesson.findFirst({
        where:{mentorId:id}
    })

    if(!lesson){
        throw new AppError("lesson not found",404)
    }

    if(lesson.mentorId != id){
        throw new AppError("You cannot create sessions for this lesson", 403)
    }

    const session = await prisma.session.create({
        data:{
            lessonId:lesson.id,
            date:date,
            topic:topic,
            summary:summary
        }
    })

    return session
}

export const get_session = async(id:string,mentorId:string)=>{
    const sessions = await prisma.lesson.findMany({
        where:{mentorId:mentorId},
        include:{
            Session:true
        }
    })

    return sessions
}