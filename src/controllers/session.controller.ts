import { Request,Response } from 'express' 
import { asyncHandler } from '../utils/asyncHandler'
import { Role } from '../generated/prisma/enums'
import { create_session, get_session } from '../services/session.service';

interface CustomRequest extends Request {
  user?: { id: string , role:Role};
}

export const createSession = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const {lessonId,date,topic,summary} = req.body
    const mentorId = req.user?.id

    const session = await create_session(mentorId as string,new Date(date),topic,summary,lessonId)

    res.status(200).json({
        Message:"Session created successfully",
        Session:{Id:session.id,Topic:session.topic,Time:session.date}
    })
})

export const getSession = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const mentorId = req.user?.id
    const {id} = req.params

    const sessions = await get_session(id as string,mentorId as string)

    res.status(200).json({
        sessions
    })
})