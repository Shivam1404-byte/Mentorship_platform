import {prisma} from "../db/config"
import { AppError } from "../utils/appError"

export const book_session = async(lessonId:string,studentId:string,id:string)=>{
    if(!lessonId || !studentId){
        throw new AppError("ID required",402)
    }

    const lesson = await prisma.lesson.findUnique({
        where:{id:lessonId}
    })

    if (!lesson){
        throw new AppError("Lesson not found",404)
    }

    const student = await prisma.student.findUnique({
        where:{id:studentId}
    })

    if(!student){
        throw new AppError("Student not found",404)
    }

    if(student.parentId !== id){
        throw new AppError("You cannot book for this student",403)
    }

    const booking = await prisma.booking.create({
        data:{
            lessonId:lessonId,
            studentId:studentId
        }
    })

    return booking
}