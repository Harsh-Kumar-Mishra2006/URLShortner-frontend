import React, { useState } from "react";
import {
  Link as LinkIcon,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import UrlCard from "./UrlCard";
import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

interface Url {
  id: string;
  shortUrl: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
  isActive?: boolean;
  expiresAt?: string;
}

interface RecentUrlsProps {
  urls?: Url[];
  title?: string;
  showFilter?: boolean;
  showPagination?: boolean;
  emptyMessage?: string;
  onUrlClick?: (url: Url) => void;
  onDeleteUrl?: (id: string) => void;
}

const RecentUrls: React.FC<RecentUrlsProps> = ({
  urls = [],
  title = "Recent URLs",
  showFilter = true,
  showPagination = true,
  emptyMessage = "No URLs found. Create your first short URL!",
  onUrlClick,
  onDeleteUrl,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter URLs based on search and filter
  const filteredUrls = urls.filter((url) => {
    const matchesSearch =
      searchTerm === "" ||
      url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "active" && url.isActive !== false) ||
      (filter === "inactive" && url.isActive === false);

    return matchesSearch && matchesFilter;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUrls = filteredUrls.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Sample data if no URLs provided
  const sampleUrls: Url[] = [
    {
      id: "1",
      shortUrl: "short.ly/abc123",
      originalUrl:
        "https://example.com/blog/article-about-url-shortening-best-practices",
      clicks: 142,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      isActive: true,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    },
    {
      id: "2",
      shortUrl: "short.ly/xyz789",
      originalUrl:
        "https://example.com/product/special-offer-limited-time-only",
      clicks: 89,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      isActive: true,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    },
    {
      id: "3",
      shortUrl: "short.ly/qwe456",
      originalUrl: "https://example.com/pricing/compare-plans-features",
      clicks: 56,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      isActive: true,
    },
    {
      id: "4",
      shortUrl: "short.ly/rty123",
      originalUrl: "https://example.com/about/company-history-mission-values",
      clicks: 34,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      isActive: false,
    },
    {
      id: "5",
      shortUrl: "short.ly/uiop789",
      originalUrl: "https://example.com/contact/support-help-center-faq",
      clicks: 21,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      isActive: true,
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
    },
  ];

  const displayUrls = urls.length > 0 ? urls : sampleUrls;
  const displayFilteredUrls =
    filteredUrls.length > 0
      ? filteredUrls
      : displayUrls.filter(
          (url) =>
            searchTerm === "" ||
            url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
            url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()),
        );

  const handleDelete = (id: string) => {
    if (onDeleteUrl) {
      onDeleteUrl(id);
    } else {
      // Mock delete for demo
      console.log(`Deleting URL with id: ${id}`);
      alert(`URL ${id} would be deleted in a real application.`);
    }
  };

  const handleViewAnalytics = (id: string) => {
    const url = displayUrls.find((u) => u.id === id);
    if (url && onUrlClick) {
      onUrlClick(url);
    } else {
      // Mock analytics view for demo
      console.log(`Viewing analytics for URL with id: ${id}`);
      alert(`Analytics for URL ${id} would open in a real application.`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card title={title} className="h-full">
      {/* Filters */}
      {showFilter && (
        <div className="space-y-4 mb-6">
          {/* FIXED: Removed icon and iconPosition props */}
          <Input
            placeholder="Search URLs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <div className="flex gap-1">
              {(["all", "active", "inactive"] as const).map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                    filter === filterOption
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {filterOption}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* URL List */}
      <div className="space-y-3">
        {displayFilteredUrls.length > 0 ? (
          paginatedUrls.map((url) => (
            <UrlCard
              key={url.id}
              url={url}
              onDelete={handleDelete}
              onViewAnalytics={() => handleViewAnalytics(url.id)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="mb-4 flex justify-center">
              <div className="p-4 rounded-full bg-blue-100">
                <LinkIcon className="h-12 w-12 text-blue-500/50" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No URLs Found
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">{emptyMessage}</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {Math.min(startIndex + 1, displayFilteredUrls.length)}-
            {Math.min(startIndex + itemsPerPage, displayFilteredUrls.length)} of{" "}
            {displayFilteredUrls.length} URLs
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="h-8 w-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      {displayFilteredUrls.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-blue-50">
              <p className="text-2xl font-bold text-blue-600">
                {displayFilteredUrls.length}
              </p>
              <p className="text-xs text-gray-500">Total URLs</p>
            </div>

            <div className="text-center p-3 rounded-lg bg-green-50">
              <p className="text-2xl font-bold text-green-600">
                {displayFilteredUrls.filter((u) => u.isActive !== false).length}
              </p>
              <p className="text-xs text-gray-500">Active</p>
            </div>

            <div className="text-center p-3 rounded-lg bg-blue-50">
              <p className="text-2xl font-bold text-blue-600">
                {displayFilteredUrls
                  .reduce((sum, url) => sum + url.clicks, 0)
                  .toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Total Clicks</p>
            </div>

            <div className="text-center p-3 rounded-lg bg-purple-50">
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(
                  displayFilteredUrls.reduce(
                    (sum, url) => sum + url.clicks,
                    0,
                  ) / displayFilteredUrls.length,
                ) || 0}
              </p>
              <p className="text-xs text-gray-500">Avg. Clicks</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default RecentUrls;
