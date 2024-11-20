import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

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
          <div className="flex items-center gap-2 mt-1">
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={imageUrls?.length >= maxImages}
              />
              <Button
                type="button"
                variant="outline"
                className="relative"
                disabled={imageUrls?.length >= maxImages}
              >
                <Image className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              type="button" 
              onClick={onImageInsert}
              variant="outline"
              disabled={imageUrls.length === 0}
            >
              Inserir Imagem no Texto
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {imageUrls?.map((url, index) => (
          <div key={index} className="space-y-2">
            <img
              src={url}
              alt={`Imagem ${index + 1}`}
              className="w-full h-48 object-contain rounded-md"
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