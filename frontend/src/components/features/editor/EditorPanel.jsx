import { useMemo } from 'react';
import Loading from '../../ui/Loading';
import { colors, spacing, typography } from '../../../config/theme';

const EditorPanel = ({ code, setCode, loading }) => {
  const stats = useMemo(() => ({
    lines: code.split('\n').length,
    chars: code.length
  }), [code]);

  const containerStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#1e1e1e', // Darker editor specific background
    position: 'relative',
    overflow: 'hidden',
  };

  const headerStyles = {
    flexShrink: 0,
    height: '40px',
    background: '#252526',
    borderBottom: '1px solid #333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${spacing.lg}`,
    userSelect: 'none',
  };

  const titleStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  };

  const labelStyles = {
    fontSize: typography.fontSize.xs,
    fontWeight: '500',
    color: '#858585',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const statsStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    fontSize: '10px',
    color: '#666',
    fontFamily: typography.fontFamily.mono,
  };

  return (
    <div style={containerStyles}>
      {loading && <Loading message="Analyzing your code..." />}
      
      <div style={headerStyles}>
        <div style={titleStyles}>
          <span style={{ fontSize: '16px' }}>💻</span>
          <span style={labelStyles}>Editor</span>
        </div>
        <div style={statsStyles}>
          <span>{stats.lines} lines</span>
          <span>{stats.chars} chars</span>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste your code here..."
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            padding: spacing.lg,
            background: 'transparent',
            color: '#d4d4d4',
            fontFamily: typography.fontFamily.mono,
            fontSize: '13px',
            lineHeight: '1.5',
            resize: 'none',
            outline: 'none',
            border: 'none',
          }}
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
};

export default EditorPanel;
