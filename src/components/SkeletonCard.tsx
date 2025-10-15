import { motion } from 'framer-motion';

export const SkeletonCard = () => {
  return (
    <motion.div
      className="bg-card-bg rounded-xl p-6 space-y-4"
      style={{
        backgroundColor: 'var(--card-bg)',
        boxShadow: 'var(--shadow-card)'
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div 
          className="w-10 h-10 rounded-full shimmer"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        />
        <div className="flex-1 space-y-2">
          <div 
            className="h-4 rounded shimmer"
            style={{ 
              backgroundColor: 'var(--bg-tertiary)',
              width: '70%'
            }}
          />
          <div 
            className="h-3 rounded shimmer"
            style={{ 
              backgroundColor: 'var(--bg-tertiary)',
              width: '40%'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div 
          className="h-4 rounded shimmer"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        />
        <div 
          className="h-4 rounded shimmer"
          style={{ 
            backgroundColor: 'var(--bg-tertiary)',
            width: '90%'
          }}
        />
        <div 
          className="h-4 rounded shimmer"
          style={{ 
            backgroundColor: 'var(--bg-tertiary)',
            width: '60%'
          }}
        />
      </div>

      {/* Image placeholder */}
      <div 
        className="h-48 rounded-lg shimmer"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-8 w-16 rounded shimmer"
              style={{ backgroundColor: 'var(--bg-tertiary)' }}
            />
          ))}
        </div>
        <div 
          className="h-6 w-20 rounded shimmer"
          style={{ backgroundColor: 'var(--bg-tertiary)' }}
        />
      </div>
    </motion.div>
  );
};

export const SkeletonGrid = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: i * 0.1 
          }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  );
};