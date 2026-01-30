// contexts/UrlContext.tsx - SIMPLIFIED
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import type { ShortUrl, ShortenRequest, AnalyticsData } from "../types";
import { urlService } from "../services/api";

interface UrlContextType {
  urls: ShortUrl[];
  loading: boolean;
  error: string | null;
  currentUrl: ShortUrl | null;
  shortenUrl: (data: ShortenRequest) => Promise<ShortUrl | null>;
  getAnalytics: (
    shortId: string,
    params?: any,
  ) => Promise<AnalyticsData | null>;
  deleteUrl: (shortId: string) => Promise<boolean>;
  deactivateUrl: (shortId: string) => Promise<boolean>;
  clearError: () => void;
  // REMOVE getUserUrls, getAllUrls, getStats
}

interface UrlState {
  urls: ShortUrl[];
  loading: boolean;
  error: string | null;
  currentUrl: ShortUrl | null;
  // REMOVE stats
}

type UrlAction =
  | { type: "SET_LOADING" }
  | { type: "SET_URLS"; payload: ShortUrl[] }
  | { type: "ADD_URL"; payload: ShortUrl }
  | { type: "REMOVE_URL"; payload: string }
  | { type: "UPDATE_URL"; payload: ShortUrl }
  | { type: "SET_CURRENT_URL"; payload: ShortUrl | null }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" };

const initialState: UrlState = {
  urls: [],
  loading: false,
  error: null,
  currentUrl: null,
};

const UrlContext = createContext<UrlContextType | undefined>(undefined);

function urlReducer(state: UrlState, action: UrlAction): UrlState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };
    case "SET_URLS":
      return { ...state, urls: action.payload, loading: false };
    case "ADD_URL":
      return {
        ...state,
        urls: [action.payload, ...state.urls],
        loading: false,
      };
    case "REMOVE_URL":
      return {
        ...state,
        urls: state.urls.filter((url) => url.shortId !== action.payload),
        loading: false,
      };
    case "UPDATE_URL":
      return {
        ...state,
        urls: state.urls.map((url) =>
          url.shortId === action.payload.shortId ? action.payload : url,
        ),
        loading: false,
      };
    case "SET_CURRENT_URL":
      return { ...state, currentUrl: action.payload, loading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

interface UrlProviderProps {
  children: ReactNode;
}

export const UrlProvider: React.FC<UrlProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(urlReducer, initialState);

  const shortenUrl = async (data: ShortenRequest): Promise<ShortUrl | null> => {
    try {
      dispatch({ type: "SET_LOADING" });
      const result = await urlService.shortenUrl(data);

      if (result.success && result.data) {
        dispatch({ type: "ADD_URL", payload: result.data });
        return result.data;
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: result.error || "Failed to shorten URL",
        });
        return null;
      }
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "An error occurred",
      });
      return null;
    }
  };

  // REMOVE getUserUrls and getAllUrls

  const getAnalytics = async (
    shortId: string,
    params?: any,
  ): Promise<AnalyticsData | null> => {
    try {
      dispatch({ type: "SET_LOADING" });
      const result = await urlService.getAnalytics(shortId, params);

      if (result.success && result.data) {
        return result.data;
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: result.error || "Failed to fetch analytics",
        });
        return null;
      }
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "An error occurred",
      });
      return null;
    }
  };

  const deleteUrl = async (shortId: string): Promise<boolean> => {
    try {
      dispatch({ type: "SET_LOADING" });
      const result = await urlService.deleteUrl(shortId);

      if (result.success) {
        dispatch({ type: "REMOVE_URL", payload: shortId });
        return true;
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: result.error || "Failed to delete URL",
        });
        return false;
      }
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "An error occurred",
      });
      return false;
    }
  };

  const deactivateUrl = async (shortId: string): Promise<boolean> => {
    try {
      dispatch({ type: "SET_LOADING" });
      const result = await urlService.deactivateUrl(shortId);

      if (result.success && result.data) {
        dispatch({ type: "UPDATE_URL", payload: result.data });
        return true;
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: result.error || "Failed to deactivate URL",
        });
        return false;
      }
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: error.message || "An error occurred",
      });
      return false;
    }
  };

  // REMOVE getStats function

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: UrlContextType = {
    urls: state.urls,
    loading: state.loading,
    error: state.error,
    currentUrl: state.currentUrl,
    shortenUrl,
    getAnalytics,
    deleteUrl,
    deactivateUrl,
    clearError,
  };

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};

export const useUrls = () => {
  const context = useContext(UrlContext);
  if (context === undefined) {
    throw new Error("useUrls must be used within a UrlProvider");
  }
  return context;
};
