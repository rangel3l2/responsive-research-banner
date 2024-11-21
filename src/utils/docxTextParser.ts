import { TextRun } from 'docx';
import { DEFAULT_FONT, DEFAULT_FONT_SIZE } from './docxStyles';

export const parseFormattedText = (text: string): TextRun[] => {
  const parts: TextRun[] = [];
  let currentText = '';
  let i = 0;

  const currentFormatting = {
    bold: false,
    italic: false,
    underline: false,
    color: undefined as string | undefined,
  };

  while (i < text.length) {
    // Criar TextRun com a formatação atual
    const addTextRun = (text: string) => {
      if (!text) return;
      parts.push(new TextRun({
        text,
        bold: currentFormatting.bold,
        italics: currentFormatting.italic,
        underline: currentFormatting.underline ? {} : undefined,
        color: currentFormatting.color,
        size: DEFAULT_FONT_SIZE,
        font: DEFAULT_FONT,
      }));
    };

    // Processar o texto e manter a formatação
    if (text[i] === '{' && text.substring(i, i + 6) === '{bold}') {
      if (currentText) addTextRun(currentText);
      currentText = '';
      currentFormatting.bold = true;
      i += 6;
    } else if (text[i] === '{' && text.substring(i, i + 8) === '{/bold}') {
      if (currentText) addTextRun(currentText);
      currentText = '';
      currentFormatting.bold = false;
      i += 8;
    } else if (text[i] === '{' && text.substring(i, i + 8) === '{italic}') {
      if (currentText) addTextRun(currentText);
      currentText = '';
      currentFormatting.italic = true;
      i += 8;
    } else if (text[i] === '{' && text.substring(i, i + 10) === '{/italic}') {
      if (currentText) addTextRun(currentText);
      currentText = '';
      currentFormatting.italic = false;
      i += 10;
    } else if (text[i] === '{' && text.substring(i, i + 11) === '{underline}') {
      if (currentText) addTextRun(currentText);
      currentText = '';
      currentFormatting.underline = true;
      i += 11;
    } else if (text[i] === '{' && text.substring(i, i + 13) === '{/underline}') {
      if (currentText) addTextRun(currentText);
      currentText = '';
      currentFormatting.underline = false;
      i += 13;
    } else if (text[i] === '{' && text.substring(i, i + 7) === '{color:') {
      if (currentText) addTextRun(currentText);
      currentText = '';
      const colorEnd = text.indexOf('}', i + 7);
      currentFormatting.color = text.substring(i + 7, colorEnd);
      i = colorEnd + 1;
    } else if (text[i] === '{' && text.substring(i, i + 8) === '{/color}') {
      if (currentText) addTextRun(currentText);
      currentText = '';
      currentFormatting.color = undefined;
      i += 8;
    } else {
      currentText += text[i];
      i++;
    }
  }

  if (currentText) {
    addTextRun(currentText);
  }

  return parts;
};