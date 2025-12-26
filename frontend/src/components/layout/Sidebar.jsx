import { colors, spacing, typography, radius } from '../../config/theme';
import { APP_INFO } from '../../data/app.data';
import { Code2, Activity } from 'lucide-react';

/**
 * Sidebar Component - Technical Left Panel
 */
export const Sidebar = ({ children }) => {
  const sidebarStyles = {
    width: '280px',
    minWidth: '280px',
    height: '100vh',
    borderRight: `1px solid ${colors.border.default}`,
    padding: `${spacing.xl} ${spacing.lg}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing['2xl'],
    background: '#09090b', // Deep matte black
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 20
  };

  return (
    <aside style={sidebarStyles}>
      <SidebarHeader />
      {children}
    </aside>
  );
};

/**
 * Sidebar Header - Brand Identity
 */
const SidebarHeader = () => {
  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: '4px 0',
    marginBottom: spacing.md,
  };

  const logoBoxStyles = {
    width: '36px',
    height: '36px',
    borderRadius: radius.md,
    background: colors.brand.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    boxShadow: `0 0 15px ${colors.brand.glow}`,
  };

  const titleStyles = {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    letterSpacing: '-0.5px',
    lineHeight: '1',
    color: '#fff',
  };

  const versionStyles = {
    fontSize: '10px',
    color: colors.text.muted,
    fontFamily: typography.fontFamily.mono,
    marginTop: '2px',
  };

  return (
    <div style={headerStyles}>
      <div style={logoBoxStyles}>
        <Code2 size={20} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={titleStyles}>{APP_INFO.name}</span>
      </div>
    </div>
  );
};



export default Sidebar;