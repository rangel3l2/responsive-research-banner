import { BannerFormData } from '@/models/formData';
import { 
  Document,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  TextRun,
  HeightRule,
} from 'docx';
import { CELL_MARGINS, NO_BORDERS, PAGE_MARGINS } from './docxStyles';
import { parseFormattedText } from './docxTextParser';
import { createImageParagraphs, createLogoHeader } from './docxImageHandler';

// Layout 1: Clássico (duas colunas)
const createClassicLayout = async (formData: BannerFormData) => {
  const logoHeader = await createLogoHeader(formData.logo, '/escola-estadual-logo.png');
  
  return {
    properties: {
      page: {
        margin: PAGE_MARGINS,
        size: {
          width: 11906,  // A0 landscape width
          height: 16838, // A0 landscape height
        },
        orientation: 'landscape',
      },
    },
    headers: {
      default: logoHeader,
    },
    children: [
      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.introduction),
                    spacing: { after: 200 },
                  }),
                  new Paragraph({
                    children: parseFormattedText(formData.objective),
                    spacing: { after: 200 },
                  }),
                  new Paragraph({
                    children: parseFormattedText(formData.methodology),
                    spacing: { after: 200 },
                  }),
                ],
                width: { size: 4500, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.resultsAndDiscussion),
                    spacing: { after: 200 },
                  }),
                  new Paragraph({
                    children: parseFormattedText(formData.conclusion),
                    spacing: { after: 200 },
                  }),
                  new Paragraph({
                    children: parseFormattedText(formData.references),
                  }),
                ],
                width: { size: 4500, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
            ],
          }),
        ],
        width: { size: 9000, type: WidthType.DXA },
        borders: NO_BORDERS,
      }),
    ],
  };
};

// Layout 2: Moderno (três colunas)
const createModernLayout = async (formData: BannerFormData) => {
  const logoHeader = await createLogoHeader(formData.logo, '/escola-estadual-logo.png');
  
  return {
    properties: {
      page: {
        margin: PAGE_MARGINS,
        size: {
          width: 11906,
          height: 16838,
        },
        orientation: 'landscape',
      },
    },
    headers: {
      default: logoHeader,
    },
    children: [
      new Table({
        rows: [
          new TableRow({
            children: [
              // Coluna 1: Introdução e Objetivo
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.introduction),
                    spacing: { after: 200 },
                  }),
                  new Paragraph({
                    children: parseFormattedText(formData.objective),
                  }),
                ],
                width: { size: 3000, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              // Coluna 2: Metodologia e parte dos Resultados
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.methodology),
                    spacing: { after: 200 },
                  }),
                  new Paragraph({
                    children: parseFormattedText(formData.resultsAndDiscussion.slice(0, formData.resultsAndDiscussion.length / 2)),
                  }),
                ],
                width: { size: 3000, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              // Coluna 3: Resto dos Resultados, Conclusão e Referências
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.resultsAndDiscussion.slice(formData.resultsAndDiscussion.length / 2)),
                    spacing: { after: 200 },
                  }),
                  new Paragraph({
                    children: parseFormattedText(formData.conclusion),
                    spacing: { after: 200 },
                  }),
                  new Paragraph({
                    children: parseFormattedText(formData.references),
                  }),
                ],
                width: { size: 3000, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
            ],
          }),
        ],
        width: { size: 9000, type: WidthType.DXA },
        borders: NO_BORDERS,
      }),
    ],
  };
};

// Layout 3: Fluxo (formato Z)
const createZFlowLayout = async (formData: BannerFormData) => {
  const logoHeader = await createLogoHeader(formData.logo, '/escola-estadual-logo.png');
  
  return {
    properties: {
      page: {
        margin: PAGE_MARGINS,
        size: {
          width: 11906,
          height: 16838,
        },
        orientation: 'landscape',
      },
    },
    headers: {
      default: logoHeader,
    },
    children: [
      new Table({
        rows: [
          // Linha 1: Introdução -> Objetivo
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.introduction),
                  }),
                ],
                width: { size: 4500, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.objective),
                  }),
                ],
                width: { size: 4500, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
            ],
          }),
          // Linha 2: Metodologia <- Resultados
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.methodology),
                  }),
                ],
                width: { size: 4500, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.resultsAndDiscussion),
                  }),
                ],
                width: { size: 4500, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
            ],
          }),
          // Linha 3: Conclusão -> Referências
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.conclusion),
                  }),
                ],
                width: { size: 4500, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.references),
                  }),
                ],
                width: { size: 4500, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
            ],
          }),
        ],
        width: { size: 9000, type: WidthType.DXA },
        borders: NO_BORDERS,
      }),
    ],
  };
};

// Layout 4: Circular
const createCircularLayout = async (formData: BannerFormData) => {
  const logoHeader = await createLogoHeader(formData.logo, '/escola-estadual-logo.png');
  
  return {
    properties: {
      page: {
        margin: PAGE_MARGINS,
        size: {
          width: 11906,
          height: 16838,
        },
        orientation: 'landscape',
      },
    },
    headers: {
      default: logoHeader,
    },
    children: [
      // Centro: Objetivo
      new Paragraph({
        children: parseFormattedText(formData.objective),
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      }),
      // Círculo externo: outros elementos
      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.introduction),
                  }),
                ],
                width: { size: 2250, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.methodology),
                  }),
                ],
                width: { size: 2250, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.resultsAndDiscussion),
                  }),
                ],
                width: { size: 2250, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.conclusion),
                  }),
                ],
                width: { size: 2250, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
            ],
          }),
        ],
        width: { size: 9000, type: WidthType.DXA },
        borders: NO_BORDERS,
      }),
      // Referências na base
      new Paragraph({
        children: parseFormattedText(formData.references),
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 },
      }),
    ],
  };
};

// Layout 5: Hierárquico
const createHierarchicalLayout = async (formData: BannerFormData) => {
  const logoHeader = await createLogoHeader(formData.logo, '/escola-estadual-logo.png');
  
  return {
    properties: {
      page: {
        margin: PAGE_MARGINS,
        size: {
          width: 11906,
          height: 16838,
        },
        orientation: 'landscape',
      },
    },
    headers: {
      default: logoHeader,
    },
    children: [
      // Topo: Introdução e Objetivo
      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.introduction),
                  }),
                ],
                width: { size: 4500, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.objective),
                  }),
                ],
                width: { size: 4500, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
            ],
          }),
        ],
        width: { size: 9000, type: WidthType.DXA },
        borders: NO_BORDERS,
      }),
      // Centro: Metodologia
      new Paragraph({
        children: parseFormattedText(formData.methodology),
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 400 },
      }),
      // Base: Resultados, Conclusão e Referências
      new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.resultsAndDiscussion),
                  }),
                ],
                width: { size: 3000, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.conclusion),
                  }),
                ],
                width: { size: 3000, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    children: parseFormattedText(formData.references),
                  }),
                ],
                width: { size: 3000, type: WidthType.DXA },
                margins: CELL_MARGINS,
                borders: NO_BORDERS,
              }),
            ],
          }),
        ],
        width: { size: 9000, type: WidthType.DXA },
        borders: NO_BORDERS,
      }),
    ],
  };
};

export const layouts = {
  classic: createClassicLayout,
  modern: createModernLayout,
  zFlow: createZFlowLayout,
  circular: createCircularLayout,
  hierarchical: createHierarchicalLayout,
};

export type LayoutType = keyof typeof layouts;
