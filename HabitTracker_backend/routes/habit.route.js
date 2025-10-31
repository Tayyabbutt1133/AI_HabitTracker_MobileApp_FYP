import express from "express";
import { postHabit, getHabitbyUserId, getHabitDetailById, deleteHabitById, updateHabit } from '../controllers/habit.controller.js'


const router = express.Router();


router.post('/post-habit', postHabit);
router.get('/user-habit/:userId', getHabitbyUserId);
router.get('/habit-detail/:habitId', getHabitDetailById)
router.delete('/delete-habit/:habitId', deleteHabitById)
router.put('/update-habit/:habitId', updateHabit)

export default router