import { colors, spacing, typography, radius } from '../../config/theme';
import { APP_INFO } from '../../data/app.data';

/**
 * Sidebar Component - Left navigation panel
 */
export const Sidebar = ({ children }) => {
  const sidebarStyles = {
    width: '260px',
    minWidth: '260px',
    height: '100vh',
    borderRight: `1px solid ${colors.border.default}`,
    padding: `${spacing.xl} ${spacing.lg}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing['2xl'],
    background: colors.bg.primary,
    boxSizing: 'border-box',
  };

  return (
    <aside style={sidebarStyles}>
      <SidebarHeader />
      {children}
      <SidebarFooter />
    </aside>
  );
};

/**
 * Sidebar Header with Logo
 */
const SidebarHeader = () => {
  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '4px 0',
  };

  const logoStyles = {
    width: '28px',
    height: '28px',
    borderRadius: radius.md,
    background: colors.brand.gradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  };

  const versionStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.text.subtle,
    marginLeft: 'auto',
    background: colors.bg.tertiary,
    padding: '2px 6px',
    borderRadius: radius.sm,
  };

  return (
    <div style={headerStyles}>
      <div style={logoStyles}>⚡</div>
      <span style={{ fontSize: typography.fontSize.lg, fontWeight: '600', letterSpacing: '-0.3px' }}>
        {APP_INFO.name}
      </span>
      <span style={versionStyles}>{APP_INFO.version}</span>
    </div>
  );
};

/**
 * Sidebar Footer
 */
const SidebarFooter = () => {
  const footerStyles = {
    marginTop: 'auto',
    fontSize: typography.fontSize.xs,
    color: colors.text.disabled,
    textAlign: 'center',
  };

  return (
    <div style={footerStyles}>
      Powered by {APP_INFO.poweredBy}
    </div>
  );
};

export default Sidebar;