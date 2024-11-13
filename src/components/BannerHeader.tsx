import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BannerHeader = () => {
  const [useCustomLogo, setUseCustomLogo] = useState(false);
  const [customLogo, setCustomLogo] = useState<string>('');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCustomLogo(URL.createObjectURL(file));
      setUseCustomLogo(true);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-[10%] relative">
        <img 
          src={useCustomLogo ? customLogo : "/escola-estadual-logo.png"}
          alt="Logo"
          className="w-full object-contain"
        />
        <div className="mt-2">
          <Label htmlFor="logo-upload" className="text-xs">Alterar logo</Label>
          <Input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="text-xs"
          />
        </div>
      </div>
      <input
        type="text"
        placeholder="Digite o título da sua pesquisa"
        className="w-[90%] text-3xl font-bold border-none outline-none focus:ring-0 text-center"
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
};

export default BannerHeader;