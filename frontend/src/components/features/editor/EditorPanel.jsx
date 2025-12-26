import { useMemo } from 'react';
import Loading from '../../ui/Loading';
import { colors, spacing, typography } from '../../../config/theme';
import { APP_INFO } from '../../../data/app.data';

const EditorPanel = ({ code, setCode, loading }) => {
  const stats = useMemo(() => ({
    lines: code.split('\n').length,
    chars: code.length
  }), [code]);

  const containerStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'transparent', // Transparent background
    position: 'relative',
    overflow: 'hidden',
  };

  const headerStyles = {
    flexShrink: 0,
    height: '40px',
    background: 'rgba(37, 37, 38, 0.5)', // Semi-transparent header
    borderBottom: '1px solid #333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${spacing.lg}`,
    userSelect: 'none',
    position: 'relative',
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

  // Watermark styles
  const watermarkStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '33px',
    fontWeight: '800',
    color: 'rgba(35, 59, 65, 0.18)', // Teal brand color at 15% opacity
    textTransform: 'uppercase',
    letterSpacing: '6px',
    pointerEvents: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    zIndex: 0,
  };

  return (
    <div style={containerStyles}>
      {loading && <Loading message="Analyzing your code..." />}
      
      <div style={headerStyles}>
        {/* Centered Title */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: spacing.sm,
        }}>
          <span style={{ fontSize: '16px' }}>💻</span>
          <span style={labelStyles}>Editor</span>
        </div>
        
        {/* Spacer to push stats to right */}
        <div style={{ flex: 1 }} />
        
        <div style={statsStyles}>
          <span>{stats.lines} lines</span>
          <span>{stats.chars} chars</span>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        {/* Watermark */}
        <div style={watermarkStyles}>
          {APP_INFO.SLOGAN}
        </div>
        
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
            color: '#ffffff', // Bright white text
            fontFamily: typography.fontFamily.mono,
            fontSize: '13px',
            lineHeight: '1.5',
            resize: 'none',
            outline: 'none',
            border: 'none',
            zIndex: 1,
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

