// Performance configuration
export const PERFORMANCE_CONFIG = {
  // Image optimization settings
  images: {
    quality: 80,
    format: 'webp',
    sizes: {
      thumbnail: 200,
      small: 400,
      medium: 800,
      large: 1200,
    },
  },

  // Animation settings based on device performance
  animations: {
    lowPerformance: {
      duration: 0.3,
      easing: 'ease-out',
      particleCount: 2,
      complexAnimations: false,
    },
    highPerformance: {
      duration: 0.6,
      easing: 'easeInOut',
      particleCount: 8,
      complexAnimations: true,
    },
  },

  // 3D graphics settings
  graphics: {
    lowPerformance: {
      enabled: false,
      fallbackGradient: true,
    },
    highPerformance: {
      enabled: true,
      antialiasing: true,
      shadows: true,
      postProcessing: true,
    },
  },

  // Lazy loading settings
  lazyLoading: {
    rootMargin: '100px',
    threshold: 0.1,
    imageRootMargin: '200px',
  },

  // Bundle splitting
  chunks: {
    vendor: ['react', 'react-dom'],
    three: ['three', 'postprocessing'],
    animations: ['framer-motion', '@react-spring/web'],
    ui: ['@heroui/button', '@heroui/system', '@heroui/theme'],
    icons: ['react-icons', 'lucide-react'],
  },
};

export default PERFORMANCE_CONFIG;