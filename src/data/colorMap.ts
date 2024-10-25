interface Colors {
  [key: string]: string;
}

export const colorMap: Colors = {
  '0': '#FF8383',
  '1': '#FFB673',
  '2': '#FFE978',
  '3': '#98FF98',
  '4': '#B0E0E6',
  '5': '#D5A6A6',
  '6': '#E6E6FA',
  '7': '#F6A5C0',
  '8': '#FFE978',
  '9': '#D0F0C0',
  '10': '#FFDAB9',
  '11': '#FFFACD',
  '12': '#D0E6F4',
  '13': '#D8BFD8',
  '14': '#BFD3C1',
};

export function hex2rgba(hex: string, alpha = 1): string {
  if (!/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
    throw new Error('Invalid HEX color format');
  }

  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((x) => x + x)
      .join('');
  }

  const [r, g, b] = hex.match(/.{2}/g)!.map((x) => parseInt(x, 16));

  return `rgba(${r},${g},${b},${alpha})`;
}
