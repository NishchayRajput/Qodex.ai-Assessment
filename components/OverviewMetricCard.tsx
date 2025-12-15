"use client";

import { Card, CardContent } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { LineChart, Line } from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface OverviewMetricCardProps {
  title: string;
  value: string | number;
  change: number;
  tooltip: string;
  sparklineData: number[];
  selected?: boolean;
  onClick?: () => void;
}

export function OverviewMetricCard({
  title,
  value,
  change,
  tooltip,
  sparklineData,
  selected = false,
  onClick,
}: OverviewMetricCardProps) {
  const isPositive = change >= 0;
  
  const chartData = sparklineData.map((value, index) => ({
    index,
    value,
  }));

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          className={cn(
            "cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 bg-white dark:bg-zinc-900",
            selected
              ? "border-linkedin-blue bg-linkedin-blue/10 dark:bg-linkedin-blue/10 shadow-md"
              : "border-slate-300 dark:border-zinc-800 hover:border-linkedin-blue/50"
          )}
          onClick={onClick}
        >
          <CardContent className="p-6">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-zinc-400">
                  {title}
                </span>
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-semibold",
                    isPositive
                      ? "text-emerald-600 dark:text-emerald-500"
                      : "text-red-600 dark:text-red-500"
                  )}
                >
                  {isPositive ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {Math.abs(change)}%
                </div>
              </div>

              {/* Main Value */}
              <div className="text-3xl font-bold text-slate-900 dark:text-zinc-50">
                {value}
              </div>

              {/* Sparkline */}
              <div className="h-12 -mx-2">
                <LineChart width={200} height={48} data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={selected ? "#0A66C2" : "#71717a"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </div>
            </div>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
