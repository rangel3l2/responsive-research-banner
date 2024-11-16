import { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, BorderStyle, WidthType, ImageRun } from 'docx';

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

const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const generateBannerDocx = async (formData: FormDataWithImages) => {
  // Convert images to base64
  const imageBase64Promises = formData.images.map(convertImageToBase64);
  const imageBase64Results = await Promise.all(imageBase64Promises);
  const logoBase64 = formData.logo ? await convertImageToBase64(formData.logo) : null;

  // Create logo paragraph if logo exists
  const logoParagraph = logoBase64 ? new Paragraph({
    children: [
      new ImageRun({
        data: logoBase64.split(',')[1],
        transformation: {
          width: 100,
          height: 100,
        },
      }),
    ],
    spacing: {
      after: 400,
    },
    alignment: AlignmentType.CENTER,
  }) : undefined;

  // Create image paragraphs with captions
  const imagesParagraphs = imageBase64Results.map((base64, index) => [
    new Paragraph({
      children: [
        new ImageRun({
          data: base64.split(',')[1],
          transformation: {
            width: 300,
            height: 200,
          },
        }),
      ],
      spacing: {
        after: 200,
      },
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: formData.imageCaptions?.[index] || '',
          size: 24,
          font: "Times New Roman",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 400,
      },
    }),
  ]).flat();

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1440, // 1 inch = 1440 twips
            right: 1440,
            bottom: 1440,
            left: 1440,
          },
        },
      },
      children: [
        ...(logoParagraph ? [logoParagraph] : []),
        new Paragraph({
          children: [
            new TextRun({
              text: formData.title || "Título não fornecido",
              bold: true,
              size: 24,
              font: "Times New Roman"
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 400,
          },
        }),

        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Introdução", bold: true, size: 24, font: "Times New Roman" }),
                      ],
                      spacing: { after: 200 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: formData.introduction, size: 24, font: "Times New Roman" }),
                      ],
                      spacing: { after: 400 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Objetivos", bold: true, size: 24, font: "Times New Roman" }),
                      ],
                      spacing: { after: 200 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: formData.objectives, size: 24, font: "Times New Roman" }),
                      ],
                      spacing: { after: 400 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Materiais e Métodos", bold: true, size: 24, font: "Times New Roman" }),
                      ],
                      spacing: { after: 200 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: formData.methods, size: 24, font: "Times New Roman" }),
                      ],
                      spacing: { after: 400 },
                    }),
                    ...imagesParagraphs,
                  ],
                  width: {
                    size: 50,
                    type: WidthType.PERCENTAGE,
                  },
                  margins: {
                    top: 200,
                    bottom: 200,
                    left: 200,
                    right: 200,
                  },
                  borders: { 
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),

                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Resultados Esperados", bold: true, size: 24, font: "Times New Roman" }),
                      ],
                      spacing: { after: 200 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: formData.expectedResults, size: 24, font: "Times New Roman" }),
                      ],
                      spacing: { after: 400 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "Referências Bibliográficas", bold: true, size: 24, font: "Times New Roman" }),
                      ],
                      spacing: { after: 200 },
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: formData.bibliography, size: 24, font: "Times New Roman" }),
                      ],
                      spacing: { after: 400 },
                    }),
                  ],
                  width: {
                    size: 50,
                    type: WidthType.PERCENTAGE,
                  },
                  margins: {
                    top: 200,
                    bottom: 200,
                    left: 200,
                    right: 200,
                  },
                  borders: { 
                    top: { style: BorderStyle.NONE },
                    bottom: { style: BorderStyle.NONE },
                    left: { style: BorderStyle.NONE },
                    right: { style: BorderStyle.NONE },
                  },
                }),
              ],
            }),
          ],
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
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