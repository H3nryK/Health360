export const verifySession = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const lastLoginTime = await AsyncStorage.getItem('lastLoginTime');
      
      if (!token || !lastLoginTime) {
        return false;
      }
  
      // Check if session is expired (24 hours)
      const loginTime = new Date(lastLoginTime);
      const now = new Date();
      const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
      
      return hoursDiff < 24;
    } catch (error) {
      console.error('Session verification error:', error);
      return false;
    }
  };
  