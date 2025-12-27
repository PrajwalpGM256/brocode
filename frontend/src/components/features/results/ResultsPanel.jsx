import { colors, spacing, radius, typography } from '../../../config/theme';
import { BarChart, FileText, Sparkles, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import IssueCard from '../../review/issueCard';
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
    background: '#649b92', // Teal Green
    backdropFilter: 'blur(10px)',
    borderRadius: radius.lg,
    padding: spacing.lg,
    border: 'none',
    marginBottom: spacing.xl,
    color: '#1a1c16', // Darker Olive/Black Text
  };

  const summaryTitleStyles = {
    fontSize: typography.fontSize.md,
    fontWeight: '700',
    color: '#1a1c16', 
    marginBottom: spacing.sm,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  if (!result) {
    return (
       <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <EmptyState icon={<Search size={48} />} title="Ready to Review" message="Run a review to see results here" />
      </div>
    );
  }
  // Otherwise render results (even if loading new ones)

  return (
    <div style={containerStyles} className="custom-scrollbar">
      <div style={headerStyles}>
        <h2 style={titleStyles}>
          <BarChart className="text-primary" size={24} /> Review Results
        </h2>
        <div style={{ display: 'flex', gap: spacing.sm }}>
             <Badge variant="secondary">{result.metadata?.model}</Badge>
             <Badge variant="secondary">{result.metadata?.review_type}</Badge>
        </div>
      </div>

      <div style={summaryCardStyles}>
        <h3 style={summaryTitleStyles}><FileText size={18} color="#1a1c16" /> EXECUTIVE SUMMARY</h3>
        <p style={{ color: '#1a1c16', lineHeight: '1.6', fontWeight: '500' }}>
          {result.summary}
        </p>
      </div>

      {/* Positive Aspects */}
      {result.positive_aspects?.length > 0 && (
         <div style={summaryCardStyles}>
            <h3 style={summaryTitleStyles}><Sparkles size={18} color="#1a1c16" /> WHAT'S GOOD</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
               {result.positive_aspects.map((aspect, i) => (
                  <li key={i} style={{ display: 'flex', gap: spacing.sm, marginBottom: spacing.sm, color: '#1a1c16', fontWeight: '500' }}>
                      <CheckCircle size={16} color="#1a1c16" style={{ flexShrink: 0, marginTop: '2px' }} />
                      {aspect}
                  </li>
               ))}
            </ul>
         </div>
      )}

      {/* Issues */}
      <div style={sectionStyles}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing.md }}>
             <h3 style={{ ...summaryTitleStyles, color: colors.text.primary }}><AlertTriangle size={18} /> Issues Found</h3>
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
            <div style={{ ...summaryCardStyles, textAlign: 'center', background: colors.severity.low.bg, borderColor: colors.severity.low.border }}>
                <div style={{ marginBottom: spacing.sm, display: 'flex', justifyContent: 'center' }}>
                  <CheckCircle size={48} color={colors.status.success} />
                </div>
                <h3 style={{ color: colors.status.success, fontWeight: '600', marginBottom: spacing.xs }}>Clean Code!</h3>
                <p style={{ color: colors.text.secondary }}>No issues found.</p>
            </div>
         )}
      </div>

    </div>
  );
};

export default ResultsPanel;
