import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ImageUploadProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrls: string[];
  maxImages: number;
  imageCaptions: string[];
  onCaptionChange: (index: number, caption: string) => void;
}

const ImageUpload = ({ 
  handleImageUpload, 
  imageUrls, 
  maxImages,
  imageCaptions,
  onCaptionChange,
}: ImageUploadProps) => {
  return (
    <div className="mt-4">
      <Label>Imagens (máximo {maxImages})</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mt-1"
        disabled={imageUrls.length >= maxImages}
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="space-y-2">
            <img
              src={url}
              alt={`Imagem ${index + 1}`}
              className="w-full h-48 object-cover rounded-md"
            />
            <Textarea
              placeholder={`Legenda para imagem ${index + 1}`}
              value={imageCaptions[index]}
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