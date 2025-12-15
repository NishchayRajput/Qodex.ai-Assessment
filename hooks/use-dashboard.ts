"use client";

import { useState } from "react";
import type { DateRange } from "../components/DateRangeSelector";

export type MetricType = "reach" | "avgReach" | "engagement" | "followers" | "profileVisits" | null;

interface DashboardState {
  selectedMetric: MetricType;
  dateRange: DateRange;
  customDateRange?: { from: Date; to: Date };
}

export function useDashboard() {
  const [state, setState] = useState<DashboardState>({
    selectedMetric: null,
    dateRange: "30d",
  });

  const selectMetric = (metric: MetricType) => {
    setState((prev) => ({
      ...prev,
      selectedMetric: prev.selectedMetric === metric ? null : metric,
    }));
  };

  const setDateRange = (range: DateRange) => {
    setState((prev) => ({
      ...prev,
      dateRange: range,
    }));
  };

  const setCustomDateRange = (customRange: { from: Date; to: Date }) => {
    setState((prev) => ({
      ...prev,
      customDateRange: customRange,
      dateRange: "custom",
    }));
  };

  return {
    selectedMetric: state.selectedMetric,
    dateRange: state.dateRange,
    customDateRange: state.customDateRange,
    selectMetric,
    setDateRange,
    setCustomDateRange,
  };
}
