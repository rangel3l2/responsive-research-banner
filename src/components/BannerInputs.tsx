import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageUpload from './ImageUpload';

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

  const insertImageMarker = () => {
    const textarea = document.getElementById('methods') as HTMLTextAreaElement;
    if (textarea) {
      const cursorPosition = textarea.selectionStart;
      const currentValue = textarea.value;
      const newValue = currentValue.slice(0, cursorPosition) + '[IMG]' + currentValue.slice(cursorPosition);
      const event = {
        target: {
          name: 'methods',
          value: newValue
        }
      } as React.ChangeEvent<HTMLTextAreaElement>;
      handleInputChange(event);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="introduction">Introdução</Label>
          <Textarea
            id="introduction"
            name="introduction"
            placeholder="Escreva uma breve introdução sobre sua pesquisa (máximo 5 linhas)"
            value={formData.introduction}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            className="mt-1 h-32 whitespace-pre-line"
          />
        </div>

        <div>
          <Label htmlFor="objectives">Objetivos</Label>
          <Textarea
            id="objectives"
            name="objectives"
            placeholder="Liste os objetivos principais da sua pesquisa (máximo 5 linhas)"
            value={formData.objectives}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            className="mt-1 h-32 whitespace-pre-line"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="methods">Materiais e Métodos</Label>
          <div className="flex gap-2 items-center">
            <Textarea
              id="methods"
              name="methods"
              placeholder="Descreva os materiais e métodos utilizados na pesquisa"
              value={formData.methods}
              onChange={(e) => handleTextAreaChange(e, 20, 1000)}
              className="mt-1 h-96 whitespace-pre-line"
            />
          </div>
          <ImageUpload 
            handleImageUpload={handleImageUpload}
            imageUrls={imageUrls}
            maxImages={2}
            imageCaptions={imageCaptions}
            onCaptionChange={onCaptionChange}
            onImageInsert={insertImageMarker}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="expectedResults">Resultados Esperados</Label>
          <Textarea
            id="expectedResults"
            name="expectedResults"
            placeholder="Descreva os resultados que você espera obter com a pesquisa (máximo 5 linhas)"
            value={formData.expectedResults}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            className="mt-1 h-32 whitespace-pre-line"
          />
        </div>

        <div>
          <Label htmlFor="bibliography">Referências Bibliográficas</Label>
          <Textarea
            id="bibliography"
            name="bibliography"
            placeholder="Liste as referências bibliográficas utilizadas (máximo 5 linhas)"
            value={formData.bibliography}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            className="mt-1 h-32 whitespace-pre-line"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerInputs;