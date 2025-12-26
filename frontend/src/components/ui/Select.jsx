import { colors, radius, typography } from '../../config/theme';

/**
 * Select Component
 */
const Select = ({ 
  label,
  value,
  onChange,
  options = [],
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

  const selectStyles = {
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
    cursor: 'pointer',
    appearance: 'none', // Remove default arrow
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
  };

  const errorStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.status.error,
  };

  return (
    <div style={containerStyles}>
      {label && <label style={labelStyles}>{label}</label>}
      <select
        value={value}
        onChange={onChange}
        style={selectStyles}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span style={errorStyles}>{error}</span>}
    </div>
  );
};

export default Select;
