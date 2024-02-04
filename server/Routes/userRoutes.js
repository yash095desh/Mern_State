import express from 'express'
import { test, updateUser } from '../controllers/user.controller.js';
import { validateuser } from '../utils/validate.js';

const router = express.Router()

router.get("/test",test)
router.post("/update/:id",validateuser,updateUser)

export default router;