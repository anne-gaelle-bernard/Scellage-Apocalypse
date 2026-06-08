export const COLORS = [
  { hex: '#F5C518', label: 'Or' },
  { hex: '#48BB78', label: 'Vert' },
  { hex: '#4299E1', label: 'Bleu' },
  { hex: '#FC8181', label: 'Rouge' },
  { hex: '#B794F4', label: 'Violet' },
  { hex: '#F6AD55', label: 'Orange' },
  { hex: '#F687B3', label: 'Rose' },
];

export function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
