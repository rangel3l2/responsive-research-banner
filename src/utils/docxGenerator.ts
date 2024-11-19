import { Document, Packer, ImageRun, Table, TableRow, TableCell, Paragraph } from 'docx';
import { convertImageToBase64, createImageRunOptions } from './imageUtils';
import { createTitleParagraph, createSectionParagraphs } from './docxParagraphs';
import { 
  CELL_MARGINS, 
  NO_BORDERS, 
  CELL_WIDTH,
  TABLE_WIDTH,
  PAGE_MARGINS,
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
  const imageBase64Promises = formData.images.map(convertImageToBase64);
  const imageBase64Results = await Promise.all(imageBase64Promises);
  const logoBase64 = formData.logo ? await convertImageToBase64(formData.logo) : null;

  const logoParagraph = logoBase64 ? new Paragraph({
    children: [new ImageRun(createImageRunOptions(logoBase64, 100, 100))],
    spacing: PARAGRAPH_SPACING,
    alignment: AlignmentType.CENTER,
  }) : undefined;

  // Split methods content and create paragraphs with images
  const methodsContent = formData.methods.split('[IMG]');
  const methodsParagraphs = methodsContent.reduce((acc: Paragraph[], text, index) => {
    acc.push(new Paragraph({
      children: parseFormattedText(text),
      spacing: PARAGRAPH_SPACING,
    }));
    
    if (index < methodsContent.length - 1 && imageBase64Results[index]) {
      acc.push(new Paragraph({
        children: [new ImageRun(createImageRunOptions(imageBase64Results[index], 300, 200))],
        spacing: { after: 200 },
        alignment: AlignmentType.CENTER,
      }));
      
      if (formData.imageCaptions?.[index]) {
        acc.push(new Paragraph({
          children: parseFormattedText(formData.imageCaptions[index] || ''),
          alignment: AlignmentType.CENTER,
          spacing: PARAGRAPH_SPACING,
        }));
      }
    }
    return acc;
  }, []);

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: PAGE_MARGINS,
        },
      },
      children: [
        ...(logoParagraph ? [logoParagraph] : []),
        createTitleParagraph(formData.title),
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    ...createSectionParagraphs("Introdução", formData.introduction),
                    ...createSectionParagraphs("Objetivos", formData.objectives),
                    ...createSectionParagraphs("Materiais e Métodos", ""),
                    ...methodsParagraphs,
                  ],
                  width: CELL_WIDTH,
                  margins: CELL_MARGINS,
                  borders: NO_BORDERS,
                  columnSpan: 1,
                  verticalAlign: "top",
                  textDirection: "lrTb",
                }),
                new TableCell({
                  children: [
                    ...createSectionParagraphs("Resultados Esperados", formData.expectedResults),
                    ...createSectionParagraphs("Referências Bibliográficas", formData.bibliography),
                  ],
                  width: CELL_WIDTH,
                  margins: CELL_MARGINS,
                  borders: NO_BORDERS,
                  columnSpan: 1,
                  verticalAlign: "top",
                  textDirection: "lrTb",
                }),
              ],
            }),
          ],
          width: TABLE_WIDTH,
          borders: NO_BORDERS,
          layout: "fixed",
          columnWidths: [4500, 4500],
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
};