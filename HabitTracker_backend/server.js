import express from "express";
import { configDotenv } from "dotenv";
import userRouter from './routes/user.route.js'
import habitRouter from './routes/habit.route.js'
import cors from 'cors'



configDotenv()

const app = express();
app.use(express.json());
app.use(cors())


app.listen(process.env.PORT, () => {
    console.log(`App is running on PORT ${process.env.PORT}`)
})


app.use('/api', userRouter);
app.use('/api', habitRouter)


