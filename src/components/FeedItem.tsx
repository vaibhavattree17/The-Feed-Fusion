import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Verified, TrendingUp, ExternalLink, MoreHorizontal } from 'lucide-react';
import { FeedItem as FeedItemType } from '@/types/feed';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface FeedItemProps {
  item: FeedItemType;
  index: number;
}

const platformColors = {
  twitter: '#1DA1F2',
  facebook: '#4267B2',
  instagram: '#E4405F',
  linkedin: '#0077B5',
  youtube: '#FF0000',
  reddit: '#FF4500'
};

export const FeedItem = ({ item, index }: FeedItemProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <motion.article
      className="group relative py-6 border-b border-gray-800/50 hover:bg-gray-900/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      {/* Trending Indicator */}
      {item.trending && (
        <motion.div
          className="absolute left-0 top-6 w-1 h-16 bg-gradient-to-b from-orange-400 to-red-500 rounded-r-full"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        />
      )}

      <div className="flex space-x-4 px-6">
        {/* Profile Image */}
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src={item.profileUrl}
            alt={item.author}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-700"
          />
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white hover:underline cursor-pointer">
                {item.author}
              </h3>
              {item.verified && (
                <Verified className="w-4 h-4 text-blue-500 fill-current" />
              )}
              <span 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: platformColors[item.platform] }}
              />
              <span className="text-sm text-gray-400">
                {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
              </span>
              {item.trending && (
                <motion.div
                  className="flex items-center space-x-1 px-2 py-1 bg-orange-900/30 text-orange-400 rounded-full text-xs font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <TrendingUp className="w-3 h-3" />
                  <span>Trending</span>
                </motion.div>
              )}
            </div>
            
            <motion.button
              className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-gray-700 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </motion.button>
          </div>

          {/* Post Content */}
          <div className="mb-3">
            <p className="text-gray-100 leading-relaxed">
              {isExpanded ? item.content : item.content.slice(0, 280)}
              {item.content.length > 280 && !isExpanded && '...'}
            </p>
            {item.content.length > 280 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-1"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Image */}
          {item.imageUrl && (
            <motion.div
              className="mb-3 rounded-2xl overflow-hidden border border-gray-700"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={item.imageUrl}
                alt="Post content"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-6">
              {/* Like */}
              <motion.button
                className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors group/like"
                onClick={handleLike}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-2 rounded-full hover:bg-red-900/20 transition-colors">
                  <Heart 
                    className={`w-5 h-5 transition-all ${
                      isLiked 
                        ? 'fill-red-500 text-red-500 scale-110' 
                        : 'group-hover/like:text-red-500'
                    }`}
                  />
                </div>
                <span className="text-sm font-medium">
                  {likes.toLocaleString()}
                </span>
              </motion.button>

              {/* Comment */}
              <motion.button
                className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors group/comment"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-2 rounded-full hover:bg-blue-900/20 transition-colors">
                  <MessageCircle className="w-5 h-5 group-hover/comment:text-blue-500 transition-colors" />
                </div>
                <span className="text-sm font-medium">
                  {item.comments.toLocaleString()}
                </span>
              </motion.button>

              {/* Share */}
              <motion.button
                className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors group/share"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-2 rounded-full hover:bg-green-900/20 transition-colors">
                  <Share2 className="w-5 h-5 group-hover/share:text-green-500 transition-colors" />
                </div>
                <span className="text-sm font-medium">
                  {item.shares.toLocaleString()}
                </span>
              </motion.button>
            </div>

            {/* External Link */}
            <motion.button
              className="opacity-0 group-hover:opacity-100 p-2 rounded-full hover:bg-gray-700 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
