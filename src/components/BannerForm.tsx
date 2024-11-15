import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Document, Packer, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, BorderStyle } from 'docx'; 
import { toast } from 'sonner';
import BannerHeader from './BannerHeader';
import BannerInputs from './BannerInputs';
import ImageUpload from './ImageUpload';

interface FormData {
  title: string;
  introduction: string;
  objectives: string;
  methods: string;
  expectedResults: string;
  bibliography: string;
  images: File[];
}

const BannerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    introduction: '',
    objectives: '',
    methods: '',
    expectedResults: '',
    bibliography: '',
    images: [],
  });

  const [title, setTitle] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

  // Função para atualizar o título em formData
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setFormData((prev) => ({ ...prev, title: newTitle }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + formData.images.length > 2) {
      toast.error("Máximo de 2 imagens permitido");
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData((prev) => ({ ...prev, images: newImages }));

    const newUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  const downloadAsDocx = async () => {
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Título no topo, centralizado
            new Paragraph({
              children: [
                new TextRun({
                  text: formData.title || "Título não fornecido",  // Usar o título do formulário
                  bold: true,
                  size: 32,  // Tamanho maior para o título
                }),
              ],
              alignment: AlignmentType.CENTER,  // Centralizado
            }),

            // Tabela com duas colunas para o conteúdo
            new Table({
              rows: [
                new TableRow({
                  children: [
                    // Primeira coluna
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: "Introdução", bold: true }),
                            new TextRun({ text: formData.introduction }),
                          ],
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: "Objetivos", bold: true }),
                            new TextRun({ text: formData.objectives }),
                          ],
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: "Materiais e Métodos", bold: true }),
                            new TextRun({ text: formData.methods }),
                          ],
                        }),
                      ],
                      borders: { 
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                      },
                    }),

                    // Segunda coluna
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: "Materiais e Métodos (continuação)", bold: true }),
                            new TextRun({ text: formData.methods }),
                          ],
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: "Resultados Esperados", bold: true }),
                            new TextRun({ text: formData.expectedResults }),
                          ],
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: "Referências Bibliográficas", bold: true }),
                            new TextRun({ text: formData.bibliography }),
                          ],
                        }),
                      ],
                      borders: { 
                        top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                        right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                      },
                    }),
                  ],
                }),
              ],
            }),
          ],
        }],
      });

      const blob = await Packer.toBlob(doc);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'banner-cientifico.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("DOCX baixado com sucesso!");
    } catch (error) {
      console.error('Error generating DOCX:', error);
      toast.error("Erro ao gerar DOCX. Por favor, tente novamente.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-6 space-y-8" ref={formRef}>
        <BannerHeader title={title} setTitle={handleTitleChange} />
        <BannerInputs formData={formData} handleInputChange={handleInputChange} />
        <ImageUpload 
          handleImageUpload={handleImageUpload} 
          imageUrls={imageUrls} 
          maxImages={2} 
        />
        <div className="flex justify-end space-x-4 pdf-docx-buttons">
          <Button onClick={downloadAsDocx} variant="outline">
            Baixar DOCX
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BannerForm;
