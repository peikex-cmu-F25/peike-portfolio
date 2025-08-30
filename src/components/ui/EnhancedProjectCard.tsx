import React from 'react';
import { motion } from 'framer-motion';
import { ProjectData } from '../../data/portfolio';

interface EnhancedProjectCardProps {
  project: ProjectData;
  layout: 'horizontal' | 'vertical' | 'featured';
  onClick: () => void;
  onDemoClick: (e: React.MouseEvent) => void;
  hasDemo: boolean;
}

// Custom project thumbnails based on project type
const getProjectThumbnail = (project: ProjectData) => {
  const { category, title } = project;
  
  // AI/ML projects
  if (category === 'AI/ML') {
    if (title.toLowerCase().includes('rag')) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center">
          <div className="text-4xl">🧠</div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMTAwIiB5Mj0iMTAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9InJnYmEoMTM5LCA5MiwgMjQ2LCAwLjEpIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0icmdiYSgxNCwgMTY1LCAyMzMsIDAuMSkiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K')] opacity-20" />
        </div>
      );
    }
    if (title.toLowerCase().includes('receipt')) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-teal-600/20 flex items-center justify-center">
          <div className="text-4xl">📄</div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMTAwIiB5Mj0iMTAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9InJnYmEoMTYsIDE4NSwgMTI5LCAwLjEpIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0icmdiYSg1LCAxNTAsIDEwNSwgMC4xKSIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=')] opacity-20" />
        </div>
      );
    }
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-600/20 flex items-center justify-center">
        <div className="text-4xl">🤖</div>
      </div>
    );
  }
  
  // Full Stack projects
  if (category === 'Full Stack') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center">
        <div className="text-4xl">💻</div>
      </div>
    );
  }
  
  // Cloud/DevOps projects
  if (category === 'Cloud/DevOps') {
    return (
      <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center">
        <div className="text-4xl">☁️</div>
      </div>
    );
  }
  
  // Mobile projects
  return (
    <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-600/20 flex items-center justify-center">
      <div className="text-4xl">📱</div>
    </div>
  );
};

