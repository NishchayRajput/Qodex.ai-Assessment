"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowUpDown, ArrowUp, ArrowDown, Image as ImageIcon, FileText, Video, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/utils";

interface PostPerformanceData {
  id: string;
  postPreview: string;
  reach: number;
  rollingAverage?: number;
  engagement: number;
  followers: number;
  isStrategy: boolean;
  mediaType: "text" | "image" | "video" | "carousel";
  date: string;
  performanceLevel: "low" | "average" | "high";
}

type SortField = "reach" | "engagement" | "followers";
type SortOrder = "asc" | "desc";
type MediaFilter = "all" | "text" | "image" | "video" | "carousel";
type StrategyFilter = "all" | "strategy" | "non-strategy";

interface ContentPerformanceSectionProps {
  onPostClick?: (post: PostPerformanceData) => void;
}

// SortButton component defined outside render to avoid React warning
const SortButton = ({ 
  field, 
  label,
  currentField,
  currentOrder,
  onSort
}: { 
  field: SortField; 
  label: string;
  currentField: SortField;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
}) => (
  <button
    onClick={() => onSort(field)}
    className="flex items-center gap-1 hover:text-linkedin-blue transition-colors"
  >
    {label}
    {currentField === field ? (
      currentOrder === "asc" ? (
        <ArrowUp className="h-3 w-3" />
      ) : (
        <ArrowDown className="h-3 w-3" />
      )
    ) : (
      <ArrowUpDown className="h-3 w-3 opacity-40" />
    )}
  </button>
);

