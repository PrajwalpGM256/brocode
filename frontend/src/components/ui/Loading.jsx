import { colors, typography } from '../../config/theme';

/**
 * Loading Component - Spinner overlay
 */
export const Loading = ({ message = 'Analyzing...' }) => {
  const overlayStyles = {
    position: 'absolute',
    inset: 0,
    background: 'rgba(10,10,11,0.85)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    zIndex: 10,
  };

  const spinnerStyles = {
    width: '40px',
    height: '40px',
    border: `3px solid ${colors.border.default}`,
    borderTopColor: colors.brand.primary,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  const textStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    fontWeight: '500',
  };

  return (
    <div style={overlayStyles}>
      <style>
        {`@keyframes spin { to { transform: rotate(360deg); } }`}
      </style>
      <div style={spinnerStyles} />
      <span style={textStyles}>{message}</span>
    </div>
  );
};

/**
 * Inline Loading Dots
 */
export const LoadingDots = () => {
  const containerStyles = {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  };

  const dotStyles = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: colors.brand.primary,
    animation: 'pulse 1.4s ease-in-out infinite',
  };

  return (
    <div style={containerStyles}>
      <style>
        {`@keyframes pulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }`}
      </style>
      <div style={{ ...dotStyles, animationDelay: '0s' }} />
      <div style={{ ...dotStyles, animationDelay: '0.2s' }} />
      <div style={{ ...dotStyles, animationDelay: '0.4s' }} />
    </div>
  );
};

export default Loading;