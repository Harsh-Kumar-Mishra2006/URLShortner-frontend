// utils/constants.js
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://urlshortner-backend-afvd.onrender.com',
  TIMEOUT: 10000,
};

export const STORAGE_KEYS = {
  // REMOVE TOKEN and USER_ID
  RECENT_URLS: 'url_shortener_recent_urls',
};

export const DEFAULT_VALUES = {
  EXPIRY_DAYS: 7,
  ITEMS_PER_PAGE: 20,
  MAX_CUSTOM_ID_LENGTH: 20,
  MIN_CUSTOM_ID_LENGTH: 3,
};

export const REGEX_PATTERNS = {
  CUSTOM_ID: /^[a-zA-Z0-9_-]+$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
};

export const ERROR_MESSAGES = {
  INVALID_URL: 'Please enter a valid URL starting with http:// or https://',
  CUSTOM_ID_IN_USE: 'Custom ID is already in use',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  // REMOVE UNAUTHORIZED since no auth
};