import { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, BorderStyle, WidthType } from 'docx';

export const generateBannerDocx = async (formData: {
  title: string;
  introduction: string;
  objectives: string;
  methods: string;
  expectedResults: string;
  bibliography: string;
}) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
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
                        new TextRun({ text: "\n" + formData.introduction, size: 24, font: "Times New Roman" }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "\nObjetivos", bold: true, size: 24, font: "Times New Roman" }),
                        new TextRun({ text: "\n" + formData.objectives, size: 24, font: "Times New Roman" }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "\nMateriais e Métodos", bold: true, size: 24, font: "Times New Roman" }),
                        new TextRun({ text: "\n" + formData.methods, size: 24, font: "Times New Roman" }),
                      ],
                    }),
                  ],
                  width: {
                    size: 50,
                    type: WidthType.PERCENTAGE,
                  },
                  margins: {
                    top: 100,
                    bottom: 100,
                    left: 100,
                    right: 100,
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
                        new TextRun({ text: "\n" + formData.expectedResults, size: 24, font: "Times New Roman" }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({ text: "\nReferências Bibliográficas", bold: true, size: 24, font: "Times New Roman" }),
                        new TextRun({ text: "\n" + formData.bibliography, size: 24, font: "Times New Roman" }),
                      ],
                    }),
                  ],
                  width: {
                    size: 50,
                    type: WidthType.PERCENTAGE,
                  },
                  margins: {
                    top: 100,
                    bottom: 100,
                    left: 100,
                    right: 100,
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