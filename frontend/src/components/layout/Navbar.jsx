import { colors, spacing, radius, typography } from '../../config/theme';
import { APP_INFO } from '../../data/app.data';
import { Code2, Upload, Play, FileCode, ChevronLeft, Menu } from 'lucide-react';
import Button from '../ui/Button';

/**
 * Navbar Component - Slim, Transparent, Collapsible with Left Toggle
 */
export const Navbar = ({ 
  filename,
  setFilename,
  onFileUpload,
  onLoadSample,
  onSubmit, 
  loading,
  isCollapsed,
  onToggleCollapse
}) => {
  // Navbar Container
  // When collapsed, it shrinks to width of button (approx 48px)
  const navbarStyles = {
    height: '48px',
    width: isCollapsed ? '48px' : '100%', 
    background: isCollapsed ? 'transparent' : 'rgba(9, 9, 11, 0.7)',
    backdropFilter: isCollapsed ? 'none' : 'blur(8px)',
    borderBottom: isCollapsed ? 'none' : `1px solid ${colors.border.default}`,
    display: 'flex',
    alignItems: 'center',
    padding: 0, 
    flexShrink: 0,
    zIndex: 50,
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    overflow: 'hidden',
    position: 'absolute', // Floating over content
    top: 0,
    left: 0,
  };

  // Toggle Button Styles - Always visible on Left
  const toggleBtnStyles = {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: colors.text.muted,
    background: isCollapsed ? 'rgba(9, 9, 11, 0.7)' : 'transparent', 
    backdropFilter: isCollapsed ? 'blur(8px)' : 'none',
    borderBottom: isCollapsed ? `1px solid ${colors.border.default}` : 'none',
    borderRight: isCollapsed ? `1px solid ${colors.border.default}` : 'none',
    borderBottomRightRadius: isCollapsed ? radius.md : 0,
    flexShrink: 0,
    zIndex: 60,
    transition: 'all 0.3s ease',
  };

  // Content Container - Hides when collapsed
  const contentStyles = {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    opacity: isCollapsed ? 0 : 1,
    pointerEvents: isCollapsed ? 'none' : 'auto',
    transform: isCollapsed ? 'translateX(-20px)' : 'translateX(0)',
    transition: 'all 0.3s ease',
    paddingRight: spacing.lg,
    gap: spacing.lg,
    whiteSpace: 'nowrap', 
  };

  // Brand Section
  const brandStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    color: '#fff',
    fontWeight: '700',
    fontSize: '13px',
    letterSpacing: '-0.3px',
    marginRight: spacing.sm,
  };

  // Input Field Style
  const inputStyles = {
    background: 'rgba(24, 24, 27, 0.5)',
    border: `1px solid ${colors.border.default}`,
    borderRadius: radius.sm,
    padding: '4px 8px',
    color: colors.text.primary,
    fontSize: '12px',
    fontFamily: typography.fontFamily.mono,
    width: '160px',
    outline: 'none',
    height: '24px',
  };

  // Action Button Style
  const actionBtnStyles = {
    background: colors.bg.tertiary,
    border: `1px solid ${colors.border.default}`,
    borderRadius: radius.sm,
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: colors.text.secondary,
    fontSize: '11px',
    fontFamily: typography.fontFamily.mono,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    height: '24px',
  };

  return (
    <div style={{ position: 'relative', zIndex: 50 }}>
        <nav style={navbarStyles}>
            
            {/* Toggle Button (Left Extreme) */}
            <div 
                style={toggleBtnStyles}
                onClick={onToggleCollapse}
                className="hover:text-primary"
                title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
            >
                {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </div>

            {/* Main Content */}
            <div style={contentStyles}>
                {/* 1. Filename Input & Upload */}
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm }}>
                    <input 
                        style={inputStyles}
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        placeholder="filename.js"
                    />
                    
                    <label style={{
                        ...actionBtnStyles, 
                        background: '#ccff00', 
                        color: '#000', 
                        border: 'none', 
                        fontWeight: '700'
                    }} className="hover:opacity-90">
                        <Upload size={12} color="#000" /> UPLOAD
                        <input 
                            type="file" 
                            style={{ display: 'none' }} 
                            onChange={onFileUpload}
                        />
                    </label>
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '16px', background: colors.border.default, margin: `0 ${spacing.sm}` }} />

                {/* 2. Actions Group */}
                <div style={{ display: 'flex', gap: spacing.sm }}>
                    <button 
                        style={actionBtnStyles} 
                        onClick={onLoadSample}
                        title="Load Sample Code"
                        className="hover:border-primary/50 hover:text-primary"
                    >
                        <FileCode size={12} /> SAMPLE
                    </button>
                    


                    <Button
                        icon={<Play size={14} fill="currentColor" />}
                        onClick={onSubmit}
                        disabled={loading}
                        size="sm"
                        style={{ height: '24px', fontSize: '11px', padding: '0 12px' }}
                    >
                        {loading ? 'ANALYZING...' : 'RUN_ANALYSIS'}
                    </Button>
                </div>

                {/* Spacer to push Brand to right */}
                <div style={{ flex: 1 }} />

                {/* 3. Brand Identity (Moved to Right) */}
                <div style={brandStyles}>
                    <div style={{
                        width: '24px', 
                        height: '24px', 
                        background: colors.brand.primary, 
                        borderRadius: radius.sm,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        
                    }}>
                        <Code2 size={14} color="#fff" />
                    </div>
                    {APP_INFO.name}
                </div>
            </div>
        </nav>
        
        <style>{`
             .hover\\:text-primary:hover {
                 color: ${colors.brand.primary} !important;
             }
        `}</style>
    </div>
  );
};

export default Navbar;
