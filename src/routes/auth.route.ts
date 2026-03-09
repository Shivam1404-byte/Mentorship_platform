import express from "express"
import { Login, Register } from "../controllers/auth.controller"

export const authRoute = express.Router()

authRoute.post('/register',Register)
authRoute.post('/login',Login)