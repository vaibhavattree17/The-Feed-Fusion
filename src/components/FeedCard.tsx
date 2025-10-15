import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Verified, TrendingUp, ExternalLink } from 'lucide-react';
import { FeedItem } from '@/types/feed';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface FeedCardProps {
  item: FeedItem;
  index: number;
}

const platformIcons = {
  twitter: '🐦',
  facebook: '📘',
  instagram: '📷',
  linkedin: '💼',
  youtube: '📺',
  reddit: '🤖'
};

const platformColors = {
  twitter: '#1DA1F2',
  facebook: '#4267B2',
  instagram: '#E4405F',
  linkedin: '#0077B5',
  youtube: '#FF0000',
  reddit: '#FF4500'
};

export const FeedCard = ({ item, index }: FeedCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const contentVariants = {
    collapsed: { height: 'auto', maxHeight: '4rem' },
    expanded: { height: 'auto', maxHeight: 'none' }
  };

  return (
    <motion.div
      className="group relative"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <motion.div
        className="glass rounded-xl p-6 relative overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: 'var(--card-bg)',
          boxShadow: 'var(--shadow-card)'
        }}
        whileHover={{
          boxShadow: 'var(--shadow-card-hover)',
          backgroundColor: 'var(--card-bg-hover)'
        }}
      >
        {/* Trending Indicator */}
        {item.trending && (
          <motion.div
            className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: 'var(--accent-green)',
              color: 'var(--bg-primary)'
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            <TrendingUp className="w-3 h-3" />
            <span>Trending</span>
          </motion.div>
        )}

        {/* Platform Badge */}
        <motion.div
          className="absolute top-4 left-4 flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium glass"
          style={{
            borderColor: platformColors[item.platform]
          }}
          whileHover={{ scale: 1.05 }}
        >
          <span>{platformIcons[item.platform]}</span>
          <span className="capitalize">{item.platform}</span>
        </motion.div>

        {/* Header */}
        <div className="flex items-center space-x-3 mt-12 mb-4">
          <motion.img
            src={item.profileUrl}
            alt={item.author}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-border-primary"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 
                className="font-semibold truncate"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.author}
              </h3>
              {item.verified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  <Verified 
                    className="w-4 h-4 fill-current"
                    style={{ color: 'var(--accent-blue)' }}
                  />
                </motion.div>
              )}
            </div>
            <p 
              className="text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
            </p>
          </div>
          <motion.button
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-border-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          </motion.button>
        </div>

        {/* Content */}
        <motion.div
          className="mb-4 overflow-hidden"
          variants={contentVariants}
          animate={isExpanded ? 'expanded' : 'collapsed'}
        >
          <p 
            className="text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {item.content}
          </p>
          {item.content.length > 150 && (
            <motion.button
              className="text-sm mt-2 font-medium hover:underline"
              style={{ color: 'var(--accent-blue)' }}
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.05 }}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </motion.button>
          )}
        </motion.div>

        {/* Image */}
        {item.imageUrl && (
          <motion.div
            className="mb-4 rounded-lg overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={item.imageUrl}
              alt="Feed content"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.button
              className="flex items-center space-x-2 group/like"
              onClick={handleLike}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`p-2 rounded-full transition-colors ${
                  isLiked ? 'bg-red-500/20' : 'hover:bg-border-primary'
                }`}
                whileHover={{ rotate: isLiked ? 0 : 15 }}
              >
                <Heart 
                  className={`w-5 h-5 transition-colors ${
                    isLiked ? 'fill-red-500 text-red-500' : 'text-text-muted group-hover/like:text-red-400'
                  }`}
                />
              </motion.div>
              <span 
                className="text-sm font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {likes.toLocaleString()}
              </span>
            </motion.button>

            <motion.button
              className="flex items-center space-x-2 group/comment"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 rounded-full hover:bg-border-primary transition-colors">
                <MessageCircle className="w-5 h-5 text-text-muted group-hover/comment:text-accent-blue transition-colors" />
              </div>
              <span 
                className="text-sm font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.comments.toLocaleString()}
              </span>
            </motion.button>

            <motion.button
              className="flex items-center space-x-2 group/share"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 rounded-full hover:bg-border-primary transition-colors">
                <Share2 className="w-5 h-5 text-text-muted group-hover/share:text-accent-green transition-colors" />
              </div>
              <span 
                className="text-sm font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {item.shares.toLocaleString()}
              </span>
            </motion.button>
          </div>

          <motion.div
            className="text-xs px-3 py-1 rounded-full"
            style={{
              backgroundColor: platformColors[item.platform] + '20',
              color: platformColors[item.platform]
            }}
            whileHover={{ scale: 1.05 }}
          >
            {item.platform.toUpperCase()}
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${platformColors[item.platform]}10 50%, transparent 70%)`,
            zIndex: -1
          }}
        />
      </motion.div>
    </motion.div>
  );
};