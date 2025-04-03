import { Router } from 'express'
import {getAllParks, scrapeNParks, uploadPark} from "../controllers/park.controller.js";

const router = Router()

router.get('/', getAllParks)
router.post('/create', uploadPark)
router.get('/scrapeNational', scrapeNParks)

export default router