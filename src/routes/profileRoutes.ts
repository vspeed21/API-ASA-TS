import { Router } from "express";
import checkAuth from "../middleware/checkAuth";
import * as profile from '../controllers/profileControllers';

const router = Router();
    
router.get('/perfil', checkAuth, profile.showProfile);


export default router;