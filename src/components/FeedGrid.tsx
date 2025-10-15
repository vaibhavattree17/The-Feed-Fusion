import { motion, AnimatePresence } from 'framer-motion';
import { FeedItem } from './FeedItem';
import { SkeletonGrid } from './SkeletonCard';
import { FeedItem as FeedItemType } from '@/types/feed';
import { AlertCircle, Wifi, RefreshCw } from 'lucide-react';

interface FeedGridProps {
  feeds: FeedItemType[];
  loading: boolean;
  onRetry?: () => void;
}

export const FeedGrid = ({ feeds, loading, onRetry }: FeedGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const EmptyState = () => (
    <motion.div
      className="flex flex-col items-center justify-center py-20 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-24 h-24 rounded-full glass flex items-center justify-center"
        style={{
          backgroundColor: 'var(--card-bg)',
          boxShadow: 'var(--shadow-card)'
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Wifi className="w-12 h-12" style={{ color: 'var(--accent-blue)' }} />
      </motion.div>
      
      <div className="text-center space-y-2">
        <h3 
          className="text-xl font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          No feeds found
        </h3>
        <p 
          className="text-base max-w-md"
          style={{ color: 'var(--text-muted)' }}
        >
          Try adjusting your filters or check back later for new content
        </p>
      </div>
      
      {onRetry && (
        <motion.button
          className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all"
          style={{
            backgroundColor: 'var(--accent-blue)',
            color: 'var(--bg-primary)'
          }}
          onClick={onRetry}
          whileHover={{ 
            scale: 1.05,
            boxShadow: 'var(--glow-blue)'
          }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-5 h-5" />
          <span>Refresh</span>
        </motion.button>
      )}
    </motion.div>
  );

  const ErrorState = () => (
    <motion.div
      className="flex flex-col items-center justify-center py-20 space-y-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-24 h-24 rounded-full glass flex items-center justify-center"
        style={{
          backgroundColor: 'var(--accent-red)',
          color: 'var(--bg-primary)'
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <AlertCircle className="w-12 h-12" />
      </motion.div>
      
      <div className="text-center space-y-2">
        <h3 
          className="text-xl font-semibold"
          style={{ color: 'var(--text-primary)' }}
        >
          Something went wrong
        </h3>
        <p 
          className="text-base max-w-md"
          style={{ color: 'var(--text-muted)' }}
        >
          We couldn't load your feeds. Please try again.
        </p>
      </div>
      
      <motion.button
        className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all"
        style={{
          backgroundColor: 'var(--accent-red)',
          color: 'var(--bg-primary)'
        }}
        onClick={onRetry}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 20px rgba(255, 71, 87, 0.3)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <RefreshCw className="w-5 h-5" />
        <span>Try Again</span>
      </motion.button>
    </motion.div>
  );

  if (loading) {
    return <SkeletonGrid count={9} />;
  }

  if (feeds.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div
      className="max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence mode="popLayout">
        {feeds.map((feed, index) => (
          <FeedItem key={feed.id} item={feed} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};