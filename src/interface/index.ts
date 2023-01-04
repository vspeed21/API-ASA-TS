import { Schema } from 'mongoose';

export interface IAdmin {
  _id?: Schema.Types.ObjectId,
  name: string,
  email: string,
  password: string,
  token: string | null,
  confirmed: boolean,
  save: () => void,
}

export interface IProfile {
  name: string,
  screen: string,
  pin: number
  deadline: string,
  admin?: Schema.Types.ObjectId,
  save: () => void,
  deleteOne: () => void,
}