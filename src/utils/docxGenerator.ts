import { 
  Document, 
  Packer, 
  Paragraph, 
  Table, 
  TableRow, 
  TableCell,
  AlignmentType,
  TableLayoutType,
  WidthType,
  Header,
  TextRun
} from 'docx';
import { BannerFormData } from '@/models/formData';
import { splitTextAtWordBoundary } from './docxTextSplitter';
import { createImageParagraphs, createLogoHeader } from './docxImageHandler';
import { 
  CELL_MARGINS, 
  NO_BORDERS, 
  PAGE_MARGINS,
  PARAGRAPH_SPACING,
  DEFAULT_FONT,
  DEFAULT_FONT_SIZE,
  MAX_CHARS_PER_PAGE
} from './docxStyles';
import { parseFormattedText } from './docxTextParser';

const createSectionTitle = (title: string): Paragraph => {
  return new Paragraph({
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: DEFAULT_FONT_SIZE,
        font: DEFAULT_FONT,
      })
    ],
    spacing: { before: 240, after: 120 }
  });
};

export const generateBannerDocx = async (formData: BannerFormData) => {
  try {
    const resultsText = formData.resultsAndDiscussion;
    const approximateMiddle = Math.ceil(resultsText.length * 0.4); // Adjust to 40% for first column
    const [firstHalf, secondHalf] = splitTextAtWordBoundary(resultsText, approximateMiddle);

    const logoHeader = await createLogoHeader(formData.logo, '/escola-estadual-logo.png');

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: PAGE_MARGINS,
          },
        },
        headers: {
          default: new Header({
            children: logoHeader.children
          })
        },
        children: [
          new Paragraph({
            children: parseFormattedText(formData.title),
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 240 },
            style: 'Title'
          }),
          new Paragraph({
            children: parseFormattedText(formData.authors),
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 120 },
          }),
          new Paragraph({
            children: parseFormattedText(formData.institution),
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 240 },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      createSectionTitle("Introdução"),
                      new Paragraph({
                        children: parseFormattedText(formData.introduction),
                        spacing: PARAGRAPH_SPACING,
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      createSectionTitle("Objetivo"),
                      new Paragraph({
                        children: parseFormattedText(formData.objective),
                        spacing: PARAGRAPH_SPACING,
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      createSectionTitle("Metodologia"),
                      new Paragraph({
                        children: parseFormattedText(formData.methodology),
                        spacing: PARAGRAPH_SPACING,
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      createSectionTitle("Resultados e Discussão"),
                      new Paragraph({
                        children: parseFormattedText(firstHalf),
                        spacing: PARAGRAPH_SPACING,
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                    ],
                    width: {
                      size: 4500,
                      type: WidthType.DXA,
                    },
                    margins: { ...CELL_MARGINS, right: 100 },
                    borders: NO_BORDERS,
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: parseFormattedText(secondHalf),
                        spacing: PARAGRAPH_SPACING,
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      ...(await createImageParagraphs(formData.images, formData.imageCaptions)),
                      createSectionTitle("Conclusão"),
                      new Paragraph({
                        children: parseFormattedText(formData.conclusion),
                        spacing: PARAGRAPH_SPACING,
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      createSectionTitle("Referências"),
                      new Paragraph({
                        children: parseFormattedText(formData.references),
                        spacing: PARAGRAPH_SPACING,
                        alignment: AlignmentType.JUSTIFIED,
                      })
                    ],
                    width: {
                      size: 4500,
                      type: WidthType.DXA,
                    },
                    margins: { ...CELL_MARGINS, left: 100 },
                    borders: NO_BORDERS,
                  })
                ]
              })
            ],
            width: {
              size: 9000,
              type: WidthType.DXA,
            },
            borders: NO_BORDERS,
            columnWidths: [4500, 4500],
            layout: TableLayoutType.FIXED,
          })
        ]
      }],
      styles: {
        paragraphStyles: [
          {
            id: "Title",
            name: "Title",
            run: {
              size: 48,
              bold: true,
              font: DEFAULT_FONT,
            },
            paragraph: {
              spacing: { before: 0, after: 240 },
              alignment: AlignmentType.CENTER,
            }
          },
          {
            id: "Normal",
            name: "Normal",
            run: {
              size: DEFAULT_FONT_SIZE,
              font: DEFAULT_FONT,
            }
          }
        ]
      }
    });

    return await Packer.toBlob(doc);
  } catch (error) {
    console.error('Erro ao gerar DOCX:', error);
    throw error;
  }
};