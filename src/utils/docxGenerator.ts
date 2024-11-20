import { 
  Document, 
  Packer, 
  Paragraph, 
  Table, 
  TableRow, 
  TableCell, 
  ImageRun,
  AlignmentType,
  TextRun,
  WidthType,
  TableLayoutType,
} from 'docx';
import { convertImageToBase64, createImageRunOptions } from './imageUtils';
import { parseFormattedText } from './docxTextParser';
import { 
  CELL_MARGINS, 
  NO_BORDERS, 
  PAGE_MARGINS,
  PARAGRAPH_SPACING,
} from './docxStyles';
import { BannerFormData } from '@/models/formData';

export const generateBannerDocx = async (formData: BannerFormData) => {
  try {
    const imageBase64Promises = formData.images.map(convertImageToBase64);
    const imageBase64Results = await Promise.all(imageBase64Promises);
    const logoBase64 = formData.logo ? await convertImageToBase64(formData.logo) : null;

    // Calculate text split for Results and Discussion
    const resultsText = formData.resultsAndDiscussion;
    const approximateMiddle = Math.ceil(resultsText.length / 2);
    const firstHalf = resultsText.substring(0, approximateMiddle);
    const secondHalf = resultsText.substring(approximateMiddle);

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: PAGE_MARGINS,
          },
        },
        children: [
          ...(logoBase64 ? [new Paragraph({
            children: [new ImageRun(createImageRunOptions(logoBase64, 100, 100))],
            spacing: PARAGRAPH_SPACING,
            alignment: AlignmentType.CENTER,
          })] : []),
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
                      new Paragraph({
                        children: [new TextRun({ text: "Introdução", bold: true })],
                        spacing: { before: 0, after: 100 },
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      new Paragraph({
                        children: parseFormattedText(formData.introduction),
                        spacing: { before: 0, after: 200 },
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      new Paragraph({
                        children: [new TextRun({ text: "Materiais e Métodos", bold: true })],
                        spacing: { before: 0, after: 100 },
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      new Paragraph({
                        children: parseFormattedText(formData.methodology),
                        spacing: { before: 0, after: 200 },
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      new Paragraph({
                        children: [new TextRun({ text: "Resultados e Discussão", bold: true })],
                        spacing: { before: 0, after: 100 },
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      new Paragraph({
                        children: parseFormattedText(firstHalf),
                        spacing: { before: 0, after: 200 },
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
                        spacing: { before: 0, after: 200 },
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      ...(formData.images.length > 0 ? [
                        ...formData.images.map((_, index) => new Paragraph({
                          children: [
                            new ImageRun(createImageRunOptions(imageBase64Results[index], 200, 150))
                          ],
                          spacing: { before: 120, after: 120 },
                          alignment: AlignmentType.CENTER,
                        })),
                        ...formData.imageCaptions.map((caption, index) => new Paragraph({
                          children: parseFormattedText(caption),
                          spacing: { before: 0, after: 120 },
                          alignment: AlignmentType.CENTER,
                        }))
                      ] : []),
                      new Paragraph({
                        children: [new TextRun({ text: "Conclusão", bold: true })],
                        spacing: { before: 200, after: 100 },
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      new Paragraph({
                        children: parseFormattedText(formData.conclusion),
                        spacing: { before: 0, after: 200 },
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      new Paragraph({
                        children: [new TextRun({ text: "Referências Bibliográficas", bold: true })],
                        spacing: { before: 0, after: 100 },
                        alignment: AlignmentType.JUSTIFIED,
                      }),
                      new Paragraph({
                        children: parseFormattedText(formData.references),
                        spacing: { before: 0, after: 0 },
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
              font: "Times New Roman",
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
              size: 24,
              font: "Times New Roman",
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
