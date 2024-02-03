import express from 'express'
import { googleSign, signIn, signUp } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signUp',signUp)
router.post('/signIn',signIn)
router.post('/google',googleSign)

export default router