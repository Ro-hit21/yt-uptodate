const User = require('../Models/User');
const Payment = require('../Models/Payment');
const { sendInvoiceEmail } = require('../services/emailService');

const PLANS = {
  bronze: { price: 10, duration: 7*60, name: 'Bronze' },
  silver: { price: 50, duration: 10*60, name: 'Silver' },
  gold: { price: 100, duration: null, name: 'Gold' }
};

exports.getPlans = async (req, res) => {
  res.json(PLANS);
};

exports.initiatePayment = async (req, res) => {
  try {
    const { planType } = req.body;
    
    if (!PLANS[planType]) {
      return res.status(400).json({ error: 'Invalid plan type' });
    }


    const payment = new Payment({
      user: req.user._id,
      planType,
      amount: PLANS[planType].price,
      status: 'pending'
    });

    await payment.save();
    
  
    res.json({
      paymentId: payment._id,
      amount: payment.amount,
      planType: payment.planType
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { paymentId, transactionId } = req.body;
    
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

 
    payment.status = 'success';
    payment.transactionId = transactionId;
    payment.invoiceNumber = `INV-${Date.now()}`;
    await payment.save();

    
    const user = await User.findById(payment.user);
    user.planType = payment.planType;
    user.planExpiry = new Date(Date.now() + 30*24*60*60*1000); 
    user.paymentHistory.push(payment._id);
    await user.save();


    await sendInvoiceEmail(user.email, payment);

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};