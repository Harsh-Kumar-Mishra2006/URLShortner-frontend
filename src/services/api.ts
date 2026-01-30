// services/api.ts - UPDATED
import axios from 'axios';
import type { 
  ShortUrl, 
  ShortenRequest, 
  AnalyticsData, 
  ApiResponse,
  PaginationData 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://urlshortner-backend-afvd.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// REMOVE authentication interceptors since backend has no auth
// REMOVE request interceptor with token

// Response interceptor - simplified
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const urlService = {
  // Shorten a URL
  shortenUrl: async (data: ShortenRequest): Promise<ApiResponse<ShortUrl>> => {
    try {
      const response = await api.post('/api/url/shorten', data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to shorten URL',
      };
    }
  },

  // Get URL analytics
  getAnalytics: async (shortId: string, params?: any): Promise<ApiResponse<AnalyticsData>> => {
    try {
      const response = await api.get(`/api/url/analytics/${shortId}`, { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch analytics',
      };
    }
  },

  // REMOVE getUserUrls - backend doesn't have users

  // Get all URLs (public - anyone can see all URLs)
  getAllUrls: async (page = 1, limit = 50): Promise<ApiResponse<{ data: ShortUrl[], pagination: PaginationData }>> => {
    try {
      // Since backend doesn't have this endpoint, we need to create it
      // For now, we'll skip this or implement it differently
      return {
        success: false,
        error: 'Endpoint not implemented yet',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch URLs',
      };
    }
  },

  // Deactivate a URL (public - anyone can deactivate)
  deactivateUrl: async (shortId: string): Promise<ApiResponse<ShortUrl>> => {
    try {
      const response = await api.patch(`/api/url/deactivate/${shortId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to deactivate URL',
      };
    }
  },

  // Delete a URL (public - anyone can delete)
  deleteUrl: async (shortId: string): Promise<ApiResponse<{ message: string }>> => {
    try {
      const response = await api.delete(`/api/url/delete/${shortId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to delete URL',
      };
    }
  },

  // Check health
  checkHealth: async (): Promise<ApiResponse<{ message: string, timestamp: string }>> => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: 'Service is unavailable',
      };
    }
  },

  // Get stats - remove or implement differently
  getStats: async (): Promise<ApiResponse<any>> => {
    try {
      // Since backend doesn't have stats endpoint, we'll skip for now
      return {
        success: false,
        error: 'Stats endpoint not implemented',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to fetch stats',
      };
    }
  },
};

export default api;