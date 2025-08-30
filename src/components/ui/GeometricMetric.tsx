import React from 'react'
import { motion } from 'framer-motion'

interface GeometricMetricProps {
  value: string
  label: string
  variant?: 'radial' | 'bar' | 'polygon'
  color?: 'blue' | 'emerald' | 'purple' | 'orange'
  animated?: boolean
  className?: string
}

const GeometricMetric: React.FC<GeometricMetricProps> = ({
  value,
  label,
  variant = 'radial',
  color = 'blue',
  animated = true,
  className = ""
}) => {
  const colorClasses = {
    blue: {
      primary: 'text-blue-600',
      secondary: 'text-blue-400',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      fill: '#3B82F6',
      stroke: '#60A5FA'
    },
    emerald: {
      primary: 'text-emerald-600',
      secondary: 'text-emerald-400', 
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      fill: '#10B981',
      stroke: '#34D399'
    },
    purple: {
      primary: 'text-purple-600',
      secondary: 'text-purple-400',
      bg: 'bg-purple-50', 
      border: 'border-purple-200',
      fill: '#8B5CF6',
      stroke: '#A78BFA'
    },
    orange: {
      primary: 'text-orange-600',
      secondary: 'text-orange-400',
      bg: 'bg-orange-50',
      border: 'border-orange-200', 
      fill: '#F97316',
      stroke: '#FB923C'
    }
  }

  const colors = colorClasses[color]
  
  // Extract numeric value for animations
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0
  const percentage = Math.min(numericValue, 100)

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const RadialMetric = () => {
    const radius = 20
    const strokeWidth = 3
    const normalizedRadius = radius - strokeWidth * 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDasharray = `${circumference} ${circumference}`
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className={`relative w-16 h-16 ${colors.bg} ${colors.border} border rounded-full flex items-center justify-center`}>
        <svg width="40" height="40" className="absolute">
          <circle
            stroke={colors.stroke}
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={20}
            cy={20}
            className="opacity-20"
          />
          <motion.circle
            stroke={colors.fill}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={animated ? circumference : strokeDashoffset}
            strokeLinecap="round"
            animate={animated ? { strokeDashoffset } : {}}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            r={normalizedRadius}
            cx={20}
            cy={20}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '20px 20px' }}
          />
        </svg>
        <span className={`text-xs font-bold ${colors.primary} z-10`}>
          {value.replace(/[^0-9.]/g, '').slice(0, 2)}
        </span>
      </div>
    )
  }

  const BarMetric = () => (
    <div className={`relative w-16 h-8 ${colors.bg} ${colors.border} border rounded overflow-hidden`}>
      <motion.div
        className="h-full"
        style={{ background: `linear-gradient(90deg, ${colors.fill}, ${colors.stroke})` }}
        initial={animated ? { width: 0 } : { width: `${percentage}%` }}
        animate={animated ? { width: `${percentage}%` } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
      <div className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${colors.primary}`}>
        {value.slice(0, 3)}
      </div>
    </div>
  )

  const PolygonMetric = () => (
    <div className={`relative w-16 h-16 ${colors.bg} ${colors.border} border rounded flex items-center justify-center`}>
      <svg width="40" height="40" viewBox="0 0 40 40">
        <motion.polygon
          points="20,4 32,16 28,28 12,28 8,16"
          fill={colors.stroke}
          fillOpacity="0.2"
          stroke={colors.fill}
          strokeWidth="2"
          initial={animated ? { scale: 0 } : { scale: 1 }}
          animate={animated ? { scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        />
      </svg>
      <span className={`absolute text-xs font-bold ${colors.primary}`}>
        {value.slice(0, 2)}
      </span>
    </div>
  )

  const renderMetric = () => {
    switch (variant) {
      case 'radial': return <RadialMetric />
      case 'bar': return <BarMetric />
      case 'polygon': return <PolygonMetric />
      default: return <RadialMetric />
    }
  }

  return (
    <motion.div
      variants={animated ? containerVariants : {}}
      initial={animated ? "hidden" : false}
      animate={animated ? "visible" : false}
      className={`flex flex-col items-center space-y-2 ${className}`}
    >
      {renderMetric()}
      <div className="text-center">
        <div className={`text-lg font-bold ${colors.primary}`}>{value}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </motion.div>
  )
}

export default GeometricMetric