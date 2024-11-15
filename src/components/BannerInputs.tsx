import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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
}

const BannerInputs = ({ formData, handleInputChange }: BannerInputsProps) => {
  const textareaStyle: React.CSSProperties = {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontSize: '16px',
    lineHeight: '1.5',
    padding: '8px',
    width: '44%',
    height: 'auto',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, maxLines: number) => {
    const lines = e.currentTarget.value.split('\n');
    if (lines.length >= maxLines && e.key === 'Enter') {
      e.preventDefault();
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
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 5)}
            className="mt-1 h-32"
            maxLength={500}
            style={textareaStyle}
          />
        </div>

        <div>
          <Label htmlFor="objectives">Objetivos</Label>
          <Textarea
            id="objectives"
            name="objectives"
            placeholder="Liste os objetivos principais da sua pesquisa (máximo 5 linhas)"
            value={formData.objectives}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 5)}
            className="mt-1 h-32"
            maxLength={500}
            style={textareaStyle}
          />
        </div>

        <div>
          <Label htmlFor="methods">Materiais e Métodos</Label>
          <Textarea
            id="methods"
            name="methods"
            placeholder="Descreva os materiais e métodos utilizados na pesquisa (máximo 10 linhas)"
            value={formData.methods}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 10)}
            className="mt-1 h-48"
            maxLength={1000}
            style={textareaStyle}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="methods-continuation">Materiais e Métodos (continuação)</Label>
          <Textarea
            id="methods-continuation"
            name="methods"
            placeholder="Continue a descrição dos materiais e métodos"
            value={formData.methods}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 10)}
            className="mt-1 h-48"
            maxLength={1000}
            style={textareaStyle}
          />
        </div>

        <div>
          <Label htmlFor="expectedResults">Resultados Esperados</Label>
          <Textarea
            id="expectedResults"
            name="expectedResults"
            placeholder="Descreva os resultados que você espera obter com a pesquisa"
            value={formData.expectedResults}
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e, 5)}
            className="mt-1 h-32"
            style={textareaStyle}
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
            onKeyDown={(e) => handleKeyDown(e, 5)}
            className="mt-1 h-32"
            style={textareaStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerInputs;