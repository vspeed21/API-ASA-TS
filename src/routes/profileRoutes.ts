import { Router } from "express";
import checkAuth from "../middleware/checkAuth";
import * as profile from '../controllers/profileControllers';

const router = Router();
    
router.get('/profileList', checkAuth, profile.showProfile);

router.route('/')
  .post(checkAuth, profile.addProfile)
  .get(checkAuth, profile.getProfiles)

router.route('/:id')
  .put(checkAuth, profile.updateProfile)
  .delete(checkAuth, profile.destroyProfile)

export default router;