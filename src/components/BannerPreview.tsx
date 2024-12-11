import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { BannerFormData } from '@/models/formData';
import { LayoutType } from '@/utils/bannerLayouts';

interface BannerPreviewProps {
  formData: BannerFormData;
}

const BannerPreview: React.FC<BannerPreviewProps> = ({ formData }) => {
  const getLayoutPreviewStyle = (layout: LayoutType): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      minHeight: '400px',
      width: '100%',
      position: 'relative',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0',
      aspectRatio: '1.4142', // Proporção A4
    };

    switch (layout) {
      case 'classic':
        return {
          ...baseStyle,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
        };
      case 'modern':
        return {
          ...baseStyle,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '1.5rem',
        };
      case 'zFlow':
        return {
          ...baseStyle,
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        };
      case 'circular':
        return {
          ...baseStyle,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        };
      case 'hierarchical':
        return {
          ...baseStyle,
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        };
      default:
        return baseStyle;
    }
  };

  const renderContent = () => {
    switch (formData.selectedLayout) {
      case 'classic':
        return (
          <div style={getLayoutPreviewStyle('classic')}>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold mb-2">Introdução</h3>
                <div dangerouslySetInnerHTML={{ __html: formData.introduction }} />
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold mb-2">Objetivo</h3>
                <div dangerouslySetInnerHTML={{ __html: formData.objective }} />
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold mb-2">Metodologia</h3>
                <div dangerouslySetInnerHTML={{ __html: formData.methodology }} />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold mb-2">Resultados e Discussão</h3>
                <div dangerouslySetInnerHTML={{ __html: formData.resultsAndDiscussion }} />
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold mb-2">Conclusão</h3>
                <div dangerouslySetInnerHTML={{ __html: formData.conclusion }} />
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-bold mb-2">Referências</h3>
                <div dangerouslySetInnerHTML={{ __html: formData.references }} />
              </div>
            </div>
          </div>
        );
      // Outros layouts seguem o mesmo padrão, adaptados para suas características específicas
      default:
        return (
          <div className="p-4 text-center">
            <p>Selecione um layout para visualizar a prévia</p>
          </div>
        );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Eye className="w-4 h-4" />
          Prévia do Banner
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto bg-gray-100 p-8">
        <DialogHeader>
          <DialogTitle>Prévia do Banner - {formData.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-white p-8 rounded-lg shadow-lg mb-4" style={{ maxWidth: '210mm', margin: '0 auto' }}>
            <h2 className="text-xl font-bold mb-2">{formData.title}</h2>
            <p className="text-gray-700">{formData.authors}</p>
            <p className="text-gray-600">{formData.institution}</p>
          </div>
          {renderContent()}
          {formData.acknowledgments && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2">Agradecimentos</h3>
              <div dangerouslySetInnerHTML={{ __html: formData.acknowledgments }} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BannerPreview;