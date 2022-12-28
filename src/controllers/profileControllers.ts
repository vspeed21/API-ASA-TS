import Profile from "../models/Profile";
import { Request, Response } from 'express';

export const showProfile = (req: Request, res:Response): Response => {
  return res.json(req.admin);
}