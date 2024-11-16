import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from 'sonner';
import BannerHeader from './BannerHeader';
import BannerInputs from './BannerInputs';
import ImageUpload from './ImageUpload';
import { generateBannerDocx } from '@/utils/docxGenerator';

interface FormData {
  title: string;
  introduction: string;
  objectives: string;
  methods: string;
  expectedResults: string;
  bibliography: string;
  images: File[];
  imageCaptions: string[];
  logo?: File;
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
    imageCaptions: [],
    logo: undefined,
  });

  const [title, setTitle] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const formRef = useRef<HTMLDivElement>(null);

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
    const newCaptions = [...formData.imageCaptions, ...Array(files.length).fill('')];
    setFormData((prev) => ({ 
      ...prev, 
      images: newImages,
      imageCaptions: newCaptions,
    }));

    const newUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls((prev) => [...prev, ...newUrls]);
  };

  const handleCaptionChange = (index: number, caption: string) => {
    setFormData((prev) => {
      const newCaptions = [...prev.imageCaptions];
      newCaptions[index] = caption;
      return { ...prev, imageCaptions: newCaptions };
    });
  };

  const handleLogoUpload = (file: File) => {
    setFormData((prev) => ({ ...prev, logo: file }));
  };

  const downloadAsDocx = async () => {
    try {
      console.log('Iniciando geração do DOCX...', formData);
      const blob = await generateBannerDocx(formData);
      console.log('DOCX gerado com sucesso');
      
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
      console.error('Erro ao gerar DOCX:', error);
      toast.error("Erro ao gerar DOCX. Por favor, tente novamente.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-6 space-y-8" ref={formRef}>
        <BannerHeader 
          title={title} 
          setTitle={handleTitleChange} 
          onLogoUpload={handleLogoUpload}
        />
        <BannerInputs formData={formData} handleInputChange={handleInputChange} />
        <ImageUpload 
          handleImageUpload={handleImageUpload} 
          imageUrls={imageUrls} 
          maxImages={2}
          imageCaptions={formData.imageCaptions}
          onCaptionChange={handleCaptionChange}
        />
        <div className="flex justify-end space-x-4">
          <Button onClick={downloadAsDocx} variant="outline">
            Baixar DOCX
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BannerForm;