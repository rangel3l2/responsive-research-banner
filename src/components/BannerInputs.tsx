import React from 'react';
import { Label } from "@/components/ui/label";
import ImageUpload from './ImageUpload';
import FormattedTextArea from './FormattedTextArea';

interface BannerInputsProps {
  formData: {
    title: string;
    introduction: string;
    objectives: string;
    methods: string;
    expectedResults: string;
    bibliography: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrls: string[];
  imageCaptions: string[];
  onCaptionChange: (index: number, caption: string) => void;
}

const BannerInputs = ({
  formData,
  handleInputChange,
  handleImageUpload,
  imageUrls,
  imageCaptions,
  onCaptionChange
}: BannerInputsProps) => {
  const handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    maxLines: number,
    maxChars: number
  ) => {
    const lines = e.target.value.split('\n');
    if (lines.length > maxLines) {
      e.target.value = lines.slice(0, maxLines).join('\n');
    }
    if (e.target.value.length > maxChars) {
      e.target.value = e.target.value.slice(0, maxChars);
    }
    handleInputChange(e);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="introduction">Introdução</Label>
          <FormattedTextArea
            id="introduction"
            name="introduction"
            placeholder="Escreva uma breve introdução sobre sua pesquisa (máximo 5 linhas)"
            value={formData.introduction}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            height="h-32"
          />
        </div>

        <div>
          <Label htmlFor="objectives">Objetivos</Label>
          <FormattedTextArea
            id="objectives"
            name="objectives"
            placeholder="Liste os objetivos principais da sua pesquisa (máximo 5 linhas)"
            value={formData.objectives}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            height="h-32"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="methods">Materiais e Métodos</Label>
          <FormattedTextArea
            id="methods"
            name="methods"
            placeholder="Descreva os materiais e métodos utilizados na pesquisa"
            value={formData.methods}
            onChange={(e) => handleTextAreaChange(e, 20, 1000)}
            height="h-96"
          />
          <ImageUpload
            handleImageUpload={handleImageUpload}
            imageUrls={imageUrls}
            maxImages={2}
            imageCaptions={imageCaptions}
            onCaptionChange={onCaptionChange}
            onImageInsert={() => {}} // Add empty function to satisfy TypeScript
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="expectedResults">Resultados Esperados</Label>
          <FormattedTextArea
            id="expectedResults"
            name="expectedResults"
            placeholder="Descreva os resultados que você espera obter com a pesquisa (máximo 5 linhas)"
            value={formData.expectedResults}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            height="h-32"
          />
        </div>

        <div>
          <Label htmlFor="bibliography">Referências Bibliográficas</Label>
          <FormattedTextArea
            id="bibliography"
            name="bibliography"
            placeholder="Liste as referências bibliográficas utilizadas (máximo 5 linhas)"
            value={formData.bibliography}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            height="h-32"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerInputs;