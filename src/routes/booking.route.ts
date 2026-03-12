import express from "express"
import { middleware } from "../middleware/authMiddleware"
import { authoriseRoles } from "../middleware/authoriseRoles"
import { Booking } from "../controllers/booking.controller"

export const bookRoute = express.Router()

bookRoute.post('/booking',middleware,authoriseRoles("PARENT"),Booking)