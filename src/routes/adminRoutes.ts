import { Router } from "express";
import * as admin from '../controllers/adminControllers';

const router = Router();

//Public Requests
router.post('/', admin.addNewAdmin);
router.get('/confirm/:token', admin.confirmAccount);
router.post('/forgot-password', admin.forgotPasswordSendEmail);
router.get('/verify-token/:token', admin.checkToken);
router.post('/save-password/:token', admin.savePassword);


export default router;