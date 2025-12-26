import { spacing } from '../../config/theme';

const Container = ({ 
  children, 
  maxWidth = '1200px',
  padding = true,
  className = '',
}) => {
  const containerStyles = {
    width: '100%',
    maxWidth,
    margin: '0 auto',
    padding: padding ? `${spacing.xl} ${spacing.md}` : '0',
  };

  return (
    <div style={containerStyles} className={className}>
      {children}
    </div>
  );
};

export default Container;