import { Schema, model } from 'mongoose';
import { IProfile } from '../interface';

const profileSchema = new Schema<IProfile>({
  name:{
    type: String,
    required: true,
    trim: true,
  },

  screen:{
    type: String,
    required: true,
    trim: true
  },
  pin:{
    type: Number,
    required: true,
    trim: true,
  },

  deadline: {
    type: String,
    required: true,
    trim: true,
  },
  admin:{
    type: Schema.Types.ObjectId,
    ref: 'Admin',
  }
},{
  timestamps: true,
  versionKey: false,
});


const Profile = model<IProfile>('Profiles', profileSchema);

export default Profile;