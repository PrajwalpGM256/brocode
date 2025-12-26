import { colors, radius, spacing, typography } from '../../config/theme';

/**
 * EmptyState Component
 */
const EmptyState = ({ icon, title, message }) => {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: spacing['3xl'],
    color: colors.text.muted,
  };

  const iconStyles = {
    fontSize: '48px',
    marginBottom: spacing.lg,
    opacity: 0.5,
  };

  const titleStyles = {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  };

  const messageStyles = {
    fontSize: typography.fontSize.sm,
    maxWidth: '300px',
    lineHeight: '1.5',
  };

  return (
    <div style={containerStyles}>
      <div style={iconStyles}>{icon}</div>
      <h3 style={titleStyles}>{title}</h3>
      <p style={messageStyles}>{message}</p>
    </div>
  );
};

export default EmptyState;