import { TextRun } from 'docx';
import { DEFAULT_FONT, DEFAULT_FONT_SIZE } from './docxStyles';

const cleanHtml = (html: string): string => {
  if (!html) return '';
  
  // Remove HTML tags but preserve line breaks
  let text = html
    .replace(/<p>/g, '')
    .replace(/<\/p>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<li>/g, '• ')
    .replace(/<\/li>/g, '\n')
    .replace(/<ul>|<\/ul>|<ol>|<\/ol>/g, '\n')
    .replace(/<[^>]+>/g, '');
  
  // Remove extra line breaks and spaces
  text = text
    .replace(/\n\s*\n/g, '\n')
    .replace(/^\s+|\s+$/g, '');
  
  return text;
};

export const parseFormattedText = (text: string): TextRun[] => {
  const cleanedText = cleanHtml(text);
  
  if (!cleanedText) {
    return [];
  }

  // Split by line breaks to maintain paragraphs
  const paragraphs = cleanedText.split('\n');
  
  const textRuns: TextRun[] = [];
  
  paragraphs.forEach((paragraph, index) => {
    if (paragraph.trim()) {
      textRuns.push(
        new TextRun({
          text: paragraph.trim(),
          size: DEFAULT_FONT_SIZE,
          font: DEFAULT_FONT,
          break: index < paragraphs.length - 1 ? 1 : 0
        })
      );
    }
  });

  return textRuns;
};