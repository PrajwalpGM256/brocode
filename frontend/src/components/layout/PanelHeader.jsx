import { colors, spacing, typography } from '../../config/theme';

/**
 * PanelHeader Component - Header for main content panels
 */
export const PanelHeader = ({ 
  icon, 
  title, 
  subtitle,
  action,
}) => {
  const headerStyles = {
    padding: `${spacing.lg} ${spacing.xl}`,
    borderBottom: `1px solid ${colors.border.default}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  };

  const titleContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const iconStyles = {
    color: colors.brand.primary,
    fontSize: '16px',
  };

  const titleStyles = {
    fontSize: typography.fontSize.base,
    fontWeight: '500',
    color: colors.text.primary,
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.text.subtle,
  };

  return (
    <header style={headerStyles}>
      <div style={titleContainerStyles}>
        {icon && <span style={iconStyles}>{icon}</span>}
        <span style={titleStyles}>{title}</span>
      </div>
      {subtitle && <div style={subtitleStyles}>{subtitle}</div>}
      {action}
    </header>
  );
};

export default PanelHeader;
