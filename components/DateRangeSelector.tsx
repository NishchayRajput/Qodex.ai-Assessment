"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export type DateRange = "7d" | "30d" | "90d" | "custom";

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  customRange?: { from: Date; to: Date };
  onCustomRangeChange?: (range: { from: Date; to: Date }) => void;
}

export function DateRangeSelector({
  value,
  onChange,
  customRange,
  onCustomRangeChange,
}: DateRangeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>({
    from: customRange?.from,
    to: customRange?.to,
  });

  const handlePresetClick = (preset: DateRange) => {
    onChange(preset);
    if (preset !== "custom") {
      setIsOpen(false);
    }
  };

  const handleDateSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from && range?.to) {
      setDateRange(range);
      onCustomRangeChange?.({ from: range.from, to: range.to });
      onChange("custom");
      setIsOpen(false);
    } else if (range) {
      setDateRange(range);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 p-1.5 shadow-sm">
        <Button
          variant={value === "7d" ? "default" : "ghost"}
          size="sm"
          onClick={() => handlePresetClick("7d")}
          className={cn(
            "font-semibold",
            value === "7d" 
              ? "bg-linkedin-blue hover:bg-linkedin-blue/90 text-white" 
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          )}
        >
          7 days
        </Button>
        <Button
          variant={value === "30d" ? "default" : "ghost"}
          size="sm"
          onClick={() => handlePresetClick("30d")}
          className={cn(
            "font-semibold",
            value === "30d" 
              ? "bg-linkedin-blue hover:bg-linkedin-blue/90 text-white" 
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          )}
        >
          30 days
        </Button>
        <Button
          variant={value === "90d" ? "default" : "ghost"}
          size="sm"
          onClick={() => handlePresetClick("90d")}
          className={cn(
            "font-semibold",
            value === "90d" 
              ? "bg-linkedin-blue hover:bg-linkedin-blue/90 text-white" 
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          )}
        >
          90 days
        </Button>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={value === "custom" ? "default" : "ghost"}
              size="sm"
              className={cn(
                "gap-2 font-semibold",
                value === "custom" 
                  ? "bg-linkedin-blue hover:bg-linkedin-blue/90 text-white" 
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              )}
            >
              <CalendarIcon className="h-4 w-4" />
              {value === "custom" && customRange
                ? `${format(customRange.from, "MMM d")} - ${format(customRange.to, "MMM d")}`
                : "Custom"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-[100] bg-white dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 shadow-2xl" align="end">
            <Calendar
              mode="range"
              selected={dateRange as any}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              disabled={(date) => date > new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
