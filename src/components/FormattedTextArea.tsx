import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Bold, Italic, Underline, List, Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface FormattedTextAreaProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  height: string;
  maxLines: number;
  fontSize: string;
  className?: string;
}

const FormattedTextArea: React.FC<FormattedTextAreaProps> = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  height,
  maxLines,
  fontSize,
  className = "",
}) => {
  const [currentColor, setCurrentColor] = useState('#000000');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [formattedHtml, setFormattedHtml] = useState('');

  const colors = [
    { name: 'Preto', hex: '#000000' },
    { name: 'Azul', hex: '#2563eb' },
    { name: 'Verde', hex: '#16a34a' },
    { name: 'Vermelho', hex: '#dc2626' },
    { name: 'Roxo', hex: '#7e22ce' },
  ];

  useEffect(() => {
    // Convert markdown-like syntax to HTML for display
    let html = value
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/__(.+?)__/g, '<u>$1</u>')
      .replace(/•\s(.*)/g, '<li>$1</li>')
      .replace(/\{color:(#[0-9a-f]{6})\}(.*?)\{\/color\}/gi, '<span style="color: $1">$2</span>');

    setFormattedHtml(html);
  }, [value]);

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start !== end) {
      insertFormatting(textarea, start, end);
    }
  };

  const insertFormatting = (textarea: HTMLTextAreaElement, start: number, end: number) => {
    const selectedText = value.substring(start, end);
    let formattedText = selectedText;

    const format = textarea.dataset.format;
    if (!format) return;

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `_${selectedText}_`;
        break;
      case 'underline':
        formattedText = `__${selectedText}__`;
        break;
      case 'list':
        formattedText = selectedText
          .split('\n')
          .map(line => `• ${line}`)
          .join('\n');
        break;
      case 'color':
        formattedText = `{color:${currentColor}}${selectedText}{/color}`;
        break;
    }

    const newValue = value.substring(0, start) + formattedText + value.substring(end);
    const event = {
      target: {
        name,
        value: newValue
      }
    } as ChangeEvent<HTMLTextAreaElement>;
    
    onChange(event);
  };

  const handleFormatClick = (format: string) => {
    const textarea = document.getElementById(id) as HTMLTextAreaElement;
    if (!textarea) return;
    
    textarea.dataset.format = format;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start !== end) {
      insertFormatting(textarea, start, end);
    }
  };

  const handleColorSelect = (color: string) => {
    setCurrentColor(color);
    handleFormatClick('color');
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-center gap-1 mb-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormatClick('bold')}
          className="h-6 w-6 p-1 hover:bg-gray-100"
          title="Negrito"
        >
          <Bold className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormatClick('italic')}
          className="h-6 w-6 p-1 hover:bg-gray-100"
          title="Itálico"
        >
          <Italic className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormatClick('underline')}
          className="h-6 w-6 p-1 hover:bg-gray-100"
          title="Sublinhado"
        >
          <Underline className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormatClick('list')}
          className="h-6 w-6 p-1 hover:bg-gray-100"
          title="Lista"
        >
          <List className="h-3 w-3" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-1 hover:bg-gray-100"
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
                  onClick={() => handleColorSelect(color.hex)}
                  className="w-5 h-5 rounded-full border border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative">
        <textarea
          id={id}
          name={name}
          ref={textareaRef}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onSelect={handleSelect}
          className={`w-full resize-none border rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm opacity-0 absolute inset-0 ${height} ${fontSize} ${className}`}
          style={{
            lineHeight: '1.5',
            maxHeight: `${maxLines * 1.5}em`,
            minHeight: `${Math.min(4, maxLines) * 1.5}em`,
          }}
        />
        <div
          className={`w-full border rounded-md p-2 ${height} ${fontSize} ${className}`}
          style={{
            lineHeight: '1.5',
            maxHeight: `${maxLines * 1.5}em`,
            minHeight: `${Math.min(4, maxLines) * 1.5}em`,
            overflowY: 'auto',
          }}
          dangerouslySetInnerHTML={{ __html: formattedHtml || placeholder }}
        />
      </div>
    </div>
  );
};

export default FormattedTextArea;