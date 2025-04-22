import mongoose from "mongoose"


const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  points: { type: Number, default: 0 },
  planType: {
    type: String,
    enum: ['free', 'bronze', 'silver', 'gold'],
    default: 'free'
  },
  planExpiry: Date,
  paymentHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  }]
}, { timestamps: true });

export default mongoose.model('Userr', UserSchema);