// Geometric progress bar component
const GeometricProgressBar: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const numericValue = parseInt(value.replace(/%/g, ''));
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs text-secondary-500">{label}</span>
        <span className="text-sm font-bold text-primary-600">{value}</span>
      </div>
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${numericValue}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent-500 to-emerald-500 relative"
        >
          {/* Geometric pattern overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpolygon points='10,0 20,10 10,20 0,10'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '8px 8px'
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Radial chart component for metrics
const RadialMetricChart: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const numericValue = parseInt(value.replace(/%/g, ''));
  const circumference = 2 * Math.PI * 18; // radius = 18
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (numericValue / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 40 40">
          {/* Background circle */}
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="rgb(229 231 235)"
            strokeWidth="3"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="20"
            cy="20"
            r="18"
            stroke="url(#radialGradient)"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-primary-600">{value}</span>
        </div>
      </div>
      <span className="text-xs text-secondary-500 text-center">{label}</span>
      
      {/* SVG definitions */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="radialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(14 165 233)" />
            <stop offset="100%" stopColor="rgb(16 185 129)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({ 
  project, 
  layout, 
  onClick, 
  onDemoClick, 
  hasDemo 
}) => {
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Different layouts for visual variety
  if (layout === 'horizontal') {
    return (
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-primary-100"
        onClick={onClick}
      >
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
            {getProjectThumbnail(project)}
            {/* Geometric accent */}
            <div className="absolute top-4 right-4 w-8 h-8 border border-accent-200 opacity-40 rounded-full" />
          </div>
          
          {/* Right side - Content */}
          <div className="md:w-3/5 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.category === 'AI/ML' ? 'bg-purple-100 text-purple-800' :
                  project.category === 'Full Stack' ? 'bg-blue-100 text-blue-800' :
                  project.category === 'Cloud/DevOps' ? 'bg-green-100 text-green-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-secondary-900 mb-2">
                {project.title}
              </h3>
              
              <p className="text-secondary-600 mb-4 line-clamp-2">
                {project.description}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            {/* Metrics with geometric progress bars */}
            <div className="space-y-3">
              {project.metrics.slice(0, 2).map((metric, index) => (
                <GeometricProgressBar key={index} value={metric.value} label={metric.label} />
              ))}
            </div>
            
            {/* Demo Button */}
            {hasDemo && (
              <div className="mt-4">
                <button
                  onClick={onDemoClick}
                  className="w-full btn-primary text-sm py-2"
                >
                  🚀 Try Interactive Demo
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (layout === 'featured') {
    return (
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-accent-200 relative"
        onClick={onClick}
      >
        {/* Featured badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
            ⭐ Featured
          </span>
        </div>
        
        {/* Geometric background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230ea5e9' fill-opacity='0.1'%3E%3Cpolygon points='30,0 60,30 30,60 0,30'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
        
        <div className="relative z-10">
          {/* Header image */}
          <div className="h-48 relative overflow-hidden">
            {getProjectThumbnail(project)}
            {/* Geometric accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-emerald-500/10" />
            <div className="absolute top-4 right-4 w-12 h-12 border-2 border-accent-200 opacity-60 rounded-full" />
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.category === 'AI/ML' ? 'bg-purple-100 text-purple-800' :
                project.category === 'Full Stack' ? 'bg-blue-100 text-blue-800' :
                project.category === 'Cloud/DevOps' ? 'bg-green-100 text-green-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {project.category}
              </span>
              <span className="text-secondary-500 text-sm">{project.year}</span>
            </div>
            
            <h3 className="text-2xl font-bold text-secondary-900 mb-3">
              {project.title}
            </h3>
            
            <p className="text-secondary-600 mb-6 line-clamp-3">
              {project.description}
            </p>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full font-medium">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
            
            {/* Metrics with radial charts */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {project.metrics.slice(0, 3).map((metric, index) => (
                <RadialMetricChart key={index} value={metric.value} label={metric.label} />
              ))}
            </div>
            
            {/* Demo Button */}
            {hasDemo && (
              <div className="mt-6">
                <button
                  onClick={onDemoClick}
                  className="w-full btn-primary text-sm py-3"
                >
                  🚀 Try Interactive Demo
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Default vertical layout
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-primary-100"
      onClick={onClick}
    >
      {/* Geometric background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230ea5e9' fill-opacity='0.1'%3E%3Cpolygon points='20,0 40,20 20,40 0,20'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      <div className="relative z-10">
        {/* Header image */}
        <div className="h-48 relative overflow-hidden">
          {getProjectThumbnail(project)}
          {/* Geometric accent */}
          <div className="absolute top-4 right-4 w-8 h-8 border border-accent-200 opacity-40 rounded-full" />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.category === 'AI/ML' ? 'bg-purple-100 text-purple-800' :
              project.category === 'Full Stack' ? 'bg-blue-100 text-blue-800' :
              project.category === 'Cloud/DevOps' ? 'bg-green-100 text-green-800' :
              'bg-orange-100 text-orange-800'
            }`}>
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                Featured
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-secondary-900 mb-2">
            {project.title}
          </h3>
          
          <p className="text-secondary-600 mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
          
          {/* Metrics with geometric progress bars */}
          <div className="space-y-3 mb-4">
            {project.metrics.slice(0, 2).map((metric, index) => (
              <GeometricProgressBar key={index} value={metric.value} label={metric.label} />
            ))}
          </div>
          
          {/* Demo Button */}
          {hasDemo && (
            <div className="mt-auto">
              <button
                onClick={onDemoClick}
                className="w-full btn-primary text-sm py-2"
              >
                🚀 Try Interactive Demo
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedProjectCard;
