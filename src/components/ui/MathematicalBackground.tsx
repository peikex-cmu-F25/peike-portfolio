import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface MathematicalBackgroundProps {
  className?: string
  variant?: 'fibonacci' | 'golden' | 'wave' | 'mandelbrot' | 'minimal' | 'neural' | 'voronoi' | 'parametric'
  intensity?: 'subtle' | 'ultra-subtle' | 'barely-visible'
  animated?: boolean
}

const MathematicalBackground: React.FC<MathematicalBackgroundProps> = ({ 
  className = "", 
  variant = 'golden',
  intensity = 'subtle',
  animated = true
}) => {
  // Golden ratio spiral points
  const generateGoldenSpiral = () => {
    const points = []
    const phi = (1 + Math.sqrt(5)) / 2 // Golden ratio
    const centerX = 50
    const centerY = 50
    
    for (let i = 0; i < 50; i++) {
      const angle = i * 0.5
      const radius = Math.pow(phi, angle / Math.PI) * 2
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)
      
      if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
        points.push({ x, y, size: Math.max(0.5, 3 - i * 0.05) })
      }
    }
    return points
  }

  // Fibonacci sequence visualization
  const generateFibonacci = () => {
    const fib = [1, 1]
    for (let i = 2; i < 15; i++) {
      fib[i] = fib[i - 1] + fib[i - 2]
    }
    
    return fib.slice(0, 8).map((num, index) => ({
      x: 10 + (index * 11) % 80,
      y: 20 + (num % 5) * 15,
      size: Math.min(8, Math.log(num) * 2),
      value: num
    }))
  }

  // Sine wave pattern
  const generateWave = () => {
    const points = []
    for (let i = 0; i < 100; i += 2) {
      const x = i
      const y = 50 + Math.sin(i * 0.2) * 20
      points.push({ x, y, size: 1.5 })
    }
    return points
  }

  // Simple mandelbrot-inspired pattern  
  const generateMandelbrot = () => {
    const points: Array<{ x: number; y: number; size: number; opacity?: number }> = []
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const cx = (x - 5) * 0.5
        const cy = (y - 5) * 0.5
        const iterations = mandelbrotIteration(cx, cy)
        
        if (iterations < 10) {
          points.push({
            x: x * 10 + 5,
            y: y * 10 + 5,
            size: 2 + iterations * 0.3,
            opacity: 0.1 + iterations * 0.05
          })
        }
      }
    }
    return points
  }

  const mandelbrotIteration = (cx: number, cy: number) => {
    let zx = 0, zy = 0
    let iteration = 0
    
    while (zx * zx + zy * zy < 4 && iteration < 10) {
      const xtemp = zx * zx - zy * zy + cx
      zy = 2 * zx * zy + cy
      zx = xtemp
      iteration++
    }
    
    return iteration
  }

  // Neural network pattern
  const generateNeuralNetwork = () => {
    const nodes = []
    const connections = []
    
    // Generate nodes in layers
    const layers = [3, 5, 4, 2]
    let nodeId = 0
    
    layers.forEach((nodeCount, layerIndex) => {
      const layerX = 20 + (layerIndex * 20)
      const layerStartY = 50 - (nodeCount * 7) / 2
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          id: nodeId++,
          x: layerX,
          y: layerStartY + i * 14,
          layer: layerIndex,
          size: 2.5
        })
      }
    })
    
    // Generate connections between adjacent layers
    layers.forEach((nodeCount, layerIndex) => {
      if (layerIndex < layers.length - 1) {
        const currentLayerStart = layers.slice(0, layerIndex).reduce((sum, count) => sum + count, 0)
        const nextLayerStart = layers.slice(0, layerIndex + 1).reduce((sum, count) => sum + count, 0)
        
        for (let i = 0; i < nodeCount; i++) {
          for (let j = 0; j < layers[layerIndex + 1]; j++) {
            const fromNode = nodes[currentLayerStart + i]
            const toNode = nodes[nextLayerStart + j]
            
            connections.push({
              from: fromNode,
              to: toNode,
              strength: Math.random() * 0.8 + 0.2
            })
          }
        }
      }
    })
    
    return { nodes, connections }
  }

  // Voronoi diagram
  const generateVoronoi = () => {
    const sites = []
    const numSites = 8
    
    for (let i = 0; i < numSites; i++) {
      sites.push({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        color: `hsl(${200 + Math.random() * 60}, 70%, 80%)`
      })
    }
    
    return sites
  }

  // Parametric curves
  const generateParametricCurves = () => {
    const curves = []
    
    // Lissajous curve
    const lissajous = []
    for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
      const x = 50 + 20 * Math.sin(3 * t + Math.PI / 2)
      const y = 50 + 15 * Math.sin(2 * t)
      lissajous.push({ x, y })
    }
    curves.push({ type: 'lissajous', points: lissajous })
    
    // Rose curve
    const rose = []
    for (let t = 0; t <= 8 * Math.PI; t += 0.1) {
      const r = 15 * Math.cos(4 * t)
      const x = 25 + r * Math.cos(t)
      const y = 25 + r * Math.sin(t)
      if (r > 0) rose.push({ x, y })
    }
    curves.push({ type: 'rose', points: rose })
    
    // Cardioid
    const cardioid = []
    for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
      const r = 8 * (1 - Math.cos(t))
      const x = 75 + r * Math.cos(t)
      const y = 75 + r * Math.sin(t)
      cardioid.push({ x, y })
    }
    curves.push({ type: 'cardioid', points: cardioid })
    
    return curves
  }

  const patternData = useMemo(() => {
    switch (variant) {
      case 'fibonacci':
        return { type: 'points', data: generateFibonacci() }
      case 'wave':
        return { type: 'points', data: generateWave() }
      case 'mandelbrot':
        return { type: 'points', data: generateMandelbrot() }
      case 'neural':
        return { type: 'network', data: generateNeuralNetwork() }
      case 'voronoi':
        return { type: 'voronoi', data: generateVoronoi() }
      case 'parametric':
        return { type: 'curves', data: generateParametricCurves() }
      case 'minimal':
        return { 
          type: 'points', 
          data: [
            { x: 85, y: 15, size: 1.5 },
            { x: 20, y: 85, size: 1.2 },
            { x: 75, y: 80, size: 1.0 }
          ]
        }
      default:
        return { type: 'points', data: generateGoldenSpiral() }
    }
  }, [variant])

  // Dynamic opacity based on intensity
  const getOpacity = (base: number) => {
    switch (intensity) {
      case 'ultra-subtle': return base * 0.3
      case 'barely-visible': return base * 0.1
      default: return base
    }
  }
  
  const svgOpacity = intensity === 'barely-visible' ? 'opacity-[0.008]' : 
                     intensity === 'ultra-subtle' ? 'opacity-[0.01]' : 
                     'opacity-[0.015]'
  
  const gridOpacity = intensity === 'barely-visible' ? 'opacity-[0.003]' : 
                      intensity === 'ultra-subtle' ? 'opacity-[0.005]' : 
                      'opacity-[0.008]'

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Subtle text readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01]" />
      
      <svg 
        className={`w-full h-full ${svgOpacity}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="mathGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2"/>
          </radialGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Render patterns based on type */}
        {patternData.type === 'points' && (
          <>
            {/* Golden spiral path */}
            {variant === 'golden' && (
              <motion.path
                d={`M 75 25 ${patternData.data.slice(0, 30).map((p: any) => {
                  const shiftedX = 75 + (p.x - 50) * 0.4
                  const shiftedY = 25 + (p.y - 50) * 0.4
                  return `L ${Math.max(0, Math.min(100, shiftedX))} ${Math.max(0, Math.min(100, shiftedY))}`
                }).join(' ')}`}
                stroke="url(#lineGradient)"
                strokeWidth="0.15"
                fill="none"
                initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: getOpacity(0.8) }}
                animate={{ pathLength: 1, opacity: getOpacity(0.8) }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
            )}

            {/* Wave pattern */}
            {variant === 'wave' && (
              <motion.path
                d={`M ${patternData.data.map((p: any, i: number) => {
                  const adjustedY = 85 + Math.sin(i * 0.3) * 8
                  return `${i === 0 ? 'M' : 'L'} ${p.x} ${adjustedY}`
                }).join(' ')}`}
                stroke="url(#lineGradient)"
                strokeWidth="0.2"
                fill="none"
                initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            )}

            {/* Point elements */}
            {patternData.data.slice(0, Math.floor(patternData.data.length * 0.4)).map((element: any, index: number) => {
              if (element.x < 40 && element.y > 30 && element.y < 70) return null
              
              const baseOpacity = ('opacity' in element ? element.opacity : 0.3) * 0.6
              const opacity = getOpacity(baseOpacity)
              const adjustedSize = element.size * 0.7
              
              return (
                <motion.circle
                  key={`point-${index}`}
                  cx={element.x}
                  cy={element.y}
                  r={adjustedSize}
                  fill="url(#mathGradient)"
                  opacity={opacity}
                  initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity }}
                  animate={{ scale: 1, opacity }}
                  transition={{ 
                    duration: 0.8, 
                    delay: animated ? index * 0.08 : 0,
                    ease: "easeOut"
                  }}
                />
              )
            })}
          </>
        )}

        {/* Neural Network */}
        {patternData.type === 'network' && (
          <>
            {/* Connections */}
            {patternData.data.connections.map((connection: any, index: number) => (
              <motion.line
                key={`connection-${index}`}
                x1={connection.from.x}
                y1={connection.from.y}
                x2={connection.to.x}
                y2={connection.to.y}
                stroke="url(#neuralGradient)"
                strokeWidth={connection.strength * 0.3}
                opacity={getOpacity(connection.strength * 0.5)}
                initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: animated ? index * 0.02 : 0, ease: "easeOut" }}
              />
            ))}
            
            {/* Nodes */}
            {patternData.data.nodes.map((node: any, index: number) => (
              <motion.circle
                key={`node-${index}`}
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill="url(#mathGradient)"
                filter="url(#glow)"
                initial={animated ? { scale: 0 } : { scale: 1 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [getOpacity(0.8), getOpacity(1), getOpacity(0.8)]
                }}
                transition={{ 
                  duration: 2,
                  delay: animated ? node.layer * 0.3 : 0,
                  repeat: animated ? Infinity : 0,
                  repeatDelay: 3
                }}
              />
            ))}
          </>
        )}

        {/* Parametric Curves */}
        {patternData.type === 'curves' && (
          <>
            {patternData.data.map((curve: any, curveIndex: number) => (
              <motion.path
                key={`curve-${curveIndex}`}
                d={`M ${curve.points.map((p: any, i: number) => 
                  `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
                ).join(' ')}`}
                stroke="url(#lineGradient)"
                strokeWidth="0.2"
                fill="none"
                opacity={getOpacity(0.6)}
                initial={animated ? { pathLength: 0 } : { pathLength: 1 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 4,
                  delay: animated ? curveIndex * 0.5 : 0,
                  ease: "easeInOut" 
                }}
              />
            ))}
          </>
        )}

        {/* Voronoi Diagram */}
        {patternData.type === 'voronoi' && (
          <>
            {patternData.data.map((site: any, index: number) => (
              <motion.circle
                key={`voronoi-${index}`}
                cx={site.x}
                cy={site.y}
                r="0.8"
                fill="url(#mathGradient)"
                initial={animated ? { scale: 0 } : { scale: 1 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 3,
                  delay: animated ? index * 0.2 : 0,
                  repeat: animated ? Infinity : 0,
                  repeatDelay: 2
                }}
              />
            ))}
          </>
        )}

        {/* Mathematical symbols */}
        {variant === 'fibonacci' && (
          <motion.text
            x="92"
            y="12"
            fontSize="4"
            fill="#0ea5e9"
            fillOpacity={getOpacity(0.6)}
            fontFamily="serif"
            initial={animated ? { opacity: 0 } : { opacity: getOpacity(0.6) }}
            animate={{ opacity: getOpacity(0.6) }}
            transition={{ delay: 3, duration: 1.5 }}
          >
            φ
          </motion.text>
        )}

        {variant === 'neural' && (
          <motion.text
            x="5"
            y="95"
            fontSize="3"
            fill="#8b5cf6"
            fillOpacity={getOpacity(0.5)}
            fontFamily="monospace"
            initial={animated ? { opacity: 0 } : { opacity: getOpacity(0.5) }}
            animate={{ opacity: getOpacity(0.5) }}
            transition={{ delay: 4, duration: 1.5 }}
          >
            f(x) = ∑ᵢwᵢxᵢ + b
          </motion.text>
        )}

        {variant === 'parametric' && (
          <motion.text
            x="85"
            y="95"
            fontSize="3"
            fill="#10b981"
            fillOpacity={getOpacity(0.5)}
            fontFamily="serif"
            initial={animated ? { opacity: 0 } : { opacity: getOpacity(0.5) }}
            animate={{ opacity: getOpacity(0.5) }}
            transition={{ delay: 5, duration: 1.5 }}
          >
            ∮ ∇ × F · dS
          </motion.text>
        )}
      </svg>

      {/* Ultra-subtle grid pattern - positioned to avoid main content */}
      <div className={`absolute inset-0 ${gridOpacity}`}>
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e5e5 0.5px, transparent 0.5px),
              linear-gradient(to bottom, #e5e5e5 0.5px, transparent 0.5px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 50%, transparent 100%)'
          }}
        />
      </div>
      
      {/* Enhanced geometric accent elements */}
      <div className="absolute top-8 right-8 w-24 h-24 opacity-[0.03]">
        <div className="w-full h-full border border-accent-400 rounded-full animate-mathematical-pulse" 
             style={{ background: 'linear-gradient(45deg, rgba(14, 165, 233, 0.1), rgba(139, 92, 246, 0.1))' }} />
      </div>
      
      <div className="absolute bottom-12 right-16 w-16 h-16 opacity-[0.025] animate-geometric-rotate" 
           style={{ animationDuration: '12s' }}>
        <div className="w-full h-full border border-emerald-400" 
             style={{ 
               clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
               background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(139, 92, 246, 0.1))'
             }} />
      </div>
      
      <div className="absolute top-1/3 left-8 w-20 h-20 opacity-[0.02] animate-parametric-flow">
        <div className="w-full h-full border border-violet-400"
             style={{
               clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
               background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.1), rgba(14, 165, 233, 0.1))'
             }} />
      </div>
    </div>
  )
}

export default MathematicalBackground