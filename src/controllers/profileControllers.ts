import Profile from "../models/Profile";
import { Request, Response } from 'express';
import { IProfile } from "../interface";

export const showProfile = (req:Request, res:Response):Response => {
  return res.json(req.admin);
}

export const addProfile = async(req:Request, res:Response) => {
  const profile:IProfile = new Profile(req.body);
  profile.admin = req.admin?._id;
  
  try {
    await profile.save();
    return res.status(200).json({msg: 'profile created succesfully'});
  } catch (error) {
    console.log(error);
  }
}

export const getProfiles = async (req:Request, res:Response):Promise<Response> => {
  const profiles = await Profile.find().where('admin').equals(req.admin?._id);
  return res.json(profiles)
}