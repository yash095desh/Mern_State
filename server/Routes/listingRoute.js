import express from 'express'
import { validateuser } from '../utils/validate.js'
import { createListing, deleteListing, fetchListing, getlistings, updateListing } from '../controllers/listing.controller.js'


const router = express.Router()

router.post('/create',validateuser,createListing)
router.delete('/delete/:id',validateuser,deleteListing)
router.post('/update/:id',validateuser,updateListing)
router.get('/getlisting/:id',fetchListing)
router.get('/get',getlistings)



export default router