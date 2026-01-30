import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";
import Alert from "../common/Alert";
import CopyButton from "../common/CopyButton";
import { urlService } from "../../services/api";
import type { ShortenRequest } from "../../types";
import { validateUrl } from "../../utils/helpers";

const ShortenForm: React.FC = () => {
  const [formData, setFormData] = useState<ShortenRequest>({
    originalUrl: "",
    customId: "",
    expiresIn: 7,
  });
  const [shortUrl, setShortUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setShortUrl("");

    if (!formData.originalUrl) {
      setError("Please enter a URL");
      return;
    }

    if (!validateUrl(formData.originalUrl)) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }

    // Clean up data before sending
    const cleanData: ShortenRequest = {
      originalUrl: formData.originalUrl.trim(),
    };

    // Only add customId if it has value
    if (formData.customId && formData.customId.trim()) {
      cleanData.customId = formData.customId.trim();
    }

    // Only add expiresIn if valid (convert days to seconds)
    if (formData.expiresIn && formData.expiresIn >= 1) {
      cleanData.expiresIn = formData.expiresIn * 24 * 60 * 60; // Convert days to seconds
    }

    setLoading(true);

    try {
      const result = await urlService.shortenUrl(cleanData);

      if (result.success && result.data) {
        setShortUrl(result.data.shortUrl);
        setSuccess("URL shortened successfully!");
        setFormData({ originalUrl: "", customId: "", expiresIn: 7 });
      } else {
        setError(result.error || "Failed to shorten URL");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Shorten Your URL"
      subtitle="Create short, memorable links in seconds"
      className="max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert type="error" message={error} onClose={() => setError("")} />
        )}
        {success && (
          <Alert
            type="success"
            message={success}
            onClose={() => setSuccess("")}
          />
        )}

        {/* Main URL Input */}
        <div className="space-y-2">
          <Input
            label="Paste your long URL"
            placeholder="https://example.com/very-long-url-that-needs-to-be-shortened"
            value={formData.originalUrl}
            onChange={(e) =>
              setFormData({ ...formData, originalUrl: e.target.value })
            }
            required
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              label="Custom alias (optional)"
              placeholder="my-custom-link"
              value={formData.customId}
              onChange={(e) =>
                setFormData({ ...formData, customId: e.target.value })
              }
              helperText="Letters, numbers, hyphens, underscores (3-20 chars)"
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Expires in (days)"
              type="number"
              min="1"
              max="365"
              value={formData.expiresIn}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  expiresIn: parseInt(e.target.value) || 7,
                })
              }
              helperText="1-365 days (minimum 5 minutes)"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          fullWidth
          className="mt-4"
        >
          Shorten URL
        </Button>
      </form>

      {/* Result */}
      {shortUrl && (
        <div className="mt-8 p-6 rounded-xl bg-blue-50 border border-blue-200 animate-in fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">Your Short URL:</p>
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 text-blue-600 flex-shrink-0">🔗</span>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-mono font-semibold text-blue-600 hover:underline break-all"
                >
                  {shortUrl}
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              <CopyButton text={shortUrl} />
              <Button variant="outline" asChild>
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  Visit
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Features */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h4 className="font-semibold text-lg mb-4">Why use Short.ly?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: "⚡",
              title: "Lightning Fast",
              desc: "Generate links instantly",
            },
            {
              icon: "📋",
              title: "Easy Sharing",
              desc: "Share anywhere easily",
            },
            {
              icon: "📅",
              title: "Custom Expiry",
              desc: "Set link expiration",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 rounded-lg bg-blue-100">
                <span className="text-lg">{feature.icon}</span>
              </div>
              <div>
                <p className="font-medium">{feature.title}</p>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ShortenForm;
