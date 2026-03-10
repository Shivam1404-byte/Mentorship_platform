import express from "express"
import { middleware } from "../middleware/authMiddleware"
import { authoriseRoles } from "../middleware/authoriseRoles"
import { createLessons } from "../controllers/lesson.controller"

export const lessonRoute = express.Router()

lessonRoute.post('/create',middleware,authoriseRoles("MENTOR"),createLessons)