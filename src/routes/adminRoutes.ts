import { Router } from "express";
import * as admin from '../controllers/adminControllers';
import checkAuth from "../middleware/checkAuth";

const router = Router();

//Public Requests
router.post('/', admin.addNewAdmin);
router.get('/confirm/:token', admin.confirmAccount);
router.post('/forgot-password', admin.forgotPasswordSendEmail);
router.get('/verify-token/:token', admin.checkToken);
router.post('/save-password/:token', admin.savePassword);
router.post('/login', admin.login);

//Private Requests
router.put('/profile/:id', checkAuth, admin.updateProfile);
router.put('/change-password', checkAuth, admin.changePassword);

export default router;