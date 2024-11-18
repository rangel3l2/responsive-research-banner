import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageUpload from './ImageUpload';
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline } from "lucide-react";

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

  const applyFormatting = (textAreaId: string, format: 'bold' | 'italic' | 'underline') => {
    const textarea = document.getElementById(textAreaId) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let formattedText = '';

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `_${selectedText}_`;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        break;
    }

    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    const event = {
      target: {
        name: textarea.name,
        value: newValue
      }
    } as React.ChangeEvent<HTMLTextAreaElement>;
    handleInputChange(event);
  };

  const TextAreaWithFormatting = ({ 
    id, 
    name, 
    placeholder, 
    value, 
    onChange, 
    maxLines, 
    maxChars, 
    height 
  }: { 
    id: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    maxLines: number;
    maxChars: number;
    height: string;
  }) => (
    <div className="space-y-2">
      <div className="flex gap-1 items-center bg-gray-50 p-1 rounded-t-md border border-b-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => applyFormatting(id, 'bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => applyFormatting(id, 'italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => applyFormatting(id, 'underline')}
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        className={`mt-0 rounded-t-none ${height} whitespace-pre-line`}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="introduction">Introdução</Label>
          <TextAreaWithFormatting
            id="introduction"
            name="introduction"
            placeholder="Escreva uma breve introdução sobre sua pesquisa (máximo 5 linhas)"
            value={formData.introduction}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            maxLines={5}
            maxChars={250}
            height="h-32"
          />
        </div>

        <div>
          <Label htmlFor="objectives">Objetivos</Label>
          <TextAreaWithFormatting
            id="objectives"
            name="objectives"
            placeholder="Liste os objetivos principais da sua pesquisa (máximo 5 linhas)"
            value={formData.objectives}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            maxLines={5}
            maxChars={250}
            height="h-32"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="methods">Materiais e Métodos</Label>
          <TextAreaWithFormatting
            id="methods"
            name="methods"
            placeholder="Descreva os materiais e métodos utilizados na pesquisa"
            value={formData.methods}
            onChange={(e) => handleTextAreaChange(e, 20, 1000)}
            maxLines={20}
            maxChars={1000}
            height="h-96"
          />
          <ImageUpload 
            handleImageUpload={handleImageUpload}
            imageUrls={imageUrls}
            maxImages={2}
            imageCaptions={imageCaptions}
            onCaptionChange={onCaptionChange}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="expectedResults">Resultados Esperados</Label>
          <TextAreaWithFormatting
            id="expectedResults"
            name="expectedResults"
            placeholder="Descreva os resultados que você espera obter com a pesquisa (máximo 5 linhas)"
            value={formData.expectedResults}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            maxLines={5}
            maxChars={250}
            height="h-32"
          />
        </div>

        <div>
          <Label htmlFor="bibliography">Referências Bibliográficas</Label>
          <TextAreaWithFormatting
            id="bibliography"
            name="bibliography"
            placeholder="Liste as referências bibliográficas utilizadas (máximo 5 linhas)"
            value={formData.bibliography}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            maxLines={5}
            maxChars={250}
            height="h-32"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerInputs;