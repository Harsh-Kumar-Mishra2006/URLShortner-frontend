import React from "react";
import {
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Lock,
  Users,
} from "lucide-react";
import Layout from "../components/layout/Layout";
import ShortenForm from "../components/features/shortenForm";
import StatsCard from "../components/common/StatsCard";
import Button from "../components/common/Button";

const Home: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Blazing Fast",
      description:
        "Generate short URLs instantly with our optimized infrastructure.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Track clicks, locations, devices, and referral sources in real-time.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with end-to-end encryption.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Lightning-fast redirects from anywhere in the world.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Lock,
      title: "Password Protection",
      description: "Add passwords to your links for extra security.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share links and analytics with your team members.",
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center mb-16 animate-in fade-in">
        <div className="relative">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-cyan-500/20 to-blue-500/20 blur-3xl -z-10" />

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text animate-gradient">
              Shorten Links,
            </span>
            <br />
            <span className="text-foreground">Amplify Reach</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Create short, memorable links and track their performance with
            powerful analytics. Trusted by thousands of businesses worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Shorten Form Section */}
      <section className="mb-20">
        <ShortenForm />
      </section>

      {/* Stats Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-muted-foreground">
            Join thousands of satisfied users who trust Short.ly
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Links Created"
            value="10M+"
            icon={Zap}
            trend="+25%"
            description="This month"
            gradient
          />
          <StatsCard
            title="Total Clicks"
            value="500M+"
            icon={BarChart3}
            trend="+40%"
            description="Last 30 days"
            gradient
          />
          <StatsCard
            title="Active Users"
            value="50K+"
            icon={Users}
            trend="+15%"
            description="Growing daily"
            gradient
          />
          <StatsCard
            title="Uptime"
            value="99.9%"
            icon={Shield}
            description="Reliable service"
            gradient
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage, track, and optimize your links
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-in fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} w-fit mb-4`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-cyan-500 to-blue-500 p-8 md:p-12 text-white">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Short.ly for their link management
            needs. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-white/90"
            >
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
