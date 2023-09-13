import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  mobile: {
    type: Number,
    require: true
  },
  password: {
    type: String,
    require: true,
  }
  
}, { timestamps: true });

const UserModel = mongoose.model('user', userSchema);
export default UserModel;