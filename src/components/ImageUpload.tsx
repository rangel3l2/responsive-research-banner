import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrls: string[];
  maxImages: number;
}

const ImageUpload = ({ handleImageUpload, imageUrls, maxImages }: ImageUploadProps) => {
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
          <img
            key={index}
            src={url}
            alt={`Imagem ${index + 1}`}
            className="w-full h-48 object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;