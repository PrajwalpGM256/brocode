import { colors, spacing, borderRadius, shadows } from '../../config/theme';

/**
 * CodeEditor Component
 * Textarea for code input with syntax-friendly styling
 */
const CodeEditor = ({ 
  value, 
  onChange, 
  placeholder = 'Paste your code here...', 
}) => {
  const lineCount = value ? value.split('\n').length : 0;
  const charCount = value ? value.length : 0;

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    background: colors.background.secondary,
    borderRadius: borderRadius.lg,
    border: `1px solid ${colors.border.default}`,
    overflow: 'hidden',
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing.md} ${spacing.lg}`,
    background: colors.background.tertiary,
    borderBottom: `1px solid ${colors.border.default}`,
    height: '48px',
    flexShrink: 0,
  };

  const titleStyles = {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: colors.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    margin: 0,
  };

  const statsStyles = {
    fontSize: '0.75rem',
    color: colors.text.muted,
  };

  const textareaStyles = {
    flex: 1,
    width: '100%',
    padding: spacing.lg,
    background: 'transparent',
    border: 'none',
    color: colors.text.primary,
    fontSize: '0.875rem',
    fontFamily: "'Fira Code', 'Courier New', monospace",
    lineHeight: '1.6',
    resize: 'none',
    outline: 'none',
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h2 style={titleStyles}>
          <span>💻</span> Code Editor
        </h2>
        <span style={statsStyles}>
          {lineCount} lines • {charCount} characters
        </span>
      </div>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={textareaStyles}
        spellCheck={false}
      />
    </div>
  );
};

export default CodeEditor;