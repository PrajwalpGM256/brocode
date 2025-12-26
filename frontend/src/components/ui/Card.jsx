import { colors, radius, typography } from '../../config/theme';

export const Card = ({ children, className }) => {
  const cardStyles = {
    background: colors.bg.secondary,
    border: `1px solid ${colors.border.default}`,
    borderRadius: radius.lg,
    overflow: 'hidden',
  };

  return <div style={cardStyles} className={className}>{children}</div>;
};

export const CardHeader = ({ children, className }) => {
  const headerStyles = {
    padding: '16px',
    borderBottom: `1px solid ${colors.border.default}`,
  };

  return <div style={headerStyles} className={className}>{children}</div>;
};

export const CardTitle = ({ children, className }) => {
  const titleStyles = {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
  };

  return <h3 style={titleStyles} className={className}>{children}</h3>;
};

export const CardContent = ({ children, className }) => {
  const contentStyles = {
    padding: '16px',
  };

  return <div style={contentStyles} className={className}>{children}</div>;
};
