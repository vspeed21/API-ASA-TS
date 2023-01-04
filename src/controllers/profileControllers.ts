import Profile from "../models/Profile";
import { Request, Response } from 'express';
import { IProfile } from "../interface";
import { isObjectIdOrHexString } from "mongoose";

export const showProfile = (req:Request, res:Response):Response => {
  return res.json(req.admin);
}

export const addProfile = async(req:Request, res:Response) => {
  const profile:IProfile = new Profile(req.body);
  profile.admin = req.admin?._id;
  
  try {
    await profile.save();
    return res.status(200).json({msg: 'profile created succesfully', profile});
  } catch (error) {
    console.log(error);
  }
}

export const getProfiles = async (req:Request, res:Response):Promise<Response> => {
  const profiles = await Profile.find().where('admin').equals(req.admin?._id);
  return res.json(profiles)
}

export const updateProfile = async (req:Request, res:Response) => {
  const { id } = req.params;

  const isValid:boolean = isObjectIdOrHexString(id);
  if(!isValid){
    const error = new Error("Invalid id");
    return res.status(404).json({msg: error.message});
  }

  const profile:IProfile | null = await Profile.findById(id);

  if(!profile){
    const error = new Error("Profile not found");
    return res.status(404).json({msg: error.message});
  }

  if(profile.admin?.toString() !== req.admin?._id?.toString()) {
    return res.json({msg: 'Unauthorizated'})
  }

  try {
    profile.name = req.body.name || profile.name;
    profile.screen = req.body.screen || profile.screen;
    profile.pin = req.body.pin || profile.pin;
    profile.deadline = req.body.deadline || profile.deadline;

    const profileSaved = await profile.save();
    res.json(profileSaved);

  } catch (error) {
    console.log(error)
  }
}

export const destroyProfile = async (req:Request, res:Response) => {
  const { id } = req.params;

  const isValid:boolean = isObjectIdOrHexString(id);
  if(!isValid){
    const error = new Error("Invalid id");
    return res.status(404).json({msg: error.message});
  }

  const profile:IProfile | null = await Profile.findById(id);
  
  if(!profile){
    const error = new Error("Profile not found");
    return res.status(404).json({msg: error.message});
  }

  if(profile.admin?.toString() !== req.admin?._id?.toString()) {
    return res.json({msg: 'Unauthorizated'})
  }

  try {
    const profileDeleted = await profile.deleteOne();
    res.json({
      msg: 'Profile deleted succesfully',
      profileDeleted,
    })

  } catch (error) {
    console.log(error)
  }
}