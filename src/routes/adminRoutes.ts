import { Router } from "express";
import * as admin from '../controllers/adminControllers';

const router = Router();

//Public Requests
router.post('/', admin.addNewAdmin);
router.get('/confirm/:id', admin.confirmAccount);


export default router;