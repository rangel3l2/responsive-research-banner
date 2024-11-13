import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';

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
      const canvas = await html2canvas(formRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Add school logo
      const logoImg = document.getElementById('schoolLogo') as HTMLImageElement;
      if (logoImg) {
        pdf.addImage(logoImg.src, 'PNG', 0, 0, pdfWidth, 40);
      }
      
      pdf.addImage(imgData, 'PNG', 0, 40, pdfWidth, pdfHeight - 40);
      pdf.save('banner-cientifico.pdf');
      toast.success("PDF baixado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar PDF");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-6 space-y-8" ref={formRef}>
        <img 
          id="schoolLogo"
          src="/escola-estadual-logo.png" 
          alt="Escola Estadual Padre João Tomes"
          className="w-full max-h-40 object-contain mb-6"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
                placeholder="Digite o título da sua pesquisa"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="introduction">Introdução (máximo 5 linhas)</Label>
              <Textarea
                id="introduction"
                name="introduction"
                placeholder="Escreva uma breve introdução sobre sua pesquisa"
                value={formData.introduction}
                onChange={handleInputChange}
                className="mt-1 h-32"
                maxLength={500}
              />
            </div>

            <div>
              <Label htmlFor="objectives">Objetivos (máximo 5 linhas)</Label>
              <Textarea
                id="objectives"
                name="objectives"
                placeholder="Liste os objetivos principais da sua pesquisa"
                value={formData.objectives}
                onChange={handleInputChange}
                className="mt-1 h-32"
                maxLength={500}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="methods">Materiais e Métodos (máximo 10 linhas)</Label>
              <Textarea
                id="methods"
                name="methods"
                placeholder="Descreva os materiais e métodos utilizados na pesquisa"
                value={formData.methods}
                onChange={handleInputChange}
                className="mt-1 h-48"
                maxLength={1000}
              />
            </div>

            <div>
              <Label>Imagens (máximo 2)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1"
                disabled={formData.images.length >= 2}
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                {imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="expectedResults">Resultados Esperados</Label>
              <Textarea
                id="expectedResults"
                name="expectedResults"
                placeholder="Descreva os resultados que você espera obter com a pesquisa"
                value={formData.expectedResults}
                onChange={handleInputChange}
                className="mt-1 h-32"
              />
            </div>

            <div>
              <Label htmlFor="bibliography">Referências Bibliográficas</Label>
              <Textarea
                id="bibliography"
                name="bibliography"
                placeholder="Liste as referências bibliográficas utilizadas"
                value={formData.bibliography}
                onChange={handleInputChange}
                className="mt-1 h-32"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button onClick={downloadAsPDF}>
            Baixar PDF
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BannerForm;