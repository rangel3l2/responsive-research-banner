import { BorderStyle, WidthType } from 'docx';

export const DEFAULT_FONT = "Times New Roman";
export const DEFAULT_FONT_SIZE = 24;
export const MAX_CHARS_PER_PAGE = 3000; // Aproximadamente uma página
export const MAX_IMAGE_SIZE_KB = 500; // 500KB

export const CELL_MARGINS = {
  top: 200,
  bottom: 200,
  left: 200,
  right: 200,
};

export const NO_BORDERS = {
  top: { style: BorderStyle.NONE },
  bottom: { style: BorderStyle.NONE },
  left: { style: BorderStyle.NONE },
  right: { style: BorderStyle.NONE },
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