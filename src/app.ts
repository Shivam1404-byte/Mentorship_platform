import express  from "express";
import { authRoute } from "./routes/auth.route";
import { errorHandler } from "./middleware/errorMiddleware";
import { studentRoute } from "./routes/student.route";


export const app = express() 
app.use(express.json())

app.use('/auth',authRoute)
app.use('/student',studentRoute)

app.get('/',(req,res)=>{
    res.status(200).json("App is running")
})

app.use(errorHandler)