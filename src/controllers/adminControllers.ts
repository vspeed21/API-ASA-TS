import { RequestHandler } from 'express';

import Admin from "../models/Admin";

export const addNewAdmin: RequestHandler = async (req, res) => {
  const { email } = req.body;

  const adminExists = await Admin.findOne({email});

  if(adminExists) {
    const error = new Error('Cuenta ya registrada');
    return res.status(400).json({msg: error.message});
  }

	try {
    const admin = new Admin(req.body);
    await admin.save();

    //Enviar email de registro

    res.json({msg: 'Se ha enviado un email para confirmar tu cuenta'});
    
  } catch (error) {
    console.log(error);
  }
}