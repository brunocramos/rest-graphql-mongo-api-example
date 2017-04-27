import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now },
}, { collection: 'users' });

export default mongoose.model('User', schema);
