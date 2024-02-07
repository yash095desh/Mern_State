import express from 'express'
import { validateuser } from '../utils/validate.js'
import { createListing } from '../controllers/listing.controller.js'


const router = express.Router()

router.post('/create',validateuser,createListing)



export default router