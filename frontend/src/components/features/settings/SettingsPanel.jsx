import { colors, spacing, radius, typography } from '../../../config/theme';
import { REVIEW_TYPES } from '../../../data/constants';
import { Zap, Upload, FileCode } from 'lucide-react';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Button from '../../ui/Button';

/**
 * SettingsPanel Component - Technical Sidebar Form
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
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xl,
    height: '100%',
  };

  const sectionLabelStyles = {
    fontSize: '11px',
    fontWeight: '600',
    color: colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily.mono,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  };

  const actionsRowStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.sm,
    marginTop: spacing.sm,
  };

  // Mini Action Button Style
  const actionBtnStyles = {
    background: colors.bg.tertiary,
    border: `1px solid ${colors.border.default}`,
    borderRadius: radius.md,
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    color: colors.text.secondary,
    fontSize: '11px',
    fontFamily: typography.fontFamily.mono,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    width: '100%',
  };

  return (
    <div style={containerStyles}>
      
      {/* Configuration Section */}
      <div>
        <div style={formStyles}>
          <Input
            label="TARGET_FILENAME"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="src/main.js"
          />
          <Select
            label="ANALYSIS_MODE"
            value={reviewType}
            onValueChange={setReviewType}
            options={REVIEW_TYPES}
          />
        </div>

        {/* Quick Actions */}
        <div style={actionsRowStyles}>
          <button 
            style={actionBtnStyles} 
            onClick={onLoadSample} 
            type="button"
            className="hover:border-primary/50 hover:text-primary"
          >
            <FileCode size={12} />
            LOAD SAMPLE
          </button>
          
          <label 
            style={{
              ...actionBtnStyles, 
              background: '#ccff00', 
              color: '#000', 
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            className="hover:opacity-90"
          >
            <Upload size={12} color="#000" />
            UPLOAD FILE
            <input 
              type="file" 
              style={{ display: 'none' }} 
              onChange={onFileUpload}
              accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css"
            />
          </label>
        </div>

        {/* Primary Action - Now directly below actions */}
        <div style={{ marginTop: spacing.lg }}> 
          <Button
            icon={<Zap size={16} />}
            onClick={onSubmit}
            disabled={disabled || loading}
            fullWidth
            size="lg"
          >
            {loading ? 'INITIALIZING...' : 'RUN_ANALYSIS'}
          </Button>
        </div>
      </div>

      {/* Primary Action - Pushed to bottom of valid area or just spaced out */}

      
      {/* Inline styles for hover effects since we're using heavy inline styles */}
      <style>{`
        button:hover, label:hover {
          border-color: ${colors.border.hover} !important;
          color: ${colors.text.primary} !important;
        }
      `}</style>
    </div>
  );
};

export default SettingsPanel;
