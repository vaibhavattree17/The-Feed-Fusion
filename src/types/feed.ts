export interface FeedItem {
  id: string;
  title: string;
  content: string;
  author: string;
  platform: 'twitter' | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'reddit';
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  imageUrl?: string;
  profileUrl?: string;
  verified?: boolean;
  trending?: boolean;
}

export interface FeedFilter {
  platform?: string;
  timeRange?: '1h' | '24h' | '7d' | '30d' | 'all';
  sortBy?: 'latest' | 'popular' | 'trending';
}

export interface AnimationConfig {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}