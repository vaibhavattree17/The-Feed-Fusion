import { motion } from 'framer-motion';
import { Search, TrendingUp, Clock, Flame, Bell, User } from 'lucide-react';
import { FeedFilter } from '@/types/feed';
import { useState } from 'react';

interface FilterBarProps {
  filter: FeedFilter;
  onFilterChange: (filter: Partial<FeedFilter>) => void;
}

const platforms = [
  { id: 'all', name: 'All', icon: '🌐' },
  { id: 'twitter', name: 'X', icon: '🐦' },
  { id: 'facebook', name: 'FB', icon: '📘' },
  { id: 'instagram', name: 'IG', icon: '📷' },
  { id: 'linkedin', name: 'LI', icon: '💼' },
  { id: 'youtube', name: 'YT', icon: '📺' },
  { id: 'reddit', name: 'RD', icon: '🤖' }
];

const sortOptions = [
  { id: 'latest', name: 'Latest', icon: Clock },
  { id: 'popular', name: 'Popular', icon: Flame },
  { id: 'trending', name: 'Trending', icon: TrendingUp }
];

export const FilterBar = ({ filter, onFilterChange }: FilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Minimalist One-Line Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800/30"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Elegant Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full opacity-90"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-80 animate-pulse"></div>
              </div>
              <span className="text-xl font-light tracking-wide text-white">
                feed<span className="font-medium text-blue-400">fusion</span>
              </span>
            </motion.div>

            {/* Center Search */}
            <motion.div
              className="flex-1 max-w-md mx-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </motion.div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <motion.button
                className="relative p-2 text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>
              
              <motion.button
                className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full flex items-center justify-center hover:shadow-md transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <User className="w-4 h-4 text-gray-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Clean Filter Bar */}
      <motion.div
        className="fixed top-16 left-0 right-0 z-40 bg-black/90 backdrop-blur-sm border-b border-gray-800/30"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
            {/* Sort Options */}
            {sortOptions.map((option) => (
              <motion.button
                key={option.id}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  filter.sortBy === option.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => onFilterChange({ sortBy: option.id as FeedFilter['sortBy'] })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <option.icon className="w-3.5 h-3.5" />
                <span>{option.name}</span>
              </motion.button>
            ))}

            <div className="w-px h-4 bg-gray-700 mx-2" />

            {/* Platform Filters */}
            {platforms.map((platform) => (
              <motion.button
                key={platform.id}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  (filter.platform || 'all') === platform.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => onFilterChange({ platform: platform.id === 'all' ? undefined : platform.id })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xs">{platform.icon}</span>
                <span>{platform.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};