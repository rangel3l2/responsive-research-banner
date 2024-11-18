import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BannerHeaderProps {
  title: string;
  setTitle: (title: string) => void;
  onLogoUpload: (file: File) => void;
}

const BannerHeader: React.FC<BannerHeaderProps> = ({ title, setTitle, onLogoUpload }) => {
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onLogoUpload(file);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
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
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite o título da sua pesquisa"
        className="w-[90%] text-3xl font-bold border-none outline-none focus:ring-0 text-center"
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
};

export default BannerHeader;