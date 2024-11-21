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
  onCaptionChange,
  onImageInsert,
  errors
}: BannerInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="authors" className="font-semibold">Autores</Label>
          <FormattedTextArea
            id="authors"
            name="authors"
            placeholder="Liste os autores principais (2-3 linhas). Ex: João Silva¹, Maria Souza², Carlos Oliveira³"
            value={formData.authors}
            onChange={handleInputChange}
            height="h-24"
            maxLines={3}
            fontSize="text-sm"
            className={errors.authors ? "bg-red-50" : ""}
          />
        </div>

        <div>
          <Label htmlFor="institution" className="font-semibold">Instituição</Label>
          <FormattedTextArea
            id="institution"
            name="institution"
            placeholder="Nome da instituição e e-mail de contato (opcional) - 2 linhas máximo"
            value={formData.institution}
            onChange={handleInputChange}
            height="h-20"
            maxLines={2}
            fontSize="text-sm"
            className={errors.institution ? "bg-red-50" : ""}
          />
        </div>

        <div>
          <Label htmlFor="introduction" className="font-semibold">Introdução</Label>
          <FormattedTextArea
            id="introduction"
            name="introduction"
            placeholder="Contextualize o problema da pesquisa. Use parágrafos curtos ou tópicos (8-10 linhas)"
            value={formData.introduction}
            onChange={handleInputChange}
            height="h-40"
            maxLines={10}
            fontSize="text-sm"
            className={errors.introduction ? "bg-red-50" : ""}
          />
        </div>

        <div>
          <Label htmlFor="objective" className="font-semibold">Objetivo</Label>
          <FormattedTextArea
            id="objective"
            name="objective"
            placeholder="Descreva o objetivo principal da pesquisa de forma clara e direta. Limite-se a 1-2 linhas, usando frases curtas e objetivas."
            value={formData.objective}
            onChange={handleInputChange}
            height="h-20"
            maxLines={2}
            fontSize="text-sm"
            className={errors.objective ? "bg-red-50" : ""}
          />
        </div>

        <div>
          <Label htmlFor="methodology" className="font-semibold">Metodologia</Label>
          <FormattedTextArea
            id="methodology"
            name="methodology"
            placeholder="Descreva os métodos utilizados na pesquisa de forma clara e objetiva (6-8 linhas)"
            value={formData.methodology}
            onChange={handleInputChange}
            height="h-32"
            maxLines={8}
            fontSize="text-sm"
            className={errors.methodology ? "bg-red-50" : ""}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="resultsAndDiscussion" className="font-semibold">Resultados e Discussão</Label>
          <FormattedTextArea
            id="resultsAndDiscussion"
            name="resultsAndDiscussion"
            placeholder="Apresente os principais resultados e sua análise (10-12 linhas). Você pode adicionar até 2 imagens/gráficos que ocupem no máximo 1/3 da página"
            value={formData.resultsAndDiscussion}
            onChange={handleInputChange}
            height="h-48"
            maxLines={12}
            fontSize="text-sm"
            className={errors.resultsAndDiscussion ? "bg-red-50" : ""}
          />
          <ImageUpload
            handleImageUpload={handleImageUpload}
            imageUrls={imageUrls}
            maxImages={2}
            imageCaptions={imageCaptions}
            onCaptionChange={onCaptionChange}
            onImageInsert={onImageInsert}
          />
        </div>

        <div>
          <Label htmlFor="conclusion" className="font-semibold">Conclusão</Label>
          <FormattedTextArea
            id="conclusion"
            name="conclusion"
            placeholder="Resuma as principais descobertas e sua relevância (6-8 linhas)"
            value={formData.conclusion}
            onChange={handleInputChange}
            height="h-32"
            maxLines={8}
            fontSize="text-sm"
            className={errors.conclusion ? "bg-red-50" : ""}
          />
        </div>

        <div>
          <Label htmlFor="references" className="font-semibold">Referências</Label>
          <FormattedTextArea
            id="references"
            name="references"
            placeholder="Liste as referências essenciais seguindo as normas ABNT (4-6 linhas). Ex: SILVA, J. A. Título da obra. São Paulo: Editora XYZ, 2023."
            value={formData.references}
            onChange={handleInputChange}
            height="h-24"
            maxLines={6}
            fontSize="text-sm"
            className={errors.references ? "bg-red-50" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerInputs;