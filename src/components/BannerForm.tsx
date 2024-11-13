import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { toast } from 'sonner';
import BannerHeader from './BannerHeader';
import BannerInputs from './BannerInputs';
import ImageUpload from './ImageUpload';

interface FormData {
  introduction: string;
  objectives: string;
  methods: string;
  expectedResults: string;
  bibliography: string;
  images: File[];
}

const BannerForm = () => {
  const [formData, setFormData] = useState<FormData>({
    introduction: '',
    objectives: '',
    methods: '',
    expectedResults: '',
    bibliography: '',
    images: [],
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

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

  const downloadAsPDF = async () => {
    if (!formRef.current) return;

    try {
      const canvas = await html2canvas(formRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: true,
        scale: 2,
        onclone: (document) => {
          const element = document.querySelector('#root');
          if (element instanceof HTMLElement) {
            element.style.width = '210mm';
            element.style.height = '297mm';
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('banner-cientifico.pdf');
      toast.success("PDF baixado com sucesso!");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error("Erro ao gerar PDF. Por favor, tente novamente.");
    }
  };

  const downloadAsDocx = async () => {
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: "Introdução", bold: true })],
            }),
            new Paragraph({
              children: [new TextRun({ text: formData.introduction })],
            }),
            new Paragraph({
              children: [new TextRun({ text: "Objetivos", bold: true })],
            }),
            new Paragraph({
              children: [new TextRun({ text: formData.objectives })],
            }),
            new Paragraph({
              children: [new TextRun({ text: "Materiais e Métodos", bold: true })],
            }),
            new Paragraph({
              children: [new TextRun({ text: formData.methods })],
            }),
            new Paragraph({
              children: [new TextRun({ text: "Resultados Esperados", bold: true })],
            }),
            new Paragraph({
              children: [new TextRun({ text: formData.expectedResults })],
            }),
            new Paragraph({
              children: [new TextRun({ text: "Referências Bibliográficas", bold: true })],
            }),
            new Paragraph({
              children: [new TextRun({ text: formData.bibliography })],
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
        <BannerHeader />
        <BannerInputs formData={formData} handleInputChange={handleInputChange} />
        <ImageUpload 
          handleImageUpload={handleImageUpload} 
          imageUrls={imageUrls} 
          maxImages={2} 
        />
        <div className="flex justify-end space-x-4">
          <Button onClick={downloadAsPDF}>
            Baixar PDF
          </Button>
          <Button onClick={downloadAsDocx} variant="outline">
            Baixar DOCX
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BannerForm;