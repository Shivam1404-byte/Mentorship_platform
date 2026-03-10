import express from "express"
import { middleware } from "../middleware/authMiddleware"
import { authoriseRoles } from "../middleware/authoriseRoles"
import { createStudent, getStudent } from "../controllers/student.controller"

export const studentRoute = express.Router()

studentRoute.post('/create',middleware,authoriseRoles("PARENT"),createStudent)
studentRoute.get('/get',middleware,authoriseRoles("PARENT"),getStudent)