"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { TrendingUp, Users, Target, Eye, HelpCircle, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

type TimeWindow = "7d" | "30d" | "90d" | "all";

interface MetricComparison {
  metric: string;
  icon: React.ReactNode;
  before: number;
  after: number;
  lift: number;
  unit: string;
  description: string;
}

type StrategyImpactSectionProps = Record<string, never>;

interface TooltipPayload {
  metric: string;
  before: number;
  after: number;
  lift: number;
  unit: string;
}

// CustomTooltip component defined outside render
const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: TooltipPayload }> }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-zinc-900 border-2 border-linkedin-blue rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-slate-900 dark:text-zinc-50 mb-2">
          {data.metric}
        </p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-600 dark:text-zinc-400">Without Strategy:</span>
            <span className="font-bold text-slate-900 dark:text-zinc-50">
              {data.before.toLocaleString()}{data.unit}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-600 dark:text-zinc-400">With Strategy:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-500">
              {data.after.toLocaleString()}{data.unit}
            </span>
          </div>
          <div className="pt-1 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-4">
            <span className="text-slate-600 dark:text-zinc-400">Improvement:</span>
            <span className="font-bold text-linkedin-blue">
              +{data.lift}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function StrategyImpactSection({}: StrategyImpactSectionProps) {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("30d");
  const [strategyEnabled, setStrategyEnabled] = useState(true);

  // Mock comparison data
  const comparisons: MetricComparison[] = [
    {
      metric: "Avg Reach per Post",
      icon: <Eye className="h-5 w-5 text-linkedin-blue" />,
      before: 1240,
      after: 1761,
      lift: 42,
      unit: "",
      description: "Average number of unique LinkedIn users who saw your posts"
    },
    {
      metric: "Engagement Rate",
      icon: <Target className="h-5 w-5 text-linkedin-blue" />,
      before: 18.2,
      after: 26.8,
      lift: 47,
      unit: "%",
      description: "Percentage of people who engaged (liked, commented, shared) vs. reached"
    },
    {
      metric: "Follower Gain per Post",
      icon: <Users className="h-5 w-5 text-linkedin-blue" />,
      before: 8.4,
      after: 16.2,
      lift: 93,
      unit: "",
      description: "Average new followers gained from each post"
    },
    {
      metric: "Non-Follower Reach",
      icon: <TrendingUp className="h-5 w-5 text-linkedin-blue" />,
      before: 42.5,
      after: 58.3,
      lift: 37,
      unit: "%",
      description: "Percentage of reach coming from people who don't follow you yet"
    },
  ];

  // Prepare data for side-by-side bars
  const chartData = comparisons.map(comp => ({
    metric: comp.metric.replace(" per Post", "").replace("Avg ", ""),
    before: comp.unit === "%" ? comp.before : comp.before,
    after: comp.unit === "%" ? comp.after : comp.after,
    lift: comp.lift,
    unit: comp.unit
  }));

  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-zinc-100 mb-2">
            Strategy Impact
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400">
            Quantifying the value of strategic content
          </p>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                <HelpCircle className="h-5 w-5 text-slate-500 dark:text-zinc-400" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">
                Attribution is calculated by comparing posts tagged as &ldquo;Strategy&rdquo; vs. non-strategy posts within the selected time window. 
                Metrics are averaged across all posts in each category.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-800 rounded-lg p-1">
          {(["7d", "30d", "90d", "all"] as TimeWindow[]).map((window) => (
            <button
              key={window}
              onClick={() => setTimeWindow(window)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                timeWindow === window
                  ? "bg-white dark:bg-zinc-900 text-linkedin-blue shadow-sm"
                  : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100"
              )}
            >
              {window === "all" ? "All Time" : `Last ${window.replace("d", " days")}`}
            </button>
          ))}
        </div>

        <button
          onClick={() => setStrategyEnabled(!strategyEnabled)}
          className={cn(
            "px-4 py-1.5 text-xs font-medium rounded-lg border-2 transition-colors flex items-center gap-2",
            strategyEnabled
              ? "border-linkedin-blue bg-linkedin-blue text-white"
              : "border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300"
          )}
        >
          <Sparkles className="h-3 w-3" />
          Strategy {strategyEnabled ? "ON" : "OFF"}
        </button>
      </div>

      {/* Main Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comparisons.map((comp) => (
          <Card key={comp.metric} className="border-2 border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {comp.icon}
                  <CardTitle className="text-base text-slate-900 dark:text-zinc-50">
                    {comp.metric}
                  </CardTitle>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-slate-400 dark:text-zinc-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">{comp.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Before */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-600 dark:text-zinc-400">
                      Without Strategy
                    </span>
                    <span className="text-lg font-bold text-slate-700 dark:text-zinc-300">
                      {comp.before.toLocaleString()}{comp.unit}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-400 dark:bg-zinc-600 rounded-full transition-all duration-500"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>

                {/* After */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-slate-600 dark:text-zinc-400">
                      With Strategy
                    </span>
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-500">
                      {comp.after.toLocaleString()}{comp.unit}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-linkedin-blue to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${(comp.after / comp.before) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Lift Badge */}
                <div className="pt-2 border-t border-slate-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 dark:text-zinc-400">Improvement</span>
                    <Badge variant="default" className="bg-linkedin-blue hover:bg-linkedin-blue text-white font-bold">
                      +{comp.lift}% lift
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Side-by-Side Bar Chart */}
      <Card className="border-2 border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900 dark:text-zinc-50">
            Performance Comparison
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-zinc-400">
            Direct comparison of key metrics with and without strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-zinc-800" />
                <XAxis 
                  dataKey="metric" 
                  className="text-xs text-slate-600 dark:text-zinc-400"
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  className="text-xs text-slate-600 dark:text-zinc-400"
                />
                <RechartsTooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="before" 
                  fill="#94a3b8" 
                  name="Without Strategy"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="after" 
                  fill="#0A66C2" 
                  name="With Strategy"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-400 dark:bg-slate-500" />
              <span className="text-xs text-slate-600 dark:text-zinc-400">Without Strategy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-linkedin-blue" />
              <span className="text-xs text-slate-600 dark:text-zinc-400">With Strategy</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Value Statement */}
      <Card className="border-2 border-linkedin-blue/30 bg-linear-to-br from-linkedin-blue/5 via-emerald-500/5 to-linkedin-blue/5 dark:from-linkedin-blue/10 dark:via-emerald-500/10 dark:to-linkedin-blue/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-linkedin-blue/10 dark:bg-linkedin-blue/20 rounded-lg">
              <Sparkles className="h-6 w-6 text-linkedin-blue" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-50 mb-2">
                Your Strategy is Working
              </h3>
              <p className="text-sm text-slate-700 dark:text-zinc-300 mb-3">
                Posts using our strategic framework get <span className="font-bold text-linkedin-blue">+{comparisons[0].lift}% more reach</span> on average. 
                That&apos;s an extra <span className="font-bold text-emerald-600 dark:text-emerald-500">
                  {(comparisons[0].after - comparisons[0].before).toLocaleString()} people
                </span> seeing each of your posts.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {comparisons.filter(c => c.lift > 40).length} metrics improved by 40%+
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Based on {timeWindow === "all" ? "all posts" : `last ${timeWindow}`}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
