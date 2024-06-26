import { RequestHandler, Response, Request } from 'express';
import { IAdmin } from '../interface';

import Admin from "../models/Admin";
import generateToken from '../helpers/generateToken';
import generateJWT from '../helpers/generarteJWT';
import sendEmailSignUp from '../helpers/signUpEmail';
import sendEmailPassword from '../helpers/forgotPasswordEmail';
import { isObjectIdOrHexString } from 'mongoose';

export const addNewAdmin: RequestHandler = async (req, res) => {
	const { email } = req.body;
  const host = email.split('@')[1].split('.')[0];

	const adminExists:IAdmin | null  = await Admin.findOne({ email });

	if (adminExists) {
		const error = new Error('Account already registered. Log in');
		return res.status(404).json({ msg: error.message });
	}

	try {
		const admin = new Admin(req.body);
		await admin.save();

		sendEmailSignUp({
      name: admin.name,
      email,
      token: admin.token,
      host,
    })

		res.status(201).json({ msg: 'Check your email to confirm your account' });

	} catch (error) {
		console.log(error);
	}
}

export const confirmAccount: RequestHandler = async (req, res) => {
	const { token } = req.params;

	const admin = await Admin.findOne({token});

	if(!admin) {
		const error = new Error('Account not found');
		return res.status(404).json({msg: error.message});
	}

	try {
		if(admin != null) {
			admin.token = null;
			admin.confirmed = true;
			await admin.save();
		}

		res.status(200).json({msg: 'Account confirmed successfully'});

		
	} catch (error) {
		console.log(error);
	}

}

export const forgotPasswordSendEmail = async (req:Request, res:Response) => {
	const { email } = req.body;

	const admin:IAdmin | any = await Admin.findOne({email});

	if(!admin) {
		const error = new Error('Account not registered yet');
		return res.status(404).json({ msg: error.message });
	}

	if(admin.token !== null) {
		const error = new Error('Email has already been sent');
		return res.status(429).json({ msg: error.message });
	}

	try {
		if(admin !== null) {
			admin.token = generateToken();
			await admin.save();
		}

    sendEmailPassword({
      email,
      name: admin.name,
      token: admin.token,
    })

		res.status(200).json({msg: 'Email has been sent'});

		
	} catch (error) {
		console.log(error);
	}
}

export const checkToken = async (req:Request, res:Response) => {
	const { token } = req.params;

	const admin:IAdmin | null = await Admin.findOne({token});

	if(admin === null) {
		const error = new Error('Token no valido/no encontrado');
		return res.status(404).json({msg: error.message});
	}

	res.json({msg: 'Type your new password'});
}

export const savePassword = async (req:Request, res:Response) => {
	const { password } = req.body;

	const admin:IAdmin | any = await Admin.findOne({token: req.params.token});

	if(admin === null) {
		const error = new Error('Account not found');
		return res.status(404).json({msg: error.message});
	}

	if(await admin.checkPassword(password)) {
		const error = new Error("The new password can't be the same as the old one");
		return res.status(400).json({msg: error.message});
	}

	try {
		admin.token = null;
		admin.password = password;
		await admin.save();

		res.status(200).json({msg: 'Password modified successfully'});
		
	} catch (error) {
		console.log(error);
	}
}

export const login = async (req:Request, res:Response) => {
	const { email, password } = req.body;
	
	const admin: IAdmin | any = await Admin.findOne({email});

	
	if(admin === null) {
		const error = new Error('Account not registered yet');
		return res.status(404).json({msg: error.message});
	}

	if(!admin.confirmed) {
		const error = new Error('Account has not been confirmed yet');
		return res.status(404).json({msg: error.message});
	}

	if(await admin.checkPassword(password)) {
		res.status(200).json({token: generateJWT(admin._id)})
	}else{
		const error = new Error('La contraseña es incorrecta');
		return res.status(404).json({msg: error.message});
	}

}

//Private Requests
export const updateProfile = async (req: Request, res:Response) => {
  const {id} = req.params;
 
  const isValid:boolean = isObjectIdOrHexString(id);
  if(!isValid){
    const error = new Error("Invalid id");
    return res.status(404).json({msg: error.message});
  }

  const admin:IAdmin | null = await Admin.findById(id);
  if(!admin) {
    const error = new Error("Admin not found");
    return res.status(404).json({msg: error.message});
  }

  try {
    admin.name = req.body.name || admin.name
    admin.email = req.body.email || admin.email

    await admin.save();
    res.status(200).json({msg: 'Profile Updated successfully'});

  } catch (error) {
    console.log(error);
  }
}

export const changePassword = async (req: Request, res: Response) => {
  const adminId = req.admin?._id;

  const isValid:boolean = isObjectIdOrHexString(adminId);
  if(!isValid){
    const error = new Error("Invalid id");
    return res.status(404).json({msg: error.message});
  }

  const admin:IAdmin | any = await Admin.findById(adminId);
  if(!admin) {
    const error = new Error("Account not found");
    return res.status(404).json({msg: error.message});
  }

  if(!await admin.checkPassword(req.body.current)) {
    const error = new Error('Current password is incorrect');
    return res.status(404).json({msg: error.message});
  }

  if(await admin.checkPassword(req.body.new)) {
    const error = new Error('The new password cannot be the same as the current password');
    return res.status(404).json({msg: error.message});
  }

  try {
    admin.password = req.body.new;
    await admin.save();
    res.status(200).json({msg: 'Password modified successfully'});

  } catch (error) {
    console.log(error);
  }
}