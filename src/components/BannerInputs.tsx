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
            className="mt-1 h-32 border-none"
            style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
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
            className="mt-1 h-32 border-none"
            style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
          />
        </div>

        <div>
          <Label htmlFor="methods">Materiais e Métodos</Label>
          <Textarea
            id="methods"
            name="methods"
            placeholder="Descreva os materiais e métodos utilizados na pesquisa (máximo 10 linhas)"
            value={formData.methods}
            onChange={(e) => handleTextAreaChange(e, 10, 500)}
            className="mt-1 h-48 border-none"
            style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
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
            onChange={(e) => handleTextAreaChange(e, 10, 500)}
            className="mt-1 h-48 border-none"
            style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
          />
        </div>

        <div>
          <Label htmlFor="expectedResults">Resultados Esperados</Label>
          <Textarea
            id="expectedResults"
            name="expectedResults"
            placeholder="Descreva os resultados que você espera obter com a pesquisa (máximo 5 linhas)"
            value={formData.expectedResults}
            onChange={(e) => handleTextAreaChange(e, 5, 250)}
            className="mt-1 h-32 border-none"
            style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
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
            className="mt-1 h-32 border-none"
            style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerInputs;