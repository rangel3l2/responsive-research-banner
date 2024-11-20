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
            placeholder="Nome dos autores (2-3 linhas)"
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
            placeholder="Nome da instituição"
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
            placeholder="Contextualização e objetivo (8-10 linhas)"
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
            placeholder="Descreva a metodologia (6-8 linhas)"
            value={formData.methodology}
            onChange={handleInputChange}
            height="h-32"
            maxLines={8}
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
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="resultsAndDiscussion">Resultados e Discussão</Label>
          <FormattedTextArea
            id="resultsAndDiscussion"
            name="resultsAndDiscussion"
            placeholder="Resultados e discussão (10-12 linhas)"
            value={formData.resultsAndDiscussion}
            onChange={handleInputChange}
            height="h-48"
            maxLines={12}
            fontSize="text-xs"
          />
        </div>

        <div>
          <Label htmlFor="conclusion">Conclusão</Label>
          <FormattedTextArea
            id="conclusion"
            name="conclusion"
            placeholder="Conclusões principais (6-8 linhas)"
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
            placeholder="Referências bibliográficas (4-6 linhas)"
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