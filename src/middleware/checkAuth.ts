import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { IAdmin } from '../interface';
import Admin from '../models/Admin';

interface IDecoded {
  id: string,
  iat: number,
  exp: number,
}

const checkAuth = async (req:Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1];

  if(token) {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as IDecoded;
      req.admin = await Admin.findById(decoded.id) as IAdmin;
      
      return next();
    } catch (error) {
      console.log(error);
    }
  }
  
  if(!token) {
    const error = new Error("There isn't token in headers");
    return res.status(404).json({msg: error.message});
  }
}

export default checkAuth;