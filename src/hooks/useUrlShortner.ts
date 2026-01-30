// hooks/useUrlShortener.ts - SIMPLIFIED
import { useState, useCallback } from 'react';
import type { ShortUrl, ShortenRequest } from '../types';
import { urlService } from '../services/api';
import { validateUrl } from '../utils/helpers';

interface UseUrlShortenerReturn {
  shortUrl: ShortUrl | null;
  loading: boolean;
  error: string | null;
  shortenUrl: (data: ShortenRequest) => Promise<ShortUrl | null>;
  reset: () => void;
}

export const useUrlShortener = (): UseUrlShortenerReturn => {
  const [shortUrl, setShortUrl] = useState<ShortUrl | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shortenUrl = useCallback(async (data: ShortenRequest): Promise<ShortUrl | null> => {
    // Validate URL
    if (!data.originalUrl.trim()) {
      setError('URL is required');
      return null;
    }

    if (!validateUrl(data.originalUrl)) {
      setError('Please enter a valid URL starting with http:// or https://');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await urlService.shortenUrl(data);
      
      if (result.success && result.data) {
        setShortUrl(result.data);
        return result.data;
      } else {
        setError(result.error || 'Failed to shorten URL');
        return null;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setShortUrl(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    shortUrl,
    loading,
    error,
    shortenUrl,
    reset,
  };
};