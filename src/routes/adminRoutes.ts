import { Router } from "express";
import * as admin from '../controllers/adminControllers';

const router = Router();

router.post('/', admin.addNewAdmin);

export default router;