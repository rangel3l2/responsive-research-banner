import { Paragraph, AlignmentType } from 'docx';
import { parseFormattedText } from './docxTextParser';
import { PARAGRAPH_SPACING } from './docxStyles';

export const createTitleParagraph = (title: string) => new Paragraph({
  children: parseFormattedText(title),
  alignment: AlignmentType.CENTER,
  spacing: PARAGRAPH_SPACING,
});

export const createSectionParagraphs = (title: string, content: string) => [
  new Paragraph({
    children: parseFormattedText(title),
    spacing: { after: 200 },
  }),
  new Paragraph({
    children: parseFormattedText(content),
    spacing: PARAGRAPH_SPACING,
  }),
];