import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import './PlanSelection.css';

const PlanSelection = ({ currentPlan, onUpgrade }) => {
  const [loading, setLoading] = useState(false);
  
  const plans = [
    { id: 'free', name: 'Free', price: 0, duration: '5 min videos' },
    { id: 'bronze', name: 'Bronze', price: 10, duration: '7 min videos' },
    { id: 'silver', name: 'Silver', price: 50, duration: '10 min videos' },
    { id: 'gold', name: 'Gold', price: 100, duration: 'Unlimited videos' }
  ];

  const handleUpgrade = async (planId) => {
    if (planId === 'free') return;
    
    setLoading(true);
    try {

      const { data } = await axios.post('/api/payment/initiate', { planType: planId });
      
      
      await axios.post('/api/payment/verify', {
        paymentId: data.paymentId,
        transactionId: `txn_${Date.now()}`
      });
      
      onUpgrade(planId);
      alert('Payment successful! Your plan has been upgraded.');
    } catch (err) {
      alert(err.response?.data?.error || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="plan-container">
      {plans.map(plan => (
        <div key={plan.id} className={`plan-card ${plan.id}`}>
          <h3>{plan.name}</h3>
          <p>{plan.duration}</p>
          <p>₹{plan.price}/month</p>
          {currentPlan === plan.id ? (
            <button disabled className="current-plan">Current Plan</button>
          ) : (
            <button 
              onClick={() => handleUpgrade(plan.id)}
              disabled={loading || plan.price === 0}
            >
              {loading ? 'Processing...' : plan.price === 0 ? 'Free' : 'Upgrade'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlanSelection;