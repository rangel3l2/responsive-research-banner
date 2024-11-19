import { BorderStyle, WidthType } from 'docx';

export const DEFAULT_FONT = "Times New Roman";
export const DEFAULT_FONT_SIZE = 24;
export const MAX_CHARS_PER_PAGE = 3000;
export const MAX_IMAGE_SIZE_KB = 500;

export const CELL_MARGINS = {
  top: 200,
  bottom: 200,
  left: 200,
  right: 200,
};

export const NO_BORDERS = {
  top: { style: BorderStyle.NONE, size: 0 },
  bottom: { style: BorderStyle.NONE, size: 0 },
  left: { style: BorderStyle.NONE, size: 0 },
  right: { style: BorderStyle.NONE, size: 0 },
  insideHorizontal: { style: BorderStyle.NONE, size: 0 },
  insideVertical: { style: BorderStyle.NONE, size: 0 },
};

export const CELL_WIDTH = {
  size: 4500,
  type: WidthType.DXA,
};

export const TABLE_WIDTH = {
  size: 9000,
  type: WidthType.DXA,
};

export const PAGE_MARGINS = {
  top: 1440,
  right: 1440,
  bottom: 1440,
  left: 1440,
};

export const PARAGRAPH_SPACING = {
  after: 400,
};

export const IMAGE_WIDTH = 200;
export const IMAGE_HEIGHT = 150;