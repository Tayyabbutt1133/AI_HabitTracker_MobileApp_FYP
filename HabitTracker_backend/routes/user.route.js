import express from "express";
import { signup, login, changePassword } from '../controllers/user.controller.js'

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.put('/change-password', changePassword);

export default router

