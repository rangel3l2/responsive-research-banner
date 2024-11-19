import { TextRun } from 'docx';
import { DEFAULT_FONT, DEFAULT_FONT_SIZE } from './docxStyles';

export const parseFormattedText = (text: string): TextRun[] => {
  const parts: TextRun[] = [];
  let currentText = '';
  let i = 0;

  while (i < text.length) {
    if (text[i] === '*' && text[i + 1] === '*') {
      if (currentText) {
        parts.push(new TextRun({ text: currentText, size: DEFAULT_FONT_SIZE, font: DEFAULT_FONT }));
        currentText = '';
      }
      i += 2;
      let boldText = '';
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '*')) {
        boldText += text[i];
        i++;
      }
      parts.push(new TextRun({ text: boldText, bold: true, size: DEFAULT_FONT_SIZE, font: DEFAULT_FONT }));
      i += 2;
    } else if (text[i] === '_' && text[i + 1] !== '_') {
      if (currentText) {
        parts.push(new TextRun({ text: currentText, size: DEFAULT_FONT_SIZE, font: DEFAULT_FONT }));
        currentText = '';
      }
      i++;
      let italicText = '';
      while (i < text.length && text[i] !== '_') {
        italicText += text[i];
        i++;
      }
      parts.push(new TextRun({ text: italicText, italics: true, size: DEFAULT_FONT_SIZE, font: DEFAULT_FONT }));
      i++;
    } else if (text[i] === '_' && text[i + 1] === '_') {
      if (currentText) {
        parts.push(new TextRun({ text: currentText, size: DEFAULT_FONT_SIZE, font: DEFAULT_FONT }));
        currentText = '';
      }
      i += 2;
      let underlinedText = '';
      while (i < text.length && !(text[i] === '_' && text[i + 1] === '_')) {
        underlinedText += text[i];
        i++;
      }
      parts.push(new TextRun({ text: underlinedText, underline: {}, size: DEFAULT_FONT_SIZE, font: DEFAULT_FONT }));
      i += 2;
    } else {
      currentText += text[i];
      i++;
    }
  }

  if (currentText) {
    parts.push(new TextRun({ text: currentText, size: DEFAULT_FONT_SIZE, font: DEFAULT_FONT }));
  }

  return parts;
};