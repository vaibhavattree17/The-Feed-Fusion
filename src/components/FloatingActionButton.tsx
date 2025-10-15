import { motion } from 'framer-motion';
import { Plus, RefreshCw, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export const FloatingActionButton = ({ onRefresh }: { onRefresh: () => void }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
      {/* Scroll to Top */}
      <motion.button
        className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center justify-center shadow-lg backdrop-blur-sm"
        onClick={scrollToTop}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: showScrollTop ? 1 : 0, 
          opacity: showScrollTop ? 1 : 0 
        }}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: '#374151'
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <ArrowUp className="w-5 h-5 text-gray-300" />
      </motion.button>

      {/* Refresh Button */}
      <motion.button
        className="w-12 h-12 rounded-full border border-gray-700/50 hover:border-blue-500/50 flex items-center justify-center backdrop-blur-sm hover:bg-blue-500/10 transition-all duration-200"
        onClick={onRefresh}
        whileHover={{ 
          scale: 1.05,
          rotate: 180
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          delay: 0.3 
        }}
      >
        <RefreshCw className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
      </motion.button>

      {/* Add New Post Button */}
      <motion.button
        className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center justify-center shadow-lg backdrop-blur-sm"
        whileHover={{ 
          scale: 1.05,
          rotate: 90,
          backgroundColor: '#374151'
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          delay: 0.5 
        }}
      >
        <Plus className="w-5 h-5 text-gray-300" />
      </motion.button>
    </div>
  );
};