import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrls: string[];
  maxImages: number;
  imageCaptions: string[];
  onCaptionChange: (index: number, caption: string) => void;
  onImageInsert: () => void;
}

const ImageUpload = ({ 
  handleImageUpload, 
  imageUrls = [], 
  maxImages,
  imageCaptions = [],
  onCaptionChange,
  onImageInsert,
}: ImageUploadProps) => {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Label>Imagens (máximo {maxImages})</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1"
            disabled={imageUrls?.length >= maxImages}
          />
        </div>
        <Button 
          type="button" 
          onClick={onImageInsert}
          variant="outline"
          className="mt-6"
        >
          Inserir Imagem no Texto
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {imageUrls?.map((url, index) => (
          <div key={index} className="space-y-2">
            <img
              src={url}
              alt={`Imagem ${index + 1}`}
              className="w-full h-48 object-cover rounded-md"
            />
            <Textarea
              placeholder={`Legenda para imagem ${index + 1}`}
              value={imageCaptions[index] || ''}
              onChange={(e) => onCaptionChange(index, e.target.value)}
              className="mt-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;