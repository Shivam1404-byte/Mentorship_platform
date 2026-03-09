import express from "express"
import { Login, Register, User } from "../controllers/auth.controller"
import { middleware } from "../middleware/authMiddleware"

export const authRoute = express.Router()

authRoute.post('/register',Register)
authRoute.post('/login',Login)
authRoute.get('/get/me',middleware,User)