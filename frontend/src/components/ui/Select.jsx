import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { colors, radius, typography, spacing, shadows } from '../../config/theme';

/**
 * Select Component - Custom Radix UI Implementation
 * Fully styled for dark mode/technical aesthetic
 */
const Select = ({ 
  label,
  value,
  onValueChange, // Changed from onChange to match Radix Pattern
  // Support both for backward compatibility if needed, but prefer onValueChange
  onChange, 
  options = [],
  error,
  ...props 
}) => {
  
  // Handle prop mapping if onChange was passed (legacy)
  const handleValueChange = (newValue) => {
    if (onValueChange) onValueChange(newValue);
    else if (onChange) onChange({ target: { value: newValue } });
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    position: 'relative',
  };

  const labelStyles = {
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
    color: colors.text.secondary,
    fontFamily: typography.fontFamily.mono,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontSize: '11px',
  };

  // Radix Trigger (The button itself)
  const triggerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: colors.bg.tertiary,
    border: `1px solid ${error ? colors.status.error : colors.border.default}`,
    borderRadius: radius.md,
    padding: '10px 12px',
    color: colors.text.primary,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    outline: 'none',
    width: '100%',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const contentStyles = {
    overflow: 'hidden',
    backgroundColor: colors.bg.tertiary, // Deep black
    borderRadius: radius.md,
    border: `1px solid ${colors.border.default}`,
    boxShadow: shadows.deep,
    zIndex: 100,
  };

  const viewportStyles = {
    padding: '4px',
  };

  const itemStyles = {
    fontSize: typography.fontSize.base,
    lineHeight: '1',
    color: colors.text.secondary,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    height: '32px',
    padding: '0 32px 0 24px',
    position: 'relative',
    userSelect: 'none',
    outline: 'none',
    cursor: 'pointer',
  };

  const errorStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.status.error,
  };
  
  // Internal style sheet for hover states since inline styles can't do pseudo-classes easily
  // In a real setup we'd use Tailwind or CSS-in-JS, but here we inject a style tag
  // to ensure the highlight state works.
  
  return (
    <div style={containerStyles}>
      <style>{`
        .SelectTrigger:hover {
          border-color: ${colors.text.muted};
        }
        .SelectTrigger:focus {
          border-color: ${colors.brand.primary};
          box-shadow: 0 0 0 1px ${colors.brand.primary};
        }
        .SelectItem[data-highlighted] {
          background-color: ${colors.brand.primary};
          color: white;
        }
        .SelectItemIndicator {
          position: absolute;
          left: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
      `}</style>

      {label && <label style={labelStyles}>{label}</label>}
      
      <SelectPrimitive.Root value={value} onValueChange={handleValueChange} {...props}>
        <SelectPrimitive.Trigger className="SelectTrigger" style={triggerStyles}>
          <SelectPrimitive.Value placeholder="Select an option" />
          <SelectPrimitive.Icon style={{ color: colors.text.muted }}>
             <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content style={contentStyles} position="popper" sideOffset={5} className="z-50 min-w-[var(--radix-select-trigger-width)]">
            <SelectPrimitive.ScrollUpButton style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '24px', color: colors.text.muted }}>
               ▲
            </SelectPrimitive.ScrollUpButton>
            
            <SelectPrimitive.Viewport style={viewportStyles}>
              {options.map((opt) => (
                <SelectPrimitive.Item key={opt.value} value={opt.value} className="SelectItem" style={itemStyles}>
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="SelectItemIndicator">
                     <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ color: 'currentColor' }}>
                        <path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '24px', color: colors.text.muted }}>
               ▼
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

      {error && <span style={errorStyles}>{error}</span>}
    </div>
  );
};

export default Select;
