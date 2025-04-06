import express from "express"
import Userr from '../Models/User.js';
const router = express.Router();

router.post('/updatePoints', async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await Userr.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.points += 5; // Add 5 points per video watched
    await user.save();

    res.json({ message: 'Points updated', points: user.points });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;

