import { colors, radius, typography } from '../../config/theme';

/**
 * Badge Component
 */
const Badge = ({ 
  children, 
  variant = 'secondary', 
  size = 'md',
  className 
}) => {
  const variants = {
    primary: {
      background: colors.brand.glow,
      color: colors.brand.primary,
      border: `1px solid ${colors.brand.primary}`,
    },
    secondary: {
      background: colors.bg.tertiary,
      color: colors.text.secondary,
      border: `1px solid ${colors.border.default}`,
    },
    outline: {
      background: 'transparent',
      color: colors.text.muted,
      border: `1px solid ${colors.border.default}`,
    },
    destructive: {
      background: colors.severity.high.bg,
      color: colors.severity.high.dot,
      border: `1px solid ${colors.severity.high.border}`,
    },
    // Add semantic variants mapping to severity/status
    high: {
      background: colors.severity.high.bg,
      color: colors.severity.high.dot,
      border: `1px solid ${colors.severity.high.border}`,
    },
    medium: {
      background: colors.severity.medium.bg,
      color: colors.severity.medium.dot,
      border: `1px solid ${colors.severity.medium.border}`,
    },
    low: {
      background: colors.severity.low.bg,
      color: colors.severity.low.dot,
      border: `1px solid ${colors.severity.low.border}`,
    },
  };

  const sizes = {
    sm: { padding: '2px 8px', fontSize: typography.fontSize.xs },
    md: { padding: '4px 10px', fontSize: typography.fontSize.sm },
  };

  const badgeStyles = {
    ...variants[variant] || variants.secondary,
    ...sizes[size],
    borderRadius: radius.full,
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    whiteSpace: 'nowrap',
    width: 'fit-content',
  };

  return (
    <span style={badgeStyles} className={className}>
      {children}
    </span>
  );
};

export default Badge;