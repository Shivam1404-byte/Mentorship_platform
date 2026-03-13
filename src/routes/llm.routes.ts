import { Router } from "express";
import { summariseText } from "../controllers/llm.controller";
import { llmLimiter } from "../middleware/rateLimit";

export const llmRoute = Router()

llmRoute.post("/summarise",llmLimiter,summariseText)
