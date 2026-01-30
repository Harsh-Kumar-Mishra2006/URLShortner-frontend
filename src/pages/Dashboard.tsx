import React from "react";
import {
  BarChart3,
  Link as LinkIcon,
  Users,
  Clock,
  TrendingUp,
  Filter,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import Card from "../components/common/Card";
import StatsCard from "../components/common/StatsCard";
import Button from "../components/common/Button";
import UrlCard from "../components/features/UrlCard";

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Links",
      value: "142",
      icon: LinkIcon,
      trend: "+12%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Total Clicks",
      value: "2,847",
      icon: BarChart3,
      trend: "+24%",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Active Links",
      value: "89",
      icon: TrendingUp,
      trend: "+5%",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Avg. Click/Day",
      value: "42",
      icon: Users,
      trend: "+18%",
      color: "from-orange-500 to-red-500",
    },
  ];

  const recentUrls = [
    {
      id: "1",
      shortUrl: "short.ly/abc123",
      originalUrl: "https://example.com/blog/article",
      clicks: 142,
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      shortUrl: "short.ly/xyz789",
      originalUrl: "https://example.com/product",
      clicks: 89,
      createdAt: "1 day ago",
    },
    {
      id: "3",
      shortUrl: "short.ly/qwe456",
      originalUrl: "https://example.com/pricing",
      clicks: 56,
      createdAt: "2 days ago",
    },
    {
      id: "4",
      shortUrl: "short.ly/rty123",
      originalUrl: "https://example.com/about",
      clicks: 34,
      createdAt: "3 days ago",
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your link performance overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            gradient
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recent URLs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <Card title="Quick Actions" className="gradient-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button variant="primary" fullWidth icon={LinkIcon}>
                New Link
              </Button>
              <Button variant="outline" fullWidth icon={BarChart3}>
                View Analytics
              </Button>
              <Button variant="outline" fullWidth icon={Filter}>
                Filter Links
              </Button>
            </div>
          </Card>

          {/* Recent URLs */}
          <Card title="Recent URLs">
            <div className="space-y-4">
              {recentUrls.map((url) => (
                <UrlCard key={url.id} url={url} />
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" fullWidth>
                View All Links
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Analytics & Quick Stats */}
        <div className="space-y-8">
          {/* Performance Chart (Placeholder) */}
          <Card title="Performance">
            <div className="h-48 flex items-center justify-center bg-gradient-to-b from-primary/5 to-transparent rounded-xl">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Chart visualization</p>
                <p className="text-sm text-muted-foreground">
                  (Interactive chart will appear here)
                </p>
              </div>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card title="Quick Stats">
            <div className="space-y-4">
              {[
                {
                  label: "Most Clicked",
                  value: "short.ly/abc123",
                  count: "142 clicks",
                },
                {
                  label: "Top Referrer",
                  value: "Twitter.com",
                  count: "89 visits",
                },
                { label: "Best Day", value: "Monday", count: "Avg. 58 clicks" },
                {
                  label: "Top Country",
                  value: "United States",
                  count: "45% traffic",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="font-medium">{stat.value}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {stat.count}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Tips */}
          <Card title="Pro Tips" gradient>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="p-1 rounded bg-primary/10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm">
                  Use custom aliases for better branding
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-1 rounded bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm">
                  Set expiration dates for time-sensitive links
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-1 rounded bg-primary/10">
                  <Filter className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm">
                  Use UTM parameters for detailed tracking
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
