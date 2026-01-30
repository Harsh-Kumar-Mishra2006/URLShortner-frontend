// types/index.ts - SIMPLIFIED
export interface ShortUrl {
  originalUrl: string;
  shortUrl: string;
  shortId: string;
  expiresAt?: string;
  createdAt: string;
  clicks?: number;
  isActive?: boolean;
  // REMOVE userId since backend has no users
}

export interface ShortenRequest {
  originalUrl: string;
  customId?: string;
  expiresIn?: number;
  // REMOVE userId from request
}

export interface AnalyticsData {
  originalUrl: string;
  shortUrl: string;
  shortId: string;
  totalClicks: number;
  clicksInRange: number;
  clicks: ClickData[];
  createdAt: string;
  lastClicked: string | null;
  isActive: boolean;
  expiresAt: string | null;
}

export interface ClickData {
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  referrer: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// REMOVE User interface since no authentication

export interface Stats {
  totalUrls: number;
  totalClicks: number;
  activeUrls: number;
  todayClicks: number;
}

export interface UrlState {
  urls: ShortUrl[];
  loading: boolean;
  error: string | null;
  stats: Stats | null;
  currentUrl: ShortUrl | null;
}