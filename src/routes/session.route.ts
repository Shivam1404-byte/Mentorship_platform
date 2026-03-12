import express from 'express'
import { middleware } from '../middleware/authMiddleware'
import { authoriseRoles } from '../middleware/authoriseRoles'
import { createSession, getSession } from '../controllers/session.controller'

export const sessionRoute = express.Router()

sessionRoute.post('/sessions/create',middleware,authoriseRoles("MENTOR"),createSession)
sessionRoute.get('/lessons/:id/sessions',middleware,authoriseRoles("MENTOR"),getSession)