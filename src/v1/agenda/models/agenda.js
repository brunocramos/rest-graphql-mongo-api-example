import mongoose from 'mongoose';

const schema = mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  title: String,
  date: Date,
  createdAt: { type: Date, default: Date.now },
  invitedUsers: [mongoose.Schema.ObjectId],
}, { collection: 'agenda' });

export default mongoose.model('Agenda', schema);
