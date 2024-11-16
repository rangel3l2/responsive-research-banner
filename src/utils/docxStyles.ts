import { AlignmentType, BorderStyle, WidthType } from 'docx';

export const DEFAULT_FONT = "Times New Roman";
export const DEFAULT_FONT_SIZE = 24;

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
  size: 50,
  type: WidthType.PERCENTAGE,
};

export const TABLE_WIDTH = {
  size: 100,
  type: WidthType.PERCENTAGE,
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