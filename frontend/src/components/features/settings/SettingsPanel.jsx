import { colors, spacing, radius, typography } from '../../../config/theme';
import { REVIEW_TYPES } from '../../../data/constants';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Button from '../../ui/Button';

/**
 * SettingsPanel Component - Configuration form in sidebar
 */
export const SettingsPanel = ({ 
  filename,
  reviewType,
  setFilename,
  setReviewType,
  onSubmit,
  onLoadSample,
  onFileUpload,
  loading,
  disabled,
}) => {
  const cardStyles = {
    background: colors.bg.secondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    border: `1px solid ${colors.border.default}`,
  };

  const headerStyles = {
    fontSize: typography.fontSize.xs,
    fontWeight: '500',
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: spacing.lg,
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  };

  const linkStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.brand.primary,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    marginTop: spacing.sm,
    textDecoration: 'underline',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
      <div style={cardStyles}>
        <div style={headerStyles}>Configuration</div>
        <div style={formStyles}>
          <Input
            label="Filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="example.js"
          />
          <Select
            label="Review Type"
            value={reviewType}
            onValueChange={setReviewType}
            options={REVIEW_TYPES}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: spacing.sm }}>
          <button style={linkStyles} onClick={onLoadSample} type="button">
            Load sample code
          </button>
          
          <label style={{...linkStyles, cursor: 'pointer'}}>
            Upload file
            <input 
              type="file" 
              style={{ display: 'none' }} 
              onChange={onFileUpload}
              accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css"
            />
          </label>
        </div>
      </div>

      <Button
        icon="✨"
        onClick={onSubmit}
        disabled={disabled || loading}
        fullWidth
      >
        {loading ? 'Analyzing...' : 'Analyze Code'}
      </Button>
    </div>
  );
};

export default SettingsPanel;
