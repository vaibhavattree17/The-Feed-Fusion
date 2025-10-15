import { useState, useEffect } from 'react';
import { FeedItem, FeedFilter } from '@/types/feed';

// Mock data generator
const generateMockFeed = (): FeedItem[] => {
  const platforms: FeedItem['platform'][] = ['twitter', 'facebook', 'instagram', 'linkedin', 'youtube', 'reddit'];
  const authors = ['John Doe', 'Jane Smith', 'Alex Johnson', 'Sarah Wilson', 'Mike Brown', 'Lisa Davis'];
  const content = [
    'Just launched our new AI-powered dashboard! The future is here 🚀',
    'Beautiful sunset today. Nature never fails to amaze me 🌅',
    'Working on some exciting new features. Stay tuned! 💻',
    'Coffee and code - the perfect combination ☕',
    'Amazing team meeting today. Great minds think alike! 🧠',
    'New blog post about modern web development is live 📝'
  ];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `feed-${i + 1}`,
    title: `Post ${i + 1}`,
    content: content[Math.floor(Math.random() * content.length)],
    author: authors[Math.floor(Math.random() * authors.length)],
    platform: platforms[Math.floor(Math.random() * platforms.length)],
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    shares: Math.floor(Math.random() * 50),
    imageUrl: Math.random() > 0.7 ? `https://picsum.photos/400/300?random=${i}` : undefined,
    profileUrl: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
    verified: Math.random() > 0.8,
    trending: Math.random() > 0.9
  }));
};

export const useFeedData = () => {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [filteredFeeds, setFilteredFeeds] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FeedFilter>({
    sortBy: 'latest',
    timeRange: 'all'
  });

  useEffect(() => {
    // Simulate API call
    const loadFeeds = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      const mockData = generateMockFeed();
      setFeeds(mockData);
      setLoading(false);
    };

    loadFeeds();
  }, []);

  useEffect(() => {
    let filtered = [...feeds];

    // Platform filter
    if (filter.platform && filter.platform !== 'all') {
      filtered = filtered.filter(feed => feed.platform === filter.platform);
    }

    // Time range filter
    if (filter.timeRange && filter.timeRange !== 'all') {
      const now = new Date();
      const timeRanges = {
        '1h': 1 * 60 * 60 * 1000,
        '24h': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000
      };
      
      const cutoff = new Date(now.getTime() - timeRanges[filter.timeRange]);
      filtered = filtered.filter(feed => new Date(feed.timestamp) > cutoff);
    }

    // Sort
    if (filter.sortBy === 'popular') {
      filtered.sort((a, b) => (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares));
    } else if (filter.sortBy === 'trending') {
      filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    } else {
      filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    setFilteredFeeds(filtered);
  }, [feeds, filter]);

  const updateFilter = (newFilter: Partial<FeedFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };

  return {
    feeds: filteredFeeds,
    loading,
    filter,
    updateFilter
  };
};