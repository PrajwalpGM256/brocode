import { colors, spacing, shadows } from '../../config/theme';

/**
 * Header Component
 * Application header with logo and title
 */
const Header = () => {
  const headerStyles = {
    textAlign: 'center',
    marginBottom: spacing['3xl'],
    padding: `${spacing['2xl']} 0`,
  };

  const logoContainerStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '5rem',
    height: '5rem',
    background: `linear-gradient(135deg, ${colors.brand.primary}, ${colors.brand.secondary})`,
    borderRadius: '1.5rem',
    marginBottom: spacing.lg,
    boxShadow: shadows.glow.primary,
  };

  const logoStyles = {
    fontSize: '2.5rem',
  };

  const titleStyles = {
    fontSize: '4rem',
    fontWeight: '700',
    background: `linear-gradient(135deg, ${colors.brand.primary}, ${colors.brand.secondary})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: spacing.md,
  };

  const subtitleStyles = {
    fontSize: '1.25rem',
    color: colors.text.secondary,
    fontWeight: '500',
    marginBottom: spacing.sm,
  };

  const metaStyles = {
    fontSize: '0.875rem',
    color: colors.text.tertiary,
  };

  return (
    <header style={headerStyles}>
      <div style={logoContainerStyles}>
        <span style={logoStyles}>🤖</span>
      </div>
      <h1 style={titleStyles}>CodeBro</h1>
      <p style={subtitleStyles}>Your AI-Powered Code Review Assistant</p>
      <p style={metaStyles}>Powered by Google Gemini 2.5 Flash</p>
    </header>
  );
};

export default Header;