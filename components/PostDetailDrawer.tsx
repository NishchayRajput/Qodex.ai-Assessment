"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ThumbsUp, MessageCircle, Share2, TrendingUp, Users, Calendar, Clock, Image as ImageIcon, FileText, Video, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

interface PostDetailDrawerProps {
  post: PostData | null;
  open: boolean;
  onClose: () => void;
}

export function PostDetailDrawer({ post, open, onClose }: PostDetailDrawerProps) {
  if (!post) return null;

  // Mock detailed data
  const likes = Math.floor(post.reach * (post.engagement / 100) * 0.6);
  const comments = Math.floor(post.reach * (post.engagement / 100) * 0.25);
  const shares = Math.floor(post.reach * (post.engagement / 100) * 0.15);

  // Mock reach timeline data (24h vs later)
  const reachTimeline = [
    { hour: "0-4h", reach: Math.floor(post.reach * 0.35) },
    { hour: "4-8h", reach: Math.floor(post.reach * 0.25) },
    { hour: "8-12h", reach: Math.floor(post.reach * 0.15) },
    { hour: "12-16h", reach: Math.floor(post.reach * 0.12) },
    { hour: "16-20h", reach: Math.floor(post.reach * 0.08) },
    { hour: "20-24h", reach: Math.floor(post.reach * 0.05) },
  ];

  const getMediaIcon = () => {
    switch (post.mediaType) {
      case "image": return <ImageIcon className="h-4 w-4 text-linkedin-blue" />;
      case "video": return <Video className="h-4 w-4 text-linkedin-blue" />;
      case "carousel": return <BarChart3 className="h-4 w-4 text-linkedin-blue" />;
      default: return <FileText className="h-4 w-4 text-linkedin-blue" />;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-white dark:bg-zinc-950 px-6">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold text-slate-900 dark:text-zinc-50">Post Details</SheetTitle>
          <SheetDescription className="text-slate-600 dark:text-zinc-400">Comprehensive analytics for this post</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Post Preview */}
          <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg p-4 border border-slate-200 dark:border-zinc-800">
            <p className="text-sm font-medium text-slate-900 dark:text-zinc-50">
              {post.postPreview}
            </p>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-slate-500 dark:text-zinc-500" />
                <span className="text-xs text-slate-500 dark:text-zinc-500">{post.date}</span>
              </div>
              {post.mediaType && (
                <div className="flex items-center gap-1">
                  {getMediaIcon()}
                  <span className="text-xs text-slate-600 dark:text-zinc-400 capitalize">{post.mediaType}</span>
                </div>
              )}
              {post.isStrategy && (
                <Badge variant="secondary" className="text-xs">Strategy Post</Badge>
              )}
              {post.performanceLevel && (
                <Badge 
                  variant={post.performanceLevel === "high" ? "default" : post.performanceLevel === "average" ? "outline" : "destructive"}
                  className="text-xs capitalize"
                >
                  {post.performanceLevel} Performance
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Reach Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-linkedin-blue" />
              Reach Timeline (First 24 Hours)
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reachTimeline} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-zinc-800" />
                  <XAxis 
                    dataKey="hour" 
                    className="text-xs text-slate-600 dark:text-zinc-400"
                  />
                  <YAxis 
                    className="text-xs text-slate-600 dark:text-zinc-400"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)',
                      border: '2px solid var(--linkedin-blue)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="reach"
                    stroke="#0A66C2"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#0A66C2" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2">
              <strong>{((reachTimeline[0].reach / post.reach) * 100).toFixed(0)}%</strong> of reach happened in first 4 hours
            </p>
          </div>

          <Separator />

          {/* Key Metrics */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-50 mb-4">
              Performance Overview
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-linkedin-blue/5 dark:bg-linkedin-blue/10 rounded-lg p-4 border border-linkedin-blue/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-linkedin-blue" />
                  <span className="text-xs font-medium text-slate-600 dark:text-zinc-400">Total Reach</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-zinc-50">
                  {post.reach.toLocaleString()}
                </p>
              </div>

              <div className="bg-emerald-500/5 dark:bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-medium text-slate-600 dark:text-zinc-400">Engagement Rate</span>
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-zinc-50">
                  {post.engagement}%
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Engagement Breakdown */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-50 mb-4">
              Engagement Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <ThumbsUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">Likes</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-zinc-50">
                  {likes.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">Comments</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-zinc-50">
                  {comments.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Share2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">Shares</span>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-zinc-50">
                  {shares.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Growth Impact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-50 mb-4">
              Growth Impact
            </h3>
            <div className="bg-linear-to-r from-linkedin-blue/10 to-emerald-500/10 rounded-lg p-4 border border-slate-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-linkedin-blue" />
                  <span className="text-sm font-medium text-slate-700 dark:text-zinc-300">
                    Followers Gained
                  </span>
                </div>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-500">
                  +{post.followers}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2">
                New followers attributed to this post
              </p>
            </div>
          </div>

          {/* Comparison to Average */}
          {post.rollingAverage && (
            <div className="bg-slate-50 dark:bg-zinc-900 rounded-lg p-4 border border-slate-200 dark:border-zinc-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-50 mb-3">
                Comparison to 7-Post Average
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-zinc-400">This Post</span>
                  <span className="font-bold text-slate-900 dark:text-zinc-50">
                    {post.reach.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-zinc-400">Rolling Avg</span>
                  <span className="font-bold text-slate-900 dark:text-zinc-50">
                    {Math.round(post.rollingAverage).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200 dark:border-zinc-800">
                  <span className="text-slate-600 dark:text-zinc-400">Difference</span>
                  <span className={`font-bold ${post.reach > post.rollingAverage ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                    {post.reach > post.rollingAverage ? '+' : ''}
                    {((post.reach - post.rollingAverage) / post.rollingAverage * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Strategy Applied */}
          {post.isStrategy && (
            <div className="bg-linkedin-blue/5 dark:bg-linkedin-blue/10 rounded-lg p-4 border border-linkedin-blue/20">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-zinc-50 mb-3">
                Strategy Applied
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-linkedin-blue mt-0.5">✓</span>
                  <span>Engaging hook in first line</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-linkedin-blue mt-0.5">✓</span>
                  <span>Value-driven content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-linkedin-blue mt-0.5">✓</span>
                  <span>Clear call-to-action</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-linkedin-blue mt-0.5">✓</span>
                  <span>Posted at optimal time</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
