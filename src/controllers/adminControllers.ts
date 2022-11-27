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
	const { token } = req.params;

	const admin = await Admin.findOne({token});

	if(!admin) {
		const error = new Error('Cuenta no encontrada');
		return res.status(404).json({msg: error.message});
	}

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

	if(admin.token !== null) {
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

export const checkToken = async (req:Request, res:Response) => {
	const { token } = req.params;

	const admin:IAdmin | null = await Admin.findOne({token});

	if(admin === null) {
		const error = new Error('Token no valido/no encontrado');
		return res.status(404).json({msg: error.message});
	}

	res.json({msg: 'Escribe la nueva contraseña'});
}

export const savePassword = async (req:Request, res:Response) => {
	const { password } = req.body;

	const admin:IAdmin | any = await Admin.findOne({token: req.params.token});

	if(admin === null) {
		const error = new Error('Cuenta no encontrada');
		return res.status(404).json({msg: error.message});
	}

	if(await admin.checkPassword(password)) {
		const error = new Error('La nueva contraseña no puede ser igual que la anterior');
		return res.status(400).json({msg: error.message});
	}

	try {
		admin.token = null;
		admin.password = password;
		await admin.save();

		res.status(200).json({msg: 'Contraseña modificada correctamente'});
		
	} catch (error) {
		console.log(error);
	}
}