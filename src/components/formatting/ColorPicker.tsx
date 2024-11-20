import React from 'react';
import { Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  currentColor: string;
  onColorSelect: (color: string) => void;
  isActive: boolean;
}

const ColorPicker = ({ currentColor, onColorSelect, isActive }: ColorPickerProps) => {
  const colors = [
    { name: 'Preto', hex: '#000000' },
    { name: 'Azul', hex: '#2563eb' },
    { name: 'Verde', hex: '#16a34a' },
    { name: 'Vermelho', hex: '#dc2626' },
    { name: 'Roxo', hex: '#7e22ce' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant={isActive ? "default" : "ghost"}
          size="sm"
          className={`h-6 w-6 p-1 ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`}
          style={{ color: currentColor }}
          title="Cor do texto"
        >
          <Palette className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 p-2">
        <div className="grid grid-cols-5 gap-1">
          {colors.map((color) => (
            <button
              key={color.hex}
              onClick={() => onColorSelect(color.hex)}
              className="w-5 h-5 rounded-full border border-gray-200 hover:scale-110 transition-transform"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColorPicker;