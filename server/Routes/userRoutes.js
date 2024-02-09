import express from 'express'
import { deleteUser, getUser, showlisting, signOut, test, updateUser } from '../controllers/user.controller.js';
import { validateuser } from '../utils/validate.js';

const router = express.Router()

router.get("/test",test)
router.post("/update/:id",validateuser,updateUser)
router.delete("/delete/:id",validateuser,deleteUser)
router.get("/signOut/:id",validateuser,signOut)
router.get('/listing/:id',validateuser,showlisting)
router.get('/:id',validateuser,getUser)
export default router;