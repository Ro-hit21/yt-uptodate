import React, { useState } from 'react';
import PlanSelection from './PlanSelection';

const VideoPlayer = ({ video }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const { user } = useAuth(); 

  const checkAccess = () => {
    if (user.planType === 'gold') return true;
    
    const maxDuration = {
      free: 5 * 60,
      bronze: 7 * 60,
      silver: 10 * 60
    }[user.planType];
    
    return video.duration <= maxDuration;
  };

  if (!checkAccess()) {
    return (
      <div className="upgrade-prompt">
        <h3>Upgrade Required</h3>
        <p>
          Your current plan only allows videos up to {
            user.planType === 'free' ? '5 minutes' : 
            user.planType === 'bronze' ? '7 minutes' : '10 minutes'
          }
        </p>
        <button onClick={() => setShowUpgradeModal(true)}>
          Upgrade Plan
        </button>
        
        {showUpgradeModal && (
          <div className="modal">
            <PlanSelection 
              currentPlan={user.planType} 
              onUpgrade={() => setShowUpgradeModal(false)}
            />
          </div>
        )}
      </div>
    );
  }

  
  return <YourVideoPlayerComponent video={video} />;
};