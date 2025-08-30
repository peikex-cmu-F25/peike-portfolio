import React from 'react';
import { motion } from 'framer-motion';

interface GeometricSectionDividerProps {
  variant?: 'mathematical' | 'geometric' | 'minimal' | 'complex';
  height?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'accent' | 'emerald' | 'violet' | 'gradient' | 'neutral';
  animated?: boolean;
  className?: string;
}

const GeometricSectionDivider: React.FC<GeometricSectionDividerProps> = ({
  variant = 'mathematical',
  height = 'md',
  color = 'gradient',
  animated = true,
  className = ''
}) => {
  const heightClasses = {
    sm: 'h-8',
    md: 'h-16',
    lg: 'h-24',
    xl: 'h-32'
  };

  const colorClasses = {
    accent: 'text-accent-400',
    emerald: 'text-emerald-400',
    violet: 'text-violet-400',
    gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-emerald-400',
    neutral: 'text-primary-300'
  };

  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const renderMathematicalDivider = () => (
    <div className={`w-full ${heightClasses[height]} flex items-center justify-center ${className}`}>
      <div className="flex items-center space-x-8">
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          className={`text-2xl font-mathematical ${colorClasses[color]}`}
        >
          ∫
        </motion.div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent-300 to-transparent" />
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          transition={{ delay: 0.2 }}
          className={`text-2xl font-mathematical ${colorClasses[color]}`}
        >
          ∑
        </motion.div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent-300 to-transparent" />
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          transition={{ delay: 0.4 }}
          className={`text-2xl font-mathematical ${colorClasses[color]}`}
        >
          ∏
        </motion.div>
      </div>
    </div>
  );

  const renderGeometricDivider = () => (
    <div className={`w-full ${heightClasses[height]} flex items-center justify-center ${className}`}>
      <div className="flex items-center space-x-6">
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          className="w-3 h-3 bg-accent-400 rounded-full"
        />
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          transition={{ delay: 0.1 }}
          className="w-2 h-2 bg-emerald-400 rounded-full"
        />
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          transition={{ delay: 0.2 }}
          className="w-4 h-4 bg-violet-400 transform rotate-45"
        />
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          transition={{ delay: 0.3 }}
          className="w-2 h-2 bg-emerald-400 rounded-full"
        />
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          transition={{ delay: 0.4 }}
          className="w-3 h-3 bg-accent-400 rounded-full"
        />
      </div>
    </div>
  );

  const renderMinimalDivider = () => (
    <div className={`w-full ${heightClasses[height]} flex items-center justify-center ${className}`}>
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-accent-300 to-transparent" />
    </div>
  );

  const renderComplexDivider = () => (
    <div className={`w-full ${heightClasses[height]} flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Central geometric shape */}
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          className="w-8 h-8 border-2 border-accent-300 transform rotate-45"
        />
        
        {/* Surrounding elements */}
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          transition={{ delay: 0.2 }}
          className="absolute -top-2 -left-2 w-4 h-4 bg-emerald-400 rounded-full"
        />
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          transition={{ delay: 0.4 }}
          className="absolute -top-2 -right-2 w-4 h-4 bg-violet-400 rounded-full"
        />
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          transition={{ delay: 0.6 }}
          className="absolute -bottom-2 -left-2 w-4 h-4 bg-violet-400 rounded-full"
        />
        <motion.div
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={variants}
          transition={{ delay: 0.8 }}
          className="absolute -bottom-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full"
        />
      </div>
    </div>
  );

  const renderDivider = () => {
    switch (variant) {
      case 'mathematical':
        return renderMathematicalDivider();
      case 'geometric':
        return renderGeometricDivider();
      case 'minimal':
        return renderMinimalDivider();
      case 'complex':
        return renderComplexDivider();
      default:
        return renderMathematicalDivider();
    }
  };

  return (
    <div className="relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230ea5e9' fill-opacity='0.1'%3E%3Cpolygon points='30,0 60,30 30,60 0,30'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      {/* Main divider content */}
      <div className="relative z-10">
        {renderDivider()}
      </div>
    </div>
  );
};

export default GeometricSectionDivider;
