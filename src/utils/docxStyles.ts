import { BorderStyle, WidthType } from 'docx';

// ABNT margins in twips (1440 twips = 1 inch = 2.54 cm)
// Left and right: 3cm = 1701 twips
// Top and bottom: 2.5cm = 1417 twips
export const PAGE_MARGINS = {
  top: 1417,
  right: 1701,
  bottom: 1417,
  left: 1701,
};

export const DEFAULT_FONT = "Times New Roman";
export const DEFAULT_FONT_SIZE = 24;

export const CELL_MARGINS = {
  top: 100,
  bottom: 100,
  left: 100,
  right: 100,
};

export const NO_BORDERS = {
  top: { style: BorderStyle.NONE },
  bottom: { style: BorderStyle.NONE },
  left: { style: BorderStyle.NONE },
  right: { style: BorderStyle.NONE },
};

// Equal width columns (50% each)
export const CELL_WIDTH = {
  size: 4500, // Fixed width in twips for equal columns
  type: WidthType.DXA,
};

export const TABLE_WIDTH = {
  size: 9000, // Total width in twips
  type: WidthType.DXA,
};

export const PARAGRAPH_SPACING = {
  before: 100,
  after: 100,
};

// Image width should be 25% of column width (middle of 20-30% range)
export const IMAGE_WIDTH = 1125; // 25% of column width (4500 * 0.25)
export const IMAGE_HEIGHT = 750; // Maintaining aspect ratio