import { Request,Response } from 'express' 
import { asyncHandler } from '../utils/asyncHandler'
import { Role } from '../generated/prisma/enums'
import { create_lessons } from '../services/lesson.service';

interface CustomRequest extends Request {
  user?: { id: string , role:Role};
}

export const createLessons = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const {title,description} = req.body
    const mentorId = req.user?.id

    const lesson = await create_lessons(title,description,mentorId as string)

    res.status(200).json({
        Message:"Lesson created Successfully",
        Lesson:{Id:lesson.id,title:lesson.title,description:lesson.description}
    })
})