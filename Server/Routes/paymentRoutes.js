import express from "express";

const router = express.Router();
const auth = require('../middleware/auth');
const { initiatePayment, verifyPayment, getPlans } = require('../controllers/paymentController');


router.get('/plans', getPlans);


router.post('/initiate', auth, initiatePayment);


router.post('/verify', verifyPayment);

export default router;