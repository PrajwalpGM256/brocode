/**
 * Design System - Linear/Vercel Inspired
 * Single source of truth for all design tokens
 */

export const colors = {
  // Backgrounds - True blacks with subtle warmth
  bg: {
    primary: '#0a0a0b',
    secondary: 'rgba(255,255,255,0.02)',
    tertiary: 'rgba(255,255,255,0.04)',
    elevated: 'rgba(255,255,255,0.06)',
  },

  // Text - Zinc scale for better contrast
  text: {
    primary: '#fafafa',
    secondary: '#a1a1aa',
    muted: '#71717a',
    subtle: '#52525b',
    disabled: '#3f3f46',
  },

  // Borders - Subtle and elegant
  border: {
    default: 'rgba(255,255,255,0.06)',
    hover: 'rgba(255,255,255,0.1)',
    focus: 'rgba(99,102,241,0.5)',
  },

  // Brand - Indigo/Violet gradient
  brand: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    glow: 'rgba(99,102,241,0.3)',
  },

  // Semantic - For status and feedback
  status: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Severity - For issue cards
  severity: {
    high: { dot: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' },
    medium: { dot: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
    low: { dot: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
  },
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
};

export const radius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
};

export const typography = {
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
  },
  fontSize: {
    xs: '11px',
    sm: '12px',
    base: '13px',
    md: '14px',
    lg: '15px',
    xl: '20px',
  },
};

export const shadows = {
  glow: '0 0 20px rgba(99,102,241,0.3)',
  card: '0 4px 12px rgba(0,0,0,0.3)',
};