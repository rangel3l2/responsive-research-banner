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
  convertInchesToTwip,
} from 'docx';
import { convertImageToBase64, createImageRunOptions } from './imageUtils';
import { parseFormattedText } from './docxTextParser';
import { 
  CELL_MARGINS, 
  NO_BORDERS, 
  PAGE_MARGINS,
  PARAGRAPH_SPACING,
} from './docxStyles';

interface FormDataWithImages {
  title: string;
  introduction: string;
  objectives: string;
  methods: string;
  expectedResults: string;
  bibliography: string;
  images: File[];
  imageCaptions?: string[];
  logo?: File;
}

export const generateBannerDocx = async (formData: FormDataWithImages) => {
  try {
    const imageBase64Promises = formData.images.map(convertImageToBase64);
    const imageBase64Results = await Promise.all(imageBase64Promises);
    const logoBase64 = formData.logo ? await convertImageToBase64(formData.logo) : null;

    const logoParagraph = logoBase64 ? new Paragraph({
      children: [new ImageRun(createImageRunOptions(logoBase64, 100, 100))],
      spacing: PARAGRAPH_SPACING,
      alignment: AlignmentType.CENTER,
    }) : undefined;

    const methodsParagraphs = [];
    const methodsContent = formData.methods.split('[IMG]');
    methodsContent.forEach((text, index) => {
      methodsParagraphs.push(new Paragraph({
        children: parseFormattedText(text),
        spacing: { before: 0, after: 0 },
      }));
      
      if (index < methodsContent.length - 1 && imageBase64Results[index]) {
        methodsParagraphs.push(new Paragraph({
          children: [new ImageRun(createImageRunOptions(imageBase64Results[index], 300, 200))],
          spacing: { before: 100, after: 100 },
          alignment: AlignmentType.CENTER,
        }));
        
        if (formData.imageCaptions?.[index]) {
          methodsParagraphs.push(new Paragraph({
            children: parseFormattedText(formData.imageCaptions[index] || ''),
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 200 },
          }));
        }
      }
    });

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: PAGE_MARGINS,
          },
        },
        children: [
          ...(logoParagraph ? [logoParagraph] : []),
          new Paragraph({
            children: parseFormattedText(formData.title),
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 200 },
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
                      }),
                      new Paragraph({
                        children: parseFormattedText(formData.introduction),
                        spacing: { before: 0, after: 200 },
                      }),
                      new Paragraph({
                        children: [new TextRun({ text: "Objetivos", bold: true })],
                        spacing: { before: 0, after: 100 },
                      }),
                      new Paragraph({
                        children: parseFormattedText(formData.objectives),
                        spacing: { before: 0, after: 200 },
                      }),
                      new Paragraph({
                        children: [new TextRun({ text: "Materiais e Métodos", bold: true })],
                        spacing: { before: 0, after: 100 },
                      }),
                      ...methodsParagraphs,
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
                        children: [new TextRun({ text: "Resultados Esperados", bold: true })],
                        spacing: { before: 400, after: 100 },
                      }),
                      new Paragraph({
                        children: parseFormattedText(formData.expectedResults),
                        spacing: { before: 0, after: 200 },
                      }),
                      new Paragraph({
                        children: [new TextRun({ text: "Referências Bibliográficas", bold: true })],
                        spacing: { before: 0, after: 100 },
                      }),
                      new Paragraph({
                        children: parseFormattedText(formData.bibliography),
                        spacing: { before: 0, after: 0 },
                      }),
                    ],
                    width: {
                      size: 4500,
                      type: WidthType.DXA,
                    },
                    margins: { ...CELL_MARGINS, left: 100 },
                    borders: NO_BORDERS,
                  }),
                ],
              }),
            ],
            width: {
              size: 9000,
              type: WidthType.DXA,
            },
            borders: NO_BORDERS,
            columnWidths: [4500, 4500],
            layout: TableLayoutType.FIXED,
          }),
        ],
      }],
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            run: {
              size: 24,
              font: "Times New Roman",
            },
          },
        ],
      },
    });

    return await Packer.toBlob(doc);
  } catch (error) {
    console.error('Erro ao gerar DOCX:', error);
    throw error;
  }
};