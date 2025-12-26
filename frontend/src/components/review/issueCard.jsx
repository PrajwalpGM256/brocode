import { colors, spacing, radius, typography } from '../../config/theme';
import Badge from '../ui/Badge';
import { ShieldAlert, Shield, Info, Terminal, AlertTriangle } from 'lucide-react';

/**
 * IssueCard Component - Premium Technical Design
 */
export const IssueCard = ({ issue }) => {
  const severity = issue.severity?.toLowerCase() || 'low';
  
  // Severity Configuration with Icons
  const severityConfig = {
    high: { 
      color: colors.severity.high.dot, 
      bg: colors.severity.high.bg,
      border: colors.severity.high.border,
      icon: <ShieldAlert size={18} />
    },
    medium: { 
      color: colors.severity.medium.dot, 
      bg: colors.severity.medium.bg,
      border: colors.severity.medium.border,
      icon: <AlertTriangle size={18} />
    },
    low: { 
      color: colors.severity.low.dot, 
      bg: colors.severity.low.bg,
      border: colors.severity.low.border,
      icon: <Info size={18} />
    }
  };

  const config = severityConfig[severity] || severityConfig.low;

  const cardStyles = {
    background: colors.bg.tertiary, // Solid dark background
    border: `1px solid ${colors.border.default}`,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    position: 'relative',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  // Colored top border line for quick scanning
  const topBorderStyles = {
    height: '2px',
    width: '100%',
    background: config.color,
    opacity: 0.8,
  };

  const contentStyles = {
    padding: spacing.lg,
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.sm,
  };

  const iconStyles = {
    color: config.color,
    background: config.bg,
    padding: '8px',
    borderRadius: radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: `1px solid ${config.border}`,
  };

  const titleStyles = {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.text.primary,
    lineHeight: '1.4',
    marginBottom: '2px',
  };

  const metaStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
    fontFamily: typography.fontFamily.mono,
  };

  const descStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: '1.6',
    marginBottom: spacing.md,
    paddingLeft: '50px', // Align with text start (icon width + gap)
  };

  const codeParams = {
      padding: spacing.md,
      background: '#050505', // Deep black for code
      borderRadius: radius.md,
      fontFamily: typography.fontFamily.mono,
      fontSize: typography.fontSize.sm,
      border: `1px solid ${colors.border.default}`,
      overflowX: 'auto',
      color: colors.text.primary,
      marginLeft: '50px', // Indent to match text
      position: 'relative',
  }

  return (
    <div style={cardStyles} className="group">
      <div style={topBorderStyles} />
      
      <div style={contentStyles}>
        {/* Header Section */}
        <div style={headerStyles}>
          <div style={iconStyles}>
            {config.icon}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={titleStyles}>{issue.title}</h3>
            <div style={metaStyles}>
               <span style={{ color: config.color, fontWeight: '500' }}>{severity.toUpperCase()}</span>
               <span>•</span>
               <span>Rule: {issue.rule_id || 'Generic'}</span>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p style={descStyles}>{issue.description}</p>
        
        {/* Code Snippet */}
        {issue.code_snippet && (
            <div style={codeParams}>
               <div style={{ 
                  position: 'absolute', 
                  top: '8px', 
                  right: '8px', 
                  opacity: 0.3 
                }}>
                 <Terminal size={14} />
               </div>
               <pre style={{margin: 0}}><code>{issue.code_snippet}</code></pre>
            </div>
        )}
      </div>
      
      {/* Interactive hover effect styles */}
      <style>{`
        .group:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          border-color: ${colors.border.hover};
        }
      `}</style>
    </div>
  );
};

export default IssueCard;