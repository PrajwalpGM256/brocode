import { colors, typography, shadows } from '../../config/theme';

/**
 * Loading Component - Heavy Animation "AI Core"
 */
export const Loading = ({ message = 'INITIALIZING AI CORE...' }) => {
  const overlayStyles = {
    position: 'absolute',
    inset: 0,
    background: colors.bg.overlay,
    backdropFilter: 'blur(8px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    overflow: 'hidden',
  };

  const containerStyles = {
    position: 'relative',
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px',
  };

  const textStyles = {
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.sm,
    color: colors.brand.primary,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontWeight: '600',
    position: 'relative',
    animation: 'pulse-text 2s ease-in-out infinite',
  };

  return (
    <div style={overlayStyles}>
      <style>
        {`
          @keyframes spin-linear { 
            0% { transform: rotate(0deg); } 
            100% { transform: rotate(360deg); } 
          }
          @keyframes spin-reverse { 
            0% { transform: rotate(360deg); } 
            100% { transform: rotate(0deg); } 
          }
          @keyframes pulse-core {
            0%, 100% { transform: scale(0.8); opacity: 0.5; box-shadow: 0 0 20px ${colors.brand.primary}; }
            50% { transform: scale(1.1); opacity: 1; box-shadow: 0 0 40px ${colors.brand.secondary}; }
          }
          @keyframes scan-line {
            0% { top: -20%; opacity: 0; }
            30% { opacity: 1; }
            70% { opacity: 1; }
            100% { top: 120%; opacity: 0; }
          }
          @keyframes pulse-text {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; text-shadow: 0 0 10px ${colors.brand.primary}; }
          }
        `}
      </style>

      <div style={containerStyles}>
        {/* Outer Ring */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: `2px solid ${colors.bg.tertiary}`,
          borderTop: `2px solid ${colors.brand.primary}`,
          borderBottom: `2px solid ${colors.brand.secondary}`,
          borderRadius: '50%',
          animation: 'spin-linear 3s linear infinite',
          boxShadow: shadows.glow,
        }} />

        {/* Middle Ring */}
        <div style={{
          position: 'absolute',
          inset: '10px',
          border: `2px solid ${colors.border.default}`,
          borderLeft: `2px solid ${colors.brand.secondary}`,
          borderRight: `2px solid ${colors.brand.primary}`,
          borderRadius: '50%',
          animation: 'spin-reverse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        }} />

        {/* Inner Core */}
        <div style={{
          width: '40px',
          height: '40px',
          background: `conic-gradient(from 180deg at 50% 50%, ${colors.brand.primary} 0deg, ${colors.brand.secondary} 180deg, ${colors.brand.primary} 360deg)`,
          borderRadius: '50%',
          filter: 'blur(5px)',
          animation: 'pulse-core 2s ease-in-out infinite',
        }} />
        
        <div style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          background: colors.text.primary,
          borderRadius: '50%',
          mixBlendMode: 'overlay',
          animation: 'pulse-core 2s ease-in-out infinite reverse',
        }} />
      </div>

      <div style={textStyles}>
        {message}
        <span style={{ 
          display: 'inline-block', 
          width: '8px', 
          height: '8px', 
          background: colors.brand.primary,
          marginLeft: '8px',
          animation: 'pulse-core 1s infinite'
        }}></span>
      </div>
      
      {/* Background Grid Effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(${colors.bg.elevated} 1px, transparent 1px), linear-gradient(90deg, ${colors.bg.elevated} 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: 0.1,
        zIndex: -1,
        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
        pointerEvents: 'none',
      }} />
    </div>
  );
};

/**
 * Inline Loading Dots (Updated)
 */
export const LoadingDots = () => {
  const containerStyles = {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  };

  const dotStyles = {
    width: '4px',
    height: '16px',
    background: colors.brand.primary,
    borderRadius: '2px',
    animation: 'wave 1s ease-in-out infinite',
  };

  return (
    <div style={containerStyles}>
      <style>
        {`@keyframes wave { 0%, 100% { transform: scaleY(0.4); opacity: 0.5; } 50% { transform: scaleY(1); opacity: 1; } }`}
      </style>
      <div style={{ ...dotStyles, animationDelay: '-0.4s' }} />
      <div style={{ ...dotStyles, animationDelay: '-0.2s', background: colors.brand.secondary }} />
      <div style={{ ...dotStyles, animationDelay: '0s' }} />
    </div>
  );
};

export default Loading;