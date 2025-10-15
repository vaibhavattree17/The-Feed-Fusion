import { motion } from 'framer-motion';
import { FilterBar } from '@/components/FilterBar';
import { FeedGrid } from '@/components/FeedGrid';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { LoadingSpinner, TypewriterText } from '@/components/LoadingSpinner';
import { useFeedData } from '@/hooks/useFeedData';
import '@/styles/theme.css';

export default function FeedFusion() {
  const { feeds, loading, filter, updateFilter } = useFeedData();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Modern Navbar & Filters */}
      <FilterBar filter={filter} onFilterChange={updateFilter} />

      {/* Main Content */}
      <main className="pt-32 pb-20">
        {loading ? (
          <motion.div
            className="flex flex-col items-center justify-center py-20 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LoadingSpinner size="lg" color="blue" />
            <div className="text-center space-y-4">
              <TypewriterText 
                text="Loading your personalized feed..." 
                speed={60}
              />
              <motion.p
                className="text-sm text-gray-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Aggregating content from all your favorite platforms
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Modern Stats Bar */}
            <motion.div
              className="max-w-2xl mx-auto px-6 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center justify-between py-4 border-b border-gray-800/30">
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-white">{feeds.length.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">posts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-white">{new Set(feeds.map(f => f.platform)).size}</span>
                    <span className="text-sm text-gray-500">platforms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-white">{feeds.filter(f => f.trending).length}</span>
                    <span className="text-sm text-gray-500">trending</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Live</span>
                </div>
              </div>
            </motion.div>

            {/* Feed */}
            <div className="px-6">
              <FeedGrid 
                feeds={feeds} 
                loading={false} 
                onRetry={handleRefresh}
              />
            </div>
          </>
        )}
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onRefresh={handleRefresh} />
    </div>
  );
}