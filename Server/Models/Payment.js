import mongoose from "mongoose"

const paymentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    planType: {
      type: String,
      enum: ['bronze', 'silver', 'gold'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    transactionId: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending'
    },
    invoiceNumber: String
  }, { timestamps: true });
  
export default mongoose.model('Payment', paymentSchema);