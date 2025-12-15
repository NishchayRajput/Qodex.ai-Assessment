"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from "recharts";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PostData {
  date: string;
  reach: number;
  rollingAverage: number;
  engagement: number;
  followers: number;
  postPreview: string;
  isStrategy: boolean;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as PostData;
    return (
      <div className="bg-white dark:bg-zinc-900 border-2 border-linkedin-blue/30 rounded-lg p-4 shadow-xl">
        <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-2">
          {data.postPreview}
        </p>
        <div className="space-y-1 text-xs">
          <p className="text-zinc-700 dark:text-zinc-300">
            <span className="font-medium">Reach:</span> {data.reach.toLocaleString()}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <span className="font-medium">Engagement Rate:</span> {data.engagement}%
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            <span className="font-medium">Followers Gained:</span> +{data.followers}
          </p>
          {data.isStrategy && (
            <Badge variant="secondary" className="mt-1">Strategy Post</Badge>
          )}
        </div>
      </div>
    );
  }
  return null;
};

interface GrowthReachSectionProps {
  onPostClick?: (post: PostData) => void;
}

export function GrowthReachSection({ onPostClick }: GrowthReachSectionProps) {
  const [showStrategyOnly, setShowStrategyOnly] = useState(false);

  // Mock data - replace with real data
  const allPosts: PostData[] = [
    { date: "Dec 1", reach: 1200, rollingAverage: 1150, engagement: 24.5, followers: 12, postPreview: "How to build scalable APIs...", isStrategy: true },
    { date: "Dec 2", reach: 980, rollingAverage: 1100, engagement: 18.2, followers: 8, postPreview: "Quick tip on React hooks", isStrategy: false },
    { date: "Dec 3", reach: 1450, rollingAverage: 1180, engagement: 28.1, followers: 15, postPreview: "5 principles of clean code", isStrategy: true },
    { date: "Dec 4", reach: 890, rollingAverage: 1150, engagement: 16.5, followers: 5, postPreview: "My coffee setup", isStrategy: false },
    { date: "Dec 5", reach: 1680, rollingAverage: 1200, engagement: 31.2, followers: 22, postPreview: "System design patterns explained", isStrategy: true },
    { date: "Dec 6", reach: 1100, rollingAverage: 1220, engagement: 21.3, followers: 9, postPreview: "Weekend reading list", isStrategy: false },
    { date: "Dec 7", reach: 1520, rollingAverage: 1260, engagement: 27.8, followers: 18, postPreview: "Database optimization techniques", isStrategy: true },
    { date: "Dec 8", reach: 1350, rollingAverage: 1280, engagement: 25.4, followers: 14, postPreview: "Microservices vs Monolith", isStrategy: true },
    { date: "Dec 9", reach: 1050, rollingAverage: 1270, engagement: 19.8, followers: 7, postPreview: "Office tour", isStrategy: false },
    { date: "Dec 10", reach: 1780, rollingAverage: 1320, engagement: 33.5, followers: 25, postPreview: "Advanced TypeScript patterns", isStrategy: true },
    { date: "Dec 11", reach: 1420, rollingAverage: 1350, engagement: 26.9, followers: 16, postPreview: "GraphQL best practices", isStrategy: true },
    { date: "Dec 12", reach: 1180, rollingAverage: 1360, engagement: 22.1, followers: 11, postPreview: "Monday motivation", isStrategy: false },
    { date: "Dec 13", reach: 1620, rollingAverage: 1400, engagement: 29.7, followers: 20, postPreview: "Performance optimization guide", isStrategy: true },
    { date: "Dec 14", reach: 1390, rollingAverage: 1420, engagement: 25.8, followers: 15, postPreview: "Docker containerization tips", isStrategy: true },
  ];

  const displayedPosts = showStrategyOnly 
    ? allPosts.filter(post => post.isStrategy)
    : allPosts;

  // Calculate metrics
  const reaches = displayedPosts.map(p => p.reach);
  const medianReach = reaches.sort((a, b) => a - b)[Math.floor(reaches.length / 2)];
  const bestReach = Math.max(...reaches);
  const worstReach = Math.min(...reaches);
  const avgReach = reaches.reduce((a, b) => a + b, 0) / reaches.length;
  const volatility = Math.sqrt(reaches.reduce((sum, r) => sum + Math.pow(r - avgReach, 2), 0) / reaches.length);
  const volatilityLevel = volatility / avgReach < 0.2 ? "stable" : volatility / avgReach < 0.4 ? "moderate" : "spiky";

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-zinc-100 mb-2">
            Growth & Reach Analysis
          </h2>
          <p className="text-sm text-slate-700 dark:text-zinc-400">
            Track reach consistency and growth patterns over time
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 p-1.5 shadow-sm">
          <button
            onClick={() => setShowStrategyOnly(false)}
            className={cn(
              "px-4 py-2 text-sm font-semibold rounded-md transition-all",
              !showStrategyOnly
                ? "bg-linkedin-blue text-white"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            All Posts
          </button>
          <button
            onClick={() => setShowStrategyOnly(true)}
            className={cn(
              "px-4 py-2 text-sm font-semibold rounded-md transition-all",
              showStrategyOnly
                ? "bg-linkedin-blue text-white"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            Strategy Posts
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <Card className="border-2 border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900 dark:text-zinc-50">Reach Per Post Over Time</CardTitle>
          <CardDescription className="text-slate-600 dark:text-zinc-400">Blue line shows actual reach, gray line shows 7-post rolling average</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={displayedPosts} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
                <XAxis 
                  dataKey="date" 
                  className="text-xs text-zinc-600 dark:text-zinc-400"
                />
                <YAxis 
                  className="text-xs text-zinc-600 dark:text-zinc-400"
                  label={{ value: 'Reach', angle: -90, position: 'insideLeft', className: "text-zinc-600 dark:text-zinc-400" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="rollingAverage"
                  fill="#71717a20"
                  stroke="#71717a"
                  strokeWidth={2}
                  dot={false}
                  name="7-Post Average"
                />
                <Line
                  type="monotone"
                  dataKey="reach"
                  stroke="#0A66C2"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#0A66C2", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ 
                    r: 7, 
                    fill: "#0A66C2",
                    onClick: (_: any, payload: any) => onPostClick?.(payload.payload as PostData)
                  }}
                  name="Post Reach"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-400">Median Reach</span>
              <Activity className="h-4 w-4 text-linkedin-blue" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-50">
              {medianReach.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-500 mt-1">
              Middle value of all posts
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-400">Best Post</span>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-50">
              {bestReach.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-500 mt-1">
              Highest reach achieved
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-400">Worst Post</span>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-50">
              {worstReach.toLocaleString()}
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-500 mt-1">
              Lowest reach recorded
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700 dark:text-zinc-400">Volatility</span>
              <Badge 
                variant={volatilityLevel === "stable" ? "secondary" : volatilityLevel === "moderate" ? "outline" : "destructive"}
              >
                {volatilityLevel}
              </Badge>
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-zinc-50 capitalize">
              {volatilityLevel}
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-500 mt-1">
              Reach consistency indicator
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
