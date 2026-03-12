import { Request,Response } from 'express' 
import { asyncHandler } from '../utils/asyncHandler'
import { Role } from '../generated/prisma/enums'
import { book_session } from '../services/booking.service';

interface CustomRequest extends Request {
  user?: { id: string , role:Role};
}

export const Booking = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const {lessonId,studentId} = req.body
    const parentId = req.user?.id

    const booking = await book_session(lessonId,studentId,parentId as string)

    res.status(200).json({
      Message:"Session booked successfully",
      booking
    })
})