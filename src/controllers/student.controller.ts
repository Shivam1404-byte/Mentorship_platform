import { Request,Response } from 'express' 
import { asyncHandler } from '../utils/asyncHandler'
import { Role } from '../generated/prisma/enums'
import { create_student, get_students } from '../services/student.service';

interface CustomRequest extends Request {
  user?: { id: string , role:Role};
}

export const createStudent = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const {name} = req.body
    const userId = req.user?.id
    
    const student = await create_student(name,userId as string)

    res.status(200).json({
        Message:"Student profile created Successfully",
        student:{Id:student.id,Name:student.name}
    })
})

export const getStudent = asyncHandler(async(req:CustomRequest,res:Response)=>{
    const userId = req.user?.id

    const students = await get_students(userId as string)

    res.json(students)
})