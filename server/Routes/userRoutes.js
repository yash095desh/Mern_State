import express from 'express'
import { deleteUser, getUser, showlisting, signOut, test, updateUser } from '../controllers/user.controller.js';
import { validateuser } from '../utils/validate.js';

const router = express.Router()

router.get("/test",test)
router.post("/update/:id",updateUser)
router.delete("/delete/:id",deleteUser)
router.get("/signOut/:id",signOut)
router.get('/listing/:id',showlisting)
router.get('/:id',getUser)
export default router;