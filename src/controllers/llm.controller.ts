import { Request,Response } from "express";
import { summarise_text } from "../services/llm.service";

const MIN_TEXT=50
const MAX_TEXT=10000

export const summariseText = async(req:Request,res:Response)=>{
    try{
        const {text} = req.body

        if(!text || text.trim().length === 0){
            return res.status(400).json({Error:"Text required"})
        }

        if(text.length < MIN_TEXT){
            return res.status(400).json({
                Error:"Text must be atleast 50 characters"
            })
        }

        if (text.length > MAX_TEXT){
            return res.status(403).json({
                Error:"Text exceeds maximum allowed length"
            })
        }

        const result = await summarise_text(text);

        return res.json({
            result
        });

    }
    catch(err){
        console.error(err)

        res.status(500).json({
            Error:"LLM service unavailable"
        })
    }
}
