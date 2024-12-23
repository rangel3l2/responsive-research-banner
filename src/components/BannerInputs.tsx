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
  errors,
  saveStatus
}: BannerInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="space-y-8 flex flex-col">
        <div className="space-y-2 flex-grow">
          <Label htmlFor="introduction" className="font-semibold block">Introdução</Label>
          <FormattedTextArea
            id="introduction"
            name="introduction"
            placeholder="Contextualize o problema da pesquisa. Use parágrafos curtos ou tópicos (8-10 linhas)"
            value={formData.introduction}
            onChange={handleInputChange}
            height="h-40"
            maxLines={10}
            fontSize="text-sm"
            className={`${errors.introduction ? "bg-red-50" : ""} mb-4`}
            saveStatus={saveStatus}
          />
        </div>

        <div className="space-y-2 flex-grow">
          <Label htmlFor="objective" className="font-semibold block">Objetivo</Label>
          <FormattedTextArea
            id="objective"
            name="objective"
            placeholder="Descreva o objetivo principal da pesquisa de forma clara e direta. Limite-se a 1-2 linhas, usando frases curtas e objetivas."
            value={formData.objective}
            onChange={handleInputChange}
            height="h-20"
            maxLines={2}
            fontSize="text-sm"
            className={`${errors.objective ? "bg-red-50" : ""} mb-4`}
            saveStatus={saveStatus}
          />
        </div>

        <div className="space-y-2 flex-grow">
          <Label htmlFor="methodology" className="font-semibold block">Metodologia</Label>
          <FormattedTextArea
            id="methodology"
            name="methodology"
            placeholder="Descreva os métodos utilizados na pesquisa de forma clara e objetiva (6-8 linhas)"
            value={formData.methodology}
            onChange={handleInputChange}
            height="h-32"
            maxLines={8}
            fontSize="text-sm"
            className={`${errors.methodology ? "bg-red-50" : ""} mb-4`}
            saveStatus={saveStatus}
          />
        </div>
      </div>

      <div className="space-y-8 flex flex-col">
        <div className="space-y-2 flex-grow">
          <Label htmlFor="resultsAndDiscussion" className="font-semibold block">Resultados e Discussão</Label>
          <FormattedTextArea
            id="resultsAndDiscussion"
            name="resultsAndDiscussion"
            placeholder="Apresente os principais resultados e sua análise (10-12 linhas). Você pode adicionar até 2 imagens/gráficos que ocupem no máximo 1/3 da página"
            value={formData.resultsAndDiscussion}
            onChange={handleInputChange}
            height="h-48"
            maxLines={12}
            fontSize="text-sm"
            className={`${errors.resultsAndDiscussion ? "bg-red-50" : ""} mb-4`}
            saveStatus={saveStatus}
          />
          <div className="mt-4">
            <ImageUpload
              handleImageUpload={handleImageUpload}
              imageUrls={imageUrls}
              maxImages={2}
              imageCaptions={imageCaptions}
              onCaptionChange={onCaptionChange}
              onImageInsert={onImageInsert}
            />
          </div>
        </div>

        <div className="space-y-2 flex-grow">
          <Label htmlFor="conclusion" className="font-semibold block">Conclusão</Label>
          <FormattedTextArea
            id="conclusion"
            name="conclusion"
            placeholder="Resuma as principais descobertas e sua relevância (6-8 linhas)"
            value={formData.conclusion}
            onChange={handleInputChange}
            height="h-32"
            maxLines={8}
            fontSize="text-sm"
            className={`${errors.conclusion ? "bg-red-50" : ""} mb-4`}
            saveStatus={saveStatus}
          />
        </div>

        {/* Optional Acknowledgments section - only shows if it has content */}
        {(formData.acknowledgments || '').trim() !== '' && (
          <div className="space-y-2 flex-grow">
            <Label htmlFor="acknowledgments" className="font-semibold block">Agradecimentos</Label>
            <FormattedTextArea
              id="acknowledgments"
              name="acknowledgments"
              placeholder="Adicione seus agradecimentos (máximo 5 linhas)"
              value={formData.acknowledgments || ''}
              onChange={handleInputChange}
              height="h-24"
              maxLines={5}
              fontSize="text-sm"
              className={`${errors.acknowledgments ? "bg-red-50" : ""} mb-4`}
              saveStatus={saveStatus}
            />
          </div>
        )}

        <div className="space-y-2 flex-grow">
          <Label htmlFor="references" className="font-semibold block">Referências</Label>
          <FormattedTextArea
            id="references"
            name="references"
            placeholder="Liste as referências essenciais seguindo as normas ABNT (4-6 linhas). Ex: SILVA, J. A. Título da obra. São Paulo: Editora XYZ, 2023."
            value={formData.references}
            onChange={handleInputChange}
            height="h-24"
            maxLines={6}
            fontSize="text-sm"
            className={`${errors.references ? "bg-red-50" : ""} mb-4`}
            saveStatus={saveStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default BannerInputs;