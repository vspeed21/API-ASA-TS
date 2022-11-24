import { RequestHandler } from 'express';

import Admin from "../models/Admin";

export const addNewAdmin: RequestHandler = async (req, res) => {
	res.send('hola express con eslint');
}