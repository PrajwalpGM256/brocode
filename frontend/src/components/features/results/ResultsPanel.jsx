import { colors, spacing, radius, typography } from '../../../config/theme';
import IssueCard from '../../review/IssueCard';
import Badge from '../../ui/Badge';
import EmptyState from '../../ui/EmptyState';

const ResultsPanel = ({ result, loading }) => {
  const containerStyles = {
    height: '100%',
    overflowY: 'auto',
    padding: spacing.xl,
    background: colors.bg.secondary,
  };

  const sectionStyles = {
    marginBottom: spacing['2xl'],
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottom: `1px solid ${colors.border.default}`,
  };

  const titleStyles = {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    color: colors.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const summaryCardStyles = {
    background: colors.bg.tertiary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    border: `1px solid ${colors.border.default}`,
    marginBottom: spacing.xl,
  };

  const summaryTitleStyles = {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.brand.primary,
    marginBottom: spacing.sm,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
  };

  if (loading) {
     return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <EmptyState icon="⏳" title="Analyzing..." message="This might take a few seconds" />
        </div>
     );
  }

  if (!result) {
    return (
       <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <EmptyState icon="🎯" title="Ready to Review" message="Run a review to see results here" />
      </div>
    );
  }

  return (
    <div style={containerStyles} className="custom-scrollbar">
      <div style={headerStyles}>
        <h2 style={titleStyles}>
          <span>📊</span> Review Results
        </h2>
        <div style={{ display: 'flex', gap: spacing.sm }}>
             <Badge variant="secondary">{result.metadata?.model}</Badge>
             <Badge variant="secondary">{result.metadata?.review_type}</Badge>
        </div>
      </div>

      <div style={summaryCardStyles}>
        <h3 style={summaryTitleStyles}>📝 Executive Summary</h3>
        <p style={{ color: colors.text.secondary, lineHeight: '1.6' }}>
          {result.summary}
        </p>
      </div>

      {/* Positive Aspects */}
      {result.positive_aspects?.length > 0 && (
         <div style={sectionStyles}>
            <h3 style={{ ...summaryTitleStyles, color: colors.status.success }}>✨ What's Good</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
               {result.positive_aspects.map((aspect, i) => (
                  <li key={i} style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.sm, color: colors.text.secondary }}>
                      <span style={{ color: colors.status.success }}>✓</span>
                      {aspect}
                  </li>
               ))}
            </ul>
         </div>
      )}

      {/* Issues */}
      <div style={sectionStyles}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing.md }}>
             <h3 style={{ ...summaryTitleStyles, color: colors.text.primary }}>🔍 Issues Found</h3>
             <Badge variant={result.issues?.length > 0 ? 'destructive' : 'secondary'}>
                {result.issues?.length || 0} Issues
             </Badge>
         </div>
         
         {result.issues?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                {result.issues.map((issue, i) => (
                    <IssueCard key={i} issue={issue} />
                ))}
            </div>
         ) : (
            <div style={{ ...summaryCardStyles, textAlign: 'center', background: 'rgba(34,197,94,0.05)', borderColor: 'rgba(34,197,94,0.2)' }}>
                <div style={{ fontSize: '32px', marginBottom: spacing.sm }}>🎉</div>
                <h3 style={{ color: colors.status.success, fontWeight: '600', marginBottom: spacing.xs }}>Clean Code!</h3>
                <p style={{ color: colors.text.secondary }}>No issues found.</p>
            </div>
         )}
      </div>

    </div>
  );
};

export default ResultsPanel;
