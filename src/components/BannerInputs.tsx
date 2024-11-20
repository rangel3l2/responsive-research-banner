import React from 'react';
import { Label } from "@/components/ui/label";
import ImageUpload from './ImageUpload';
import FormattedTextArea from './FormattedTextArea';
import { BannerInputsProps } from '@/models/formData';

const BannerInputs = ({
  formData,
  handleInputChange,
  handleImageUpload,
  imageUrls,
  imageCaptions,
  onCaptionChange
}: BannerInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="authors">Autores</Label>
          <FormattedTextArea
            id="authors"
            name="authors"
            placeholder="Liste os autores principais (2-3 linhas). Ex: João Silva¹, Maria Souza², Carlos Oliveira³"
            value={formData.authors}
            onChange={handleInputChange}
            height="h-20"
            maxLines={3}
            fontSize="text-xs"
          />
        </div>

        <div>
          <Label htmlFor="institution">Instituição</Label>
          <FormattedTextArea
            id="institution"
            name="institution"
            placeholder="Nome da instituição e e-mail de contato (opcional) - 2 linhas máximo"
            value={formData.institution}
            onChange={handleInputChange}
            height="h-16"
            maxLines={2}
            fontSize="text-xs"
          />
        </div>

        <div>
          <Label htmlFor="introduction">Introdução</Label>
          <FormattedTextArea
            id="introduction"
            name="introduction"
            placeholder="Contextualize o problema e apresente o objetivo da pesquisa. Use parágrafos curtos ou tópicos (8-10 linhas)"
            value={formData.introduction}
            onChange={handleInputChange}
            height="h-40"
            maxLines={10}
            fontSize="text-xs"
          />
        </div>

        <div>
          <Label htmlFor="methodology">Metodologia</Label>
          <FormattedTextArea
            id="methodology"
            name="methodology"
            placeholder="Descreva os métodos utilizados na pesquisa de forma clara e objetiva (6-8 linhas)"
            value={formData.methodology}
            onChange={handleInputChange}
            height="h-32"
            maxLines={8}
            fontSize="text-xs"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="resultsAndDiscussion">Resultados e Discussão</Label>
          <FormattedTextArea
            id="resultsAndDiscussion"
            name="resultsAndDiscussion"
            placeholder="Apresente os principais resultados e sua análise (10-12 linhas). Você pode adicionar até 2 imagens/gráficos que ocupem no máximo 1/3 da página"
            value={formData.resultsAndDiscussion}
            onChange={handleInputChange}
            height="h-48"
            maxLines={12}
            fontSize="text-xs"
          />
          <ImageUpload
            handleImageUpload={handleImageUpload}
            imageUrls={imageUrls}
            maxImages={2}
            imageCaptions={imageCaptions}
            onCaptionChange={onCaptionChange}
            onImageInsert={() => {}}
          />
        </div>

        <div>
          <Label htmlFor="conclusion">Conclusão</Label>
          <FormattedTextArea
            id="conclusion"
            name="conclusion"
            placeholder="Resuma as principais descobertas e sua relevância (6-8 linhas)"
            value={formData.conclusion}
            onChange={handleInputChange}
            height="h-32"
            maxLines={8}
            fontSize="text-xs"
          />
        </div>

        <div>
          <Label htmlFor="references">Referências</Label>
          <FormattedTextArea
            id="references"
            name="references"
            placeholder="Liste as referências essenciais seguindo as normas ABNT (4-6 linhas). Ex: SILVA, J. A. Título da obra. São Paulo: Editora XYZ, 2023."
            value={formData.references}
            onChange={handleInputChange}
            height="h-24"
            maxLines={6}
            fontSize="text-[8px]"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerInputs;