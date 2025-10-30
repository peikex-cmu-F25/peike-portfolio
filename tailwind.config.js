/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary color palette from logo - clean blue gradient
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Logo blue - primary brand color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Clean neutrals for text and backgrounds
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Secondary purple from logo gradient
        accent: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Logo purple - secondary brand color
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        // Minimal emerald accent from logo
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Logo emerald - subtle accent
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'heading': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'body': ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'SF Mono', 'Monaco', 'Cascadia Code', 'Consolas', 'monospace'],
        'code': ['Fira Code', 'JetBrains Mono', 'SF Mono', 'monospace'],
        'handwritten': ['Caveat', 'cursive'],
        'mathematical': ['Computer Modern', 'Latin Modern', 'Times', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-subtle': 'bounceSubtle 3s ease-in-out infinite',
        'wiggle': 'wiggle 0.6s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'tilt': 'tilt 0.3s ease-out',
        'typewriter': 'typewriter 2s steps(20) infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'float-delay': 'float 4s ease-in-out infinite 1s',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'geometric-rotate': 'geometricRotate 8s linear infinite',
        'mathematical-pulse': 'mathematicalPulse 3s ease-in-out infinite',
        'parametric-flow': 'parametricFlow 6s ease-in-out infinite',
        'neural-glow': 'neuralGlow 4s ease-in-out infinite alternate',
        'fractal-zoom': 'fractalZoom 10s ease-in-out infinite',
        'voronoi-shift': 'voronoiShift 7s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(234, 88, 12, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(234, 88, 12, 0.6)' },
        },
        tilt: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(2deg) scale(1.02)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
        typewriter: {
          '0%': { width: '0ch' },
          '50%': { width: '20ch' },
          '100%': { width: '0ch' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        geometricRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        mathematicalPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        parametricFlow: {
          '0%': { transform: 'translateX(-20px) translateY(0px)' },
          '25%': { transform: 'translateX(0px) translateY(-10px)' },
          '50%': { transform: 'translateX(20px) translateY(0px)' },
          '75%': { transform: 'translateX(0px) translateY(10px)' },
          '100%': { transform: 'translateX(-20px) translateY(0px)' },
        },
        neuralGlow: {
          '0%': { boxShadow: '0 0 10px rgba(14, 165, 233, 0.2)', opacity: '0.6' },
          '100%': { boxShadow: '0 0 30px rgba(14, 165, 233, 0.6)', opacity: '1' },
        },
        fractalZoom: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '0.3' },
          '50%': { transform: 'scale(1.1) rotate(180deg)', opacity: '0.7' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '0.3' },
        },
        voronoiShift: {
          '0%': { clipPath: 'polygon(0% 0%, 70% 0%, 100% 50%, 70% 100%, 0% 100%)' },
          '50%': { clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 30% 100%, 0% 50%)' },
          '100%': { clipPath: 'polygon(0% 0%, 70% 0%, 100% 50%, 70% 100%, 0% 100%)' },
        },
      },
    },
  },
  plugins: [],
}