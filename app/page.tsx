"use client";

import { useState } from "react";
import { OverviewMetricCard } from "../components/OverviewMetricCard";
import { DateRangeSelector } from "../components/DateRangeSelector";
import { ThemeToggle } from "../components/ThemeToggle";
import { GrowthReachSection } from "../components/GrowthReachSection";
import { ContentPerformanceSection } from "../components/ContentPerformanceSection";
import { StrategyImpactSection } from "../components/StrategyImpactSection";
import { PostDetailDrawer } from "../components/PostDetailDrawer";
import { useDashboard } from "../hooks/use-dashboard";

interface PostData {
  date: string;
  reach: number;
  rollingAverage?: number;
  engagement: number;
  followers: number;
  postPreview: string;
  isStrategy: boolean;
  mediaType?: "text" | "image" | "video" | "carousel";
  performanceLevel?: "low" | "average" | "high";
}

export default function Dashboard() {
  const {
    selectedMetric,
    dateRange,
    customDateRange,
    selectMetric,
    setDateRange,
    setCustomDateRange,
  } = useDashboard();

  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handlePostClick = (post: PostData) => {
    setSelectedPost(post);
    setIsDrawerOpen(true);
  };

  // Mock sparkline data (7 data points for the week)
  const generateSparklineData = () => 
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 50);

  const overviewMetrics = [
    {
      id: "reach" as const,
      title: "Total Reach",
      value: "18,900",
      change: 12.4,
      tooltip: "Total number of unique users who saw your content across all posts",
      sparklineData: generateSparklineData(),
    },
    {
      id: "avgReach" as const,
      title: "Avg Reach per Post",
      value: "1,260",
      change: 8.2,
      tooltip: "Average number of people reached per post",
      sparklineData: generateSparklineData(),
    },
    {
      id: "engagement" as const,
      title: "Engagement Rate",
      value: "23.8%",
      change: 5.7,
      tooltip: "Percentage of people who interacted with your content (Likes + Comments + Shares) / Impressions",
      sparklineData: generateSparklineData(),
    },
    {
      id: "followers" as const,
      title: "Followers Gained",
      value: "+280",
      change: 15.3,
      tooltip: "New followers gained during the selected period",
      sparklineData: generateSparklineData(),
    },
    {
      id: "profileVisits" as const,
      title: "Profile Visits",
      value: "4,560",
      change: -2.1,
      tooltip: "Number of times your profile was viewed",
      sparklineData: generateSparklineData(),
    },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-zinc-50">
              LinkedIn Analytics
            </h1>
            <p className="text-slate-700 dark:text-zinc-400 mt-2">
              Track your professional presence and engagement
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DateRangeSelector
              value={dateRange}
              onChange={setDateRange}
              customRange={customDateRange}
              onCustomRangeChange={setCustomDateRange}
            />
            <ThemeToggle />
          </div>
        </div>

        {/* Overview Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-zinc-100 mb-2">
              Overview
            </h2>
            <p className="text-sm text-slate-700 dark:text-zinc-400">
              Click on any metric to filter the dashboard
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {overviewMetrics.map((metric) => (
              <OverviewMetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                tooltip={metric.tooltip}
                sparklineData={metric.sparklineData}
                selected={selectedMetric === metric.id}
                onClick={() => selectMetric(metric.id)}
              />
            ))}
          </div>
        </section>

        {/* Filtered Content Area */}
        {selectedMetric && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white dark:bg-zinc-900 rounded-xl border-2 border-linkedin-blue/20 p-8">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Detailed {overviewMetrics.find(m => m.id === selectedMetric)?.title} Analytics
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Detailed analytics for {overviewMetrics.find(m => m.id === selectedMetric)?.title.toLowerCase()} will be displayed here.
                This section updates based on your selected metric and date range.
              </p>
              {/* Future: Add detailed charts and tables here */}
            </div>
          </section>
        )}

        {/* Growth & Reach Section */}
        <GrowthReachSection onPostClick={handlePostClick} />

        {/* Content Performance Section */}
        <ContentPerformanceSection onPostClick={handlePostClick} />

        {/* Strategy Impact Section */}
        <StrategyImpactSection />

        {/* Post Detail Drawer */}
        <PostDetailDrawer 
          post={selectedPost}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </div>
  );
}
