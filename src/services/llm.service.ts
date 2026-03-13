import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const summarise_text = async(text:string)=>{
    const model = genAI.getGenerativeModel({
        model:"gemini-2.5-flash"
    })

    const prompt = `
        Summarize the following text into 3-6 bullet points.

        Text:
        ${text}
        `;
     const result = await model.generateContent(prompt);

  const response = await result.response;

  return response.text();
}