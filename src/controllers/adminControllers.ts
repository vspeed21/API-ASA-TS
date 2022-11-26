import { RequestHandler, Response, Request } from 'express';
import { IAdmin } from '../interface';
import mongoose from 'mongoose';

import Admin from "../models/Admin";
import generateToken from '../helpers/generateToken';

export const addNewAdmin: RequestHandler = async (req, res) => {
	const { email } = req.body;

	const adminExists:IAdmin | null  = await Admin.findOne({ email });

	if (adminExists) {
		const error = new Error('Cuenta ya registrada');
		return res.status(201).json({ msg: error.message });
	}

	try {
		const admin = new Admin(req.body);
		await admin.save();

		//Enviar email de registro

		res.json({ msg: 'Se ha enviado un email para confirmar tu cuenta' });

	} catch (error) {
		console.log(error);
	}
}

export const confirmAccount: RequestHandler = async (req, res) => {
	const isValid = mongoose.isObjectIdOrHexString(req.params.id);

	if(!isValid) {
		const error = new Error('Cuenta no encontrada');
		return res.status(404).json({msg: error.message});
	}

	const admin:IAdmin | any  = await Admin.findById({_id: req.params.id});

	try {
		if(admin != null) {
			admin.token = null;
			admin.confirmed = true;
			await admin.save();
		}

		res.status(200).json({msg: 'Cuenta confirmada correctamente'});

		
	} catch (error) {
		console.log(error);
	}

}

export const forgotPasswordSendEmail = async (req:Request, res:Response) => {
	const { email } = req.body;

	const admin:IAdmin | any = await Admin.findOne({email});

	if(!admin) {
		const error = new Error('Cuenta no registrada aún');
		return res.status(404).json({ msg: error.message });
	}

	if(admin.token !== '') {
		const error = new Error('Ya se ha enviado un correo');
		return res.status(429).json({ msg: error.message });
	}

	try {
		if(admin !== null) {
			admin.token = generateToken();
			await admin.save();
		}

		res.status(200).json({msg: 'Se ha enviado un correo con las instrucciones'});

		
	} catch (error) {
		console.log(error);
	}
}