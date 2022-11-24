import { Schema, model } from 'mongoose';
import { IAdmin } from '../interface';


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
  },
  confirmed: {
    type: Boolean,
    default: false,
  }
},{
  timestamps: true,
  versionKey: false,
});

const Admin = model('Admins', adminSchema);

export default Admin;