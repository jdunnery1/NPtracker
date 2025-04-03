import { Router } from 'express'
import {createUser, getAllUsers, getUser, visitPark} from "../controllers/user.controller.js";

const router = Router()

router.get('/', getAllUsers)
router.get('/auth', getUser)
router.post('/create', createUser)
router.put('/visit', visitPark)

export default router