export function ContentPerformanceSection({ onPostClick }: ContentPerformanceSectionProps) {
  const [sortField, setSortField] = useState<SortField>("followers");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>("all");
  const [strategyFilter, setStrategyFilter] = useState<StrategyFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  // Mock data - replace with real data
  const allPosts: PostPerformanceData[] = [
    { id: "1", postPreview: "Advanced TypeScript patterns", reach: 1780, engagement: 33.5, followers: 25, isStrategy: true, mediaType: "text", date: "Dec 10", performanceLevel: "high" },
    { id: "2", postPreview: "GraphQL best practices", reach: 1420, engagement: 26.9, followers: 20, isStrategy: true, mediaType: "image", date: "Dec 11", performanceLevel: "high" },
    { id: "3", postPreview: "System design patterns", reach: 1680, engagement: 31.2, followers: 22, isStrategy: true, mediaType: "carousel", date: "Dec 5", performanceLevel: "high" },
    { id: "4", postPreview: "Database optimization", reach: 1520, engagement: 27.8, followers: 18, isStrategy: true, mediaType: "text", date: "Dec 7", performanceLevel: "high" },
    { id: "5", postPreview: "Performance optimization", reach: 1620, engagement: 29.7, followers: 20, isStrategy: true, mediaType: "image", date: "Dec 13", performanceLevel: "high" },
    { id: "6", postPreview: "Docker containerization", reach: 1390, engagement: 25.8, followers: 16, isStrategy: true, mediaType: "video", date: "Dec 14", performanceLevel: "average" },
    { id: "7", postPreview: "5 principles of clean code", reach: 1450, engagement: 28.1, followers: 15, isStrategy: true, mediaType: "text", date: "Dec 3", performanceLevel: "high" },
    { id: "8", postPreview: "Microservices vs Monolith", reach: 1350, engagement: 25.4, followers: 14, isStrategy: true, mediaType: "image", date: "Dec 8", performanceLevel: "average" },
    { id: "9", postPreview: "How to build scalable APIs", reach: 1200, engagement: 24.5, followers: 12, isStrategy: true, mediaType: "text", date: "Dec 1", performanceLevel: "average" },
    { id: "10", postPreview: "Monday motivation", reach: 1180, engagement: 22.1, followers: 11, isStrategy: false, mediaType: "image", date: "Dec 12", performanceLevel: "average" },
    { id: "11", postPreview: "Weekend reading list", reach: 1100, engagement: 21.3, followers: 9, isStrategy: false, mediaType: "text", date: "Dec 6", performanceLevel: "average" },
    { id: "12", postPreview: "Quick tip on React hooks", reach: 980, engagement: 18.2, followers: 8, isStrategy: false, mediaType: "text", date: "Dec 2", performanceLevel: "low" },
    { id: "13", postPreview: "Office tour", reach: 1050, engagement: 19.8, followers: 7, isStrategy: false, mediaType: "video", date: "Dec 9", performanceLevel: "low" },
    { id: "14", postPreview: "My coffee setup", reach: 890, engagement: 16.5, followers: 5, isStrategy: false, mediaType: "image", date: "Dec 4", performanceLevel: "low" },
  ];

  // Apply filters
  const filteredPosts = allPosts.filter(post => {
    if (mediaFilter !== "all" && post.mediaType !== mediaFilter) return false;
    if (strategyFilter === "strategy" && !post.isStrategy) return false;
    if (strategyFilter === "non-strategy" && post.isStrategy) return false;
    return true;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleFilterChange = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    setCurrentPage(1);
  };

  // Performance distribution data
  const performanceDistribution = [
    { level: "Low", count: allPosts.filter(p => p.performanceLevel === "low").length, color: "#ef4444" },
    { level: "Average", count: allPosts.filter(p => p.performanceLevel === "average").length, color: "#f59e0b" },
    { level: "High", count: allPosts.filter(p => p.performanceLevel === "high").length, color: "#22c55e" },
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image": return <ImageIcon className="h-3 w-3" />;
      case "video": return <Video className="h-3 w-3" />;
      case "carousel": return <BarChart3 className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-zinc-100 mb-2">
          Content Performance
        </h2>
        <p className="text-sm text-slate-700 dark:text-zinc-400">
          Analyze which posts worked best and understand your content distribution
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top/Bottom Posts Table */}
        <Card className="lg:col-span-2 border-2 border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-slate-900 dark:text-zinc-50">Top & Bottom Posts</CardTitle>
                <CardDescription className="text-slate-600 dark:text-zinc-400">
                  Click to sort by different metrics
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {/* Media Filter */}
                <select
                  value={mediaFilter}
                  onChange={(e) => handleFilterChange(setMediaFilter, e.target.value as MediaFilter)}
                  className="text-xs px-3 py-1.5 rounded-md border-2 border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 font-medium"
                >
                  <option value="all">All Media</option>
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="carousel">Carousel</option>
                </select>
                {/* Strategy Filter */}
                <select
                  value={strategyFilter}
                  onChange={(e) => handleFilterChange(setStrategyFilter, e.target.value as StrategyFilter)}
                  className="text-xs px-3 py-1.5 rounded-md border-2 border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 font-medium"
                >
                  <option value="all">All Posts</option>
                  <option value="strategy">Strategy Only</option>
                  <option value="non-strategy">Non-Strategy</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200 dark:border-zinc-800">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-slate-700 dark:text-zinc-400">
                      Post
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-slate-700 dark:text-zinc-400">
                      <SortButton 
                        field="reach" 
                        label="Reach" 
                        currentField={sortField}
                        currentOrder={sortOrder}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-slate-700 dark:text-zinc-400">
                      <SortButton 
                        field="engagement" 
                        label="Engagement" 
                        currentField={sortField}
                        currentOrder={sortOrder}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-slate-700 dark:text-zinc-400">
                      <SortButton 
                        field="followers" 
                        label="Followers" 
                        currentField={sortField}
                        currentOrder={sortOrder}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="text-center py-3 px-4 text-xs font-semibold text-slate-700 dark:text-zinc-400">
                      Strategy
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPosts.map((post, index) => {
                    const globalIndex = startIndex + index;
                    const isTop3 = globalIndex < 3;
                    const isBottom3 = globalIndex >= sortedPosts.length - 3;
                    return (
                      <tr
                        key={post.id}
                        onClick={() => onPostClick?.(post)}
                        className={cn(
                          "border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 cursor-pointer transition-colors",
                          isTop3 && "bg-emerald-50/30 dark:bg-emerald-900/10",
                          isBottom3 && "bg-red-50/30 dark:bg-red-900/10"
                        )}
                      >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 dark:text-zinc-500 text-xs">{getMediaIcon(post.mediaType)}</span>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-zinc-100 line-clamp-1">
                              {post.postPreview}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-zinc-500">{post.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-semibold text-slate-900 dark:text-zinc-100">
                        {post.reach.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-semibold text-slate-900 dark:text-zinc-100">
                        {post.engagement}%
                      </td>
                      <td className="py-3 px-4 text-right text-sm font-semibold text-emerald-600 dark:text-emerald-500">
                        +{post.followers}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {post.isStrategy ? (
                          <Badge variant="secondary" className="text-xs">Yes</Badge>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-zinc-600">No</span>
                        )}
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-4 py-4 border-t-2 border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-zinc-400">Show</span>
                <select
                  value={postsPerPage}
                  onChange={(e) => {
                    setPostsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="text-xs px-2 py-1 rounded-md border-2 border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 font-medium"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={14}>All</option>
                </select>
                <span className="text-sm text-slate-600 dark:text-zinc-400">
                  Showing {startIndex + 1}-{Math.min(endIndex, sortedPosts.length)} of {sortedPosts.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-md border-2 border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-slate-700 dark:text-zinc-300" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                        page === currentPage
                          ? "bg-linkedin-blue text-white"
                          : "border-2 border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-md border-2 border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-slate-700 dark:text-zinc-300" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Distribution */}
        <Card className="border-2 border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900 dark:text-zinc-50">Performance Distribution</CardTitle>
            <CardDescription className="text-slate-600 dark:text-zinc-400">
              Where most of your content sits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceDistribution} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-zinc-800" />
                  <XAxis 
                    dataKey="level" 
                    className="text-xs text-slate-600 dark:text-zinc-400"
                  />
                  <YAxis 
                    className="text-xs text-slate-600 dark:text-zinc-400"
                    label={{ value: 'Posts', angle: -90, position: 'insideLeft', className: "text-slate-600 dark:text-zinc-400" }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)',
                      border: '2px solid var(--linkedin-blue)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {performanceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {performanceDistribution.map((item) => (
                <div key={item.level} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-700 dark:text-zinc-300">{item.level} Performance</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-zinc-50">{item.count} posts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
