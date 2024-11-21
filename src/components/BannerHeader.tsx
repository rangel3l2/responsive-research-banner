import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormattedTextArea from './FormattedTextArea';
import { toast } from 'sonner';

interface BannerHeaderProps {
  title: string;
  setTitle: (title: string) => void;
  authors: string;
  setAuthors: (authors: string) => void;
  institution: string;
  setInstitution: (institution: string) => void;
  onLogoUpload: (file: File) => void;
  errors?: { [key: string]: boolean };
}

const BannerHeader: React.FC<BannerHeaderProps> = ({ 
  title, 
  setTitle, 
  authors,
  setAuthors,
  institution,
  setInstitution,
  onLogoUpload,
  errors = {}
}) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setLogoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onLogoUpload(file);
      } else {
        toast.error("Por favor, selecione apenas arquivos de imagem.");
      }
    }
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-[10%] relative">
          {logoPreview ? (
            <img 
              src={logoPreview}
              alt="Logo"
              className="w-full object-contain"
            />
          ) : (
            <div className="w-full aspect-square bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
          )}
          <div className="mt-2 relative">
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute -bottom-2 -right-2"
              onClick={() => document.getElementById('logo-upload')?.click()}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="w-[90%] space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da sua pesquisa (máximo 2 linhas)"
            className={`w-full text-2xl font-bold border-none outline-none focus:ring-0 text-center mb-4 ${
              errors.title || !title ? 'bg-red-50' : 'bg-transparent'
            }`}
            style={{ 
              backgroundColor: errors.title || !title ? 'rgb(254 242 242)' : 'transparent',
              lineHeight: '1.2',
              minHeight: '2.4em',
            }}
          />
          <FormattedTextArea
            id="authors"
            name="authors"
            placeholder="Liste os autores principais (Ex: João Silva¹, Maria Souza², Carlos Oliveira³)"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            height="h-12"
            maxLines={2}
            fontSize="text-sm"
            className="text-center"
          />
          <FormattedTextArea
            id="institution"
            name="institution"
            placeholder="¹Universidade Federal (email@inst.br), ²Instituto de Pesquisa, ³Universidade Estadual"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            height="h-16"
            maxLines={3}
            fontSize="text-sm"
            className="text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerHeader;