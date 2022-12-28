import { Schema } from 'mongoose';

export interface IAdmin {
  _id?: Schema.Types.ObjectId,
  name: string,
  email: string,
  password: string,
  token: string | null,
  confirmed: boolean,
}

export interface IProfile {
  name: string,
  screen: string,
  pin: number
  deadline: string,
  admin?: Schema.Types.ObjectId,
  save: () => void
}