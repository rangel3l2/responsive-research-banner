import { Document, Packer, Paragraph, TextRun, AlignmentType, ImageRun } from 'docx';
import { convertImageToBase64, createImageRunOptions } from './imageUtils';
import { 
  DEFAULT_FONT,
  DEFAULT_FONT_SIZE,
  PAGE_MARGINS,
  PARAGRAPH_SPACING
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

const createTitleParagraph = (title: string) => new Paragraph({
  children: [
    new TextRun({
      text: title || "Título não fornecido",
      bold: true,
      size: DEFAULT_FONT_SIZE,
      font: DEFAULT_FONT
    }),
  ],
  alignment: AlignmentType.CENTER,
  spacing: PARAGRAPH_SPACING,
});

const createSectionParagraphs = (title: string, content: string) => [
  new Paragraph({
    children: [
      new TextRun({ text: title, bold: true, size: DEFAULT_FONT_SIZE, font: DEFAULT_FONT }),
    ],
    spacing: { after: 200 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: content, size: DEFAULT_FONT_SIZE, font: DEFAULT_FONT }),
    ],
    spacing: PARAGRAPH_SPACING,
  }),
];

export const generateBannerDocx = async (formData: FormDataWithImages) => {
  const imageBase64Promises = formData.images.map(convertImageToBase64);
  const imageBase64Results = await Promise.all(imageBase64Promises);
  const logoBase64 = formData.logo ? await convertImageToBase64(formData.logo) : null;

  const logoParagraph = logoBase64 ? new Paragraph({
    children: [
      new ImageRun(createImageRunOptions(logoBase64, 100, 100)),
    ],
    spacing: PARAGRAPH_SPACING,
    alignment: AlignmentType.CENTER,
  }) : undefined;

  // Split methods content and images based on position markers
  const methodsContent = formData.methods.split('[IMG]');
  const methodsParagraphs = methodsContent.reduce((acc: Paragraph[], text, index) => {
    acc.push(new Paragraph({
      children: [
        new TextRun({ text, size: DEFAULT_FONT_SIZE, font: DEFAULT_FONT }),
      ],
      spacing: PARAGRAPH_SPACING,
    }));
    
    if (index < methodsContent.length - 1 && imageBase64Results[index]) {
      acc.push(new Paragraph({
        children: [
          new ImageRun(createImageRunOptions(imageBase64Results[index], 300, 200)),
        ],
        spacing: { after: 200 },
        alignment: AlignmentType.CENTER,
      }));
      
      if (formData.imageCaptions?.[index]) {
        acc.push(new Paragraph({
          children: [
            new TextRun({ 
              text: formData.imageCaptions[index] || '', 
              size: DEFAULT_FONT_SIZE, 
              font: DEFAULT_FONT 
            }),
          ],
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
          size: {
            orientation: 'landscape'
          },
          columns: {
            space: 708,
            count: 2,
            equalWidth: true,
          }
        },
      },
      children: [
        ...(logoParagraph ? [logoParagraph] : []),
        createTitleParagraph(formData.title),
        ...createSectionParagraphs("Introdução", formData.introduction),
        ...createSectionParagraphs("Objetivos", formData.objectives),
        ...createSectionParagraphs("Materiais e Métodos", ""),
        ...methodsParagraphs,
        ...createSectionParagraphs("Resultados Esperados", formData.expectedResults),
        ...createSectionParagraphs("Referências Bibliográficas", formData.bibliography),
      ],
    }],
    styles: {
      paragraphStyles: [
        {
          id: "Normal",
          name: "Normal",
          run: {
            size: DEFAULT_FONT_SIZE,
            font: DEFAULT_FONT,
          },
        },
      ],
    },
  });

  return await Packer.toBlob(doc);
};