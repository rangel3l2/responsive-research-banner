import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BannerHeader from './BannerHeader';
import BannerInputs from './BannerInputs';
import { useBannerForm } from '@/hooks/useBannerForm';

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-4 flex justify-end space-x-2">
        <Button onClick={loadFormFromCookies} variant="outline">
          Carregar Dados Salvos
        </Button>
        <Button onClick={resetForm} variant="outline">
          Começar do Zero
        </Button>
      </div>
      <Card className="p-6 space-y-8" ref={formRef}>
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