import { colors } from '../../config/theme';

/**
 * SplitLayout Component
 * Two-column layout for code editor and results
 */
const SplitLayout = ({ leftContent, rightContent }) => {
  const containerStyles = {
    display: 'flex',
    gap: '0.75rem',
    height: '100vh',
    padding: '0.75rem',
    overflow: 'hidden',
    width: '100%',
    boxSizing: 'border-box',
  };

  const columnStyles = {
    flex: 1,
    minWidth: 0,
    overflow: 'auto',
    background: colors.background.secondary,
    borderRadius: '1rem',
    border: `1px solid ${colors.border.default}`,
    position: 'relative',
    boxSizing: 'border-box',
  };

  // Custom scrollbar styles
  const scrollbarStyles = `
    .split-column::-webkit-scrollbar {
      width: 8px;
    }
    .split-column::-webkit-scrollbar-track {
      background: ${colors.background.primary};
      border-radius: 4px;
    }
    .split-column::-webkit-scrollbar-thumb {
      background: ${colors.border.default};
      border-radius: 4px;
    }
    .split-column::-webkit-scrollbar-thumb:hover {
      background: ${colors.border.hover};
    }
  `;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div style={containerStyles}>
        <div style={columnStyles} className="split-column">
          {leftContent}
        </div>
        <div style={columnStyles} className="split-column">
          {rightContent}
        </div>
      </div>
    </>
  );
};

export default SplitLayout;