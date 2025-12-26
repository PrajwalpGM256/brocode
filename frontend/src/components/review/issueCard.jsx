import { colors, spacing, radius, typography } from '../../config/theme';
import Badge from '../ui/Badge';

/**
 * IssueCard Component - Individual issue display
 */
export const IssueCard = ({ issue }) => {
  const severity = issue.severity?.toLowerCase() || 'low';
  const severityConfig = colors.severity[severity] || colors.severity.low;

  const cardStyles = {
    background: severityConfig.bg,
    border: `1px solid ${colors.border.default}`,
    borderLeft: `3px solid ${severityConfig.dot}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  };

  const titleStyles = {
    fontSize: typography.fontSize.md,
    fontWeight: '500',
    color: colors.text.primary,
  };

  const descStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: '1.6',
  };

  const codeParams = {
      padding: spacing.md,
      background: colors.bg.tertiary,
      borderRadius: radius.md,
      fontFamily: typography.fontFamily.mono,
      fontSize: typography.fontSize.sm,
      border: `1px solid ${colors.border.default}`,
      marginTop: spacing.md,
      overflowX: 'auto',
      color: colors.text.primary
  }

  return (
    <div style={cardStyles}>
      <div style={headerStyles}>
        <Badge variant={severity} size="sm">{issue.severity?.toUpperCase()}</Badge>
        <span style={titleStyles}>{issue.title}</span>
      </div>
      
      <p style={descStyles}>{issue.description}</p>
      
       {issue.code_snippet && (
            <div style={codeParams}>
               <pre style={{margin: 0}}><code>{issue.code_snippet}</code></pre>
            </div>
      )}
    </div>
  );
};

export default IssueCard;