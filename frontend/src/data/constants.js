/**
 * Application Constants
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const REVIEW_TYPES = [
    {
        value: 'general',
        label: 'General Review',
        icon: '🎯',
        description: 'Comprehensive analysis covering all aspects'
    },
    {
        value: 'security',
        label: 'Security Analysis',
        icon: '🔒',
        description: 'Focus on security vulnerabilities'
    },
    {
        value: 'performance',
        label: 'Performance Check',
        icon: '⚡',
        description: 'Optimize for speed and efficiency'
    },
    {
        value: 'style',
        label: 'Style & Best Practices',
        icon: '🎨',
        description: 'Code quality and maintainability'
    },
];

export const SAMPLE_CODE = `function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// Missing input validation
const result = calculateTotal([
  { name: "Item 1", price: "25" },
  { name: "Item 2", price: 30 }
]);`;

export const ISSUE_TYPES = {
    bug: { icon: '🐛', label: 'Bug' },
    security: { icon: '🔒', label: 'Security' },
    performance: { icon: '⚡', label: 'Performance' },
    style: { icon: '🎨', label: 'Style' },
};

export const SEVERITY_LEVELS = {
    high: { icon: '🔴', label: 'High' },
    medium: { icon: '🟡', label: 'Medium' },
    low: { icon: '🔵', label: 'Low' },
};
