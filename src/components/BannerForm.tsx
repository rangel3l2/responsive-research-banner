import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BannerHeader from './BannerHeader';
import BannerInputs from './BannerInputs';
import LayoutPreview from './LayoutPreview';
import BannerPreview from './BannerPreview';
import { useBannerForm } from '@/hooks/useBannerForm';
import { LayoutType } from '@/utils/bannerLayouts';

const BannerForm = () => {
  const {
    formData,
    errors,
    imageUrls,
    saveStatus,
    handleInputChange,
    handleImageUpload,
    handleCaptionChange,
    handleLogoUpload,
    handleImageInsert,
    downloadAsDocx,
    setFormData,
    loadFormFromCookies,
    resetForm,
  } = useBannerForm();
  
  const formRef = useRef<HTMLDivElement>(null);

  const handleLayoutChange = (layout: LayoutType) => {
    setFormData(prev => ({ ...prev, selectedLayout: layout }));
  };

  const layouts: { value: LayoutType; label: string }[] = [
    { value: 'classic', label: 'Layout Clássico' },
    { value: 'modern', label: 'Layout Moderno' },
    { value: 'zFlow', label: 'Layout em Z' },
    { value: 'circular', label: 'Layout Circular' },
    { value: 'hierarchical', label: 'Layout Hierárquico' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4 flex justify-between items-start">
        <div className="w-[200px]">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                {formData.selectedLayout ? 
                  layouts.find(l => l.value === formData.selectedLayout)?.label : 
                  'Escolha o layout'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <div className="grid grid-cols-2 gap-4 p-4">
                {layouts.map((layout) => (
                  <div
                    key={layout.value}
                    className="cursor-pointer hover:bg-gray-50 p-4 rounded-lg border transition-colors"
                    onClick={() => {
                      handleLayoutChange(layout.value);
                      const closeButton = document.querySelector('[data-dialog-close]') as HTMLButtonElement;
                      if (closeButton) closeButton.click();
                    }}
                  >
                    <h3 className="font-medium mb-2">{layout.label}</h3>
                    <LayoutPreview layout={layout.value} />
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <div className="mt-4">
            <LayoutPreview layout={formData.selectedLayout || 'classic'} />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadFormFromCookies} variant="outline">
            Carregar Dados Salvos
          </Button>
          <Button onClick={resetForm} variant="outline">
            Começar do Zero
          </Button>
          <BannerPreview formData={formData} />
        </div>
      </div>
      <Card className="p-6" ref={formRef}>
        <Tabs defaultValue="header" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="header">Cabeçalho do Banner</TabsTrigger>
            <TabsTrigger value="content">Conteúdo do Banner</TabsTrigger>
          </TabsList>
          
          <TabsContent value="header" className="mt-0">
            <BannerHeader 
              title={formData.title}
              setTitle={(title) => setFormData(prev => ({ ...prev, title }))}
              authors={formData.authors}
              setAuthors={(authors) => setFormData(prev => ({ ...prev, authors }))}
              institution={formData.institution}
              setInstitution={(institution) => setFormData(prev => ({ ...prev, institution }))}
              onLogoUpload={handleLogoUpload}
              errors={errors}
            />
          </TabsContent>
          
          <TabsContent value="content" className="mt-0">
            <BannerInputs 
              formData={formData}
              handleInputChange={handleInputChange}
              handleImageUpload={handleImageUpload}
              imageUrls={imageUrls}
              imageCaptions={formData.imageCaptions}
              onCaptionChange={handleCaptionChange}
              onImageInsert={handleImageInsert}
              errors={errors}
              saveStatus={saveStatus}
            />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end space-x-4 mt-6">
          <Button onClick={downloadAsDocx} variant="outline">
            Baixar DOCX
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BannerForm;