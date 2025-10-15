import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<Record<string, never>>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<Record<string, never>>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('FeedFusion Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <motion.div
          className="min-h-screen flex items-center justify-center p-6"
          style={{ backgroundColor: 'var(--bg-primary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center space-y-8 max-w-lg"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto rounded-full glass flex items-center justify-center"
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
              <AlertTriangle className="w-12 h-12" />
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                className="text-3xl font-bold"
                style={{ color: 'var(--text-primary)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Oops! Something went wrong
              </motion.h1>
              
              <motion.p
                className="text-lg"
                style={{ color: 'var(--text-muted)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                We encountered an unexpected error. Don't worry, it's not your fault!
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all"
                style={{
                  backgroundColor: 'var(--accent-blue)',
                  color: 'var(--bg-primary)'
                }}
                onClick={() => window.location.reload()}
                whileHover={{
                  scale: 1.05,
                  boxShadow: 'var(--glow-blue)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </motion.button>

              <motion.button
                className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all border"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  borderColor: 'var(--border-primary)'
                }}
                onClick={() => (window.location.href = '/')}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'var(--card-bg-hover)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </motion.button>
            </motion.div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details
                className="text-left mt-8 p-4 rounded-lg"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-secondary)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <summary className="cursor-pointer font-medium mb-2">
                  Error Details (Development Mode)
                </summary>
                <pre className="text-xs overflow-auto">
                  {this.state.error.stack}
                </pre>
              </motion.details>
            )}
          </motion.div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}