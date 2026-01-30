import React, { useState } from "react";
import Button from "../common/Button";
import CopyButton from "../common/CopyButton";
import { formatTimeAgo, truncateText } from "../../utils/helpers";

interface UrlCardProps {
  url: {
    id: string;
    shortUrl: string;
    originalUrl: string;
    clicks: number;
    createdAt: string;
    isActive?: boolean;
    expiresAt?: string;
  };
  showActions?: boolean;
  onDelete?: (id: string) => void;
  onViewAnalytics?: (id: string) => void;
}

const UrlCard: React.FC<UrlCardProps> = ({
  url,
  showActions = true,
  onDelete,
  onViewAnalytics,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shortId = url.shortUrl.split("/").pop();

  const handleDelete = () => {
    if (
      onDelete &&
      window.confirm("Are you sure you want to delete this URL?")
    ) {
      onDelete(url.id);
    }
  };

  const handleViewAnalytics = () => {
    if (onViewAnalytics) {
      onViewAnalytics(url.id);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:shadow-lg hover:border-blue-300">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 rounded-md bg-blue-100">
                <span className="text-blue-600">🔗</span>
              </div>
              <h3 className="font-semibold text-gray-900 truncate">
                {shortId}
              </h3>
              {url.isActive === false && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Inactive
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Created {formatTimeAgo(url.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span
                className={`transition-transform ${isExpanded ? "rotate-90" : ""}`}
              >
                ▶
              </span>
            </button>
          </div>
        </div>

        {/* Short URL */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Short URL:</span>
              <a
                href={url.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-blue-600 hover:underline truncate"
              >
                {url.shortUrl}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <CopyButton text={url.shortUrl} />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
              <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                <span>↗</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="pt-3 border-t border-gray-200 space-y-3">
            {/* Original URL */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Original URL:</p>
              <p className="text-sm text-gray-900 break-all bg-gray-50 rounded-lg p-2 font-mono">
                {truncateText(url.originalUrl, 80)}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50">
                <span className="text-blue-600">📊</span>
                <div>
                  <p className="text-sm font-semibold">
                    {url.clicks.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">Total Clicks</p>
                </div>
              </div>

              {url.expiresAt && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50">
                  <span className="text-blue-600">📅</span>
                  <div>
                    <p className="text-sm font-semibold">
                      {new Date(url.expiresAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-500">Expires</p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewAnalytics}
                  className="flex-1"
                >
                  <span className="mr-2">📈</span>
                  Analytics
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  🗑️
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Collapsed Footer */}
        {!isExpanded && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400">📊</span>
                <span className="text-sm font-medium">
                  {url.clicks.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500">clicks</span>
              </div>

              {url.expiresAt && (
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-400">📅</span>
                  <span className="text-xs text-gray-500">
                    Expires {formatTimeAgo(url.expiresAt)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              {showActions && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleViewAnalytics}
                    className="h-7 w-7 p-0"
                  >
                    👁️
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    🗑️
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlCard;
