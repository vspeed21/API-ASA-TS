import { Router } from "express";
import checkAuth from "../middleware/checkAuth";
import * as profile from '../controllers/profileControllers';

const router = Router();
    
router.get('/profileList', checkAuth, profile.showProfile);

router.route('/')
  .post(checkAuth, profile.addProfile)

export default router;