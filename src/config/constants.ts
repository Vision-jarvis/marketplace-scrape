const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  BASE_URL: isDevelopment ? 'http://localhost:5000' : '/api',
  ENDPOINTS: {
    SCRAPE: '/api/scrape',
  },
  TIMEOUT: 30000, // 30 seconds
};

export const ERROR_MESSAGES = {
  CONNECTION: 'Unable to connect to the scraping service. Please ensure the backend server is running.',
  TIMEOUT: 'The request timed out. Please try again.',
  INVALID_RESPONSE: 'Received invalid response from server.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
  SETUP: `To fix the connection error:
1. Open a new terminal
2. Run: pip install -r requirements.txt
3. Run: npm run start-backend
4. Try your request again`
};