import { colors, radius, typography } from '../../config/theme';

/**
 * Input Component
 */
const Input = ({ 
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  ...props 
}) => {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  };

  const labelStyles = {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.secondary,
  };

  const inputStyles = {
    background: colors.bg.tertiary,
    border: `1px solid ${error ? colors.status.error : colors.border.default}`,
    borderRadius: radius.md,
    padding: '10px 12px',
    color: colors.text.primary,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    outline: 'none',
    transition: 'all 0.2s ease',
    width: '100%',
  };

  const errorStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.status.error,
  };

  return (
    <div style={containerStyles}>
      {label && <label style={labelStyles}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={inputStyles}
        {...props}
      />
      {error && <span style={errorStyles}>{error}</span>}
    </div>
  );
};

export default Input;
