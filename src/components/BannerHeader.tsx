import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormattedTextArea from './FormattedTextArea';

interface BannerHeaderProps {
  title: string;
  setTitle: (title: string) => void;
  authors: string;
  setAuthors: (authors: string) => void;
  institution: string;
  setInstitution: (institution: string) => void;
  onLogoUpload: (file: File) => void;
}

const BannerHeader: React.FC<BannerHeaderProps> = ({ 
  title, 
  setTitle, 
  authors,
  setAuthors,
  institution,
  setInstitution,
  onLogoUpload 
}) => {
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoUpload(file);
    }
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-[10%] relative">
          <img 
            src="/escola-estadual-logo.png"
            alt="Logo"
            className="w-full object-contain"
          />
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
            className="w-full text-2xl font-bold border-none outline-none focus:ring-0 text-center mb-4"
            style={{ 
              backgroundColor: 'transparent',
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