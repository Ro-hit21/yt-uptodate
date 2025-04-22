import PLANS from '../config/plans.js';

module.exports = async (req, res, next) => {
  try {
    const user = await Userrr.findById(req.user._id);
    const video = await Videooo.findById(req.params.videoId);
    
    if (user.planType === 'gold') {
      return next();
    }

    const maxDuration = PLANS[user.planType].duration;
    if (video.duration > maxDuration) {
      return res.status(403).json({
        error: `Your ${user.planType} plan only allows videos up to ${maxDuration/60} minutes`,
        upgradeRequired: true
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};