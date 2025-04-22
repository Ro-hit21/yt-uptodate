module.exports = {
    free: {
      name: 'Free',
      price: 0,
      maxDuration: 5 * 60, // 5 minutes in seconds
      features: ['5 minute video limit']
    },
    bronze: {
      name: 'Bronze',
      price: 10,
      maxDuration: 7 * 60, // 7 minutes in seconds
      features: ['7 minute video limit']
    },
    silver: {
      name: 'Silver',
      price: 50,
      maxDuration: 10 * 60, // 10 minutes in seconds
      features: ['10 minute video limit']
    },
    gold: {
      name: 'Gold',
      price: 100,
      maxDuration: null, // Unlimited
      features: ['Unlimited video watching']
    }
  };