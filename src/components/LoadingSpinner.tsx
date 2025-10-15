import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'white';
}

export const LoadingSpinner = ({ size = 'md', color = 'blue' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-accent-blue',
    green: 'border-accent-green',
    white: 'border-white'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-t-transparent rounded-full`}
      style={{
        borderColor: `var(--accent-${color})`,
        borderTopColor: 'transparent'
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
};

export const TypewriterText = ({ text, speed = 50 }: { text: string; speed?: number }) => {
  return (
    <motion.div
      className="overflow-hidden whitespace-nowrap border-r-2 border-accent-blue"
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{
        duration: text.length * speed / 1000,
        ease: 'linear'
      }}
    >
      {text}
    </motion.div>
  );
};

export const PulseLoader = () => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: 'var(--accent-blue)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  );
};