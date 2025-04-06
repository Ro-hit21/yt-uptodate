import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  points: { type: Number, default: 0 },
});

export default mongoose.model('Userr', UserSchema);
