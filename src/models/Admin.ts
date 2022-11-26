import { Schema, model } from 'mongoose';
import { IAdmin } from '../interface';
import generateToken from '../helpers/generateToken';
import { NextFunction } from 'express';
import bcrypt from 'bcrypt';


const adminSchema = new Schema<IAdmin>({
  name:{
    type: String,
    required: true,
    trim: true,
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
    trim: true,
  },
  token:{
    type: String,
    default: generateToken()
  },
  confirmed: {
    type: Boolean,
    default: false,
  }
},{
  timestamps: true,
  versionKey: false,
});

adminSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

adminSchema.methods.checkPassword = async function(password:string) {
  return await bcrypt.compare(password, this.password);
}

const Admin = model<IAdmin>('Admins', adminSchema);

export default Admin;