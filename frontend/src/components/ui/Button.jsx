import { colors, radius, typography } from '../../config/theme';

/**
 * Button Component - Primary action button with gradient
 */
const variants = {
  primary: {
    background: colors.brand.primary, // Solid brand color (Teal)
    color: 'white',
    boxShadow: `0 0 20px ${colors.brand.glow}`,
  },
  secondary: {
    background: colors.bg.tertiary,
    color: colors.text.secondary,
    border: `1px solid ${colors.border.default}`,
  },
  ghost: {
    background: 'transparent',
    color: colors.text.secondary,
  },
};

const sizes = {
  sm: { padding: '8px 12px', fontSize: typography.fontSize.sm },
  md: { padding: '12px 16px', fontSize: typography.fontSize.base },
  lg: { padding: '14px 20px', fontSize: typography.fontSize.md },
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  disabled = false,
  fullWidth = false,
  onClick,
  style,
  ...props 
}) => {
  const variantStyles = variants[variant];
  const sizeStyles = sizes[size];

  const buttonStyles = {
    ...variantStyles,
    ...sizeStyles,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    border: variantStyles.border || 'none',
    borderRadius: radius.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.2s ease',
    ...style,
  };

  // Add text animation class if it's the primary variant
  return (
    <button 
      style={buttonStyles} 
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;
