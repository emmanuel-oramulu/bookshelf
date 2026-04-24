export const calculateStreak = () => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split('T')[0];

  const lastRead = localStorage.getItem('last_read_date');
  let streak = parseInt(localStorage.getItem('reading_streak')) || 0;

  // First time reading
  if (!lastRead) {
    localStorage.setItem('last_read_date', today);
    localStorage.setItem('reading_streak', 1);
    return 1;
  }

  // Already read today → no change
  if (lastRead === today) {
    return streak;
  }

  // Continued streak (read yesterday)
  if (lastRead === yesterday) {
    streak += 1;
    localStorage.setItem('reading_streak', streak);
    localStorage.setItem('last_read_date', today);
    return streak;
  }

  // Streak broken → reset
  localStorage.setItem('reading_streak', 1);
  localStorage.setItem('last_read_date', today);
  return 1;
};