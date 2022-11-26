import { Schema, model, ObjectId, isValidObjectId } from 'mongoose';
import { IAdmin } from '../interface';
import generateToken from '../helpers/generateToken';


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

const Admin = model<IAdmin>('Admins', adminSchema);

export default Admin;