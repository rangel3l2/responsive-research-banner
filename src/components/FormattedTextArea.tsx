import React, { ChangeEvent, useState } from 'react';
import { Bold, Italic, Underline, List } from 'lucide-react';
import FormattingButton from './formatting/FormattingButton';
import ColorPicker from './formatting/ColorPicker';

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
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  const handleFormatClick = (format: string) => {
    const textarea = document.getElementById(id) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let formattedText = selectedText;
    const newActiveFormats = new Set(activeFormats);

    if (activeFormats.has(format)) {
      newActiveFormats.delete(format);
    } else {
      newActiveFormats.add(format);
    }

    if (start === end) {
      setActiveFormats(newActiveFormats);
      return;
    }

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
    setActiveFormats(newActiveFormats);
  };

  const handleColorSelect = (color: string) => {
    setCurrentColor(color);
    handleFormatClick('color');
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let newText = e.target.value;
    
    if (activeFormats.size > 0) {
      const lastChar = newText[newText.length - 1];
      if (lastChar && lastChar !== '\n') {
        if (activeFormats.has('bold')) newText = `**${lastChar}**`;
        if (activeFormats.has('italic')) newText = `_${lastChar}_`;
        if (activeFormats.has('underline')) newText = `__${lastChar}__`;
        if (activeFormats.has('color')) newText = `{color:${currentColor}}${lastChar}{/color}`;
      }
    }

    const event = {
      target: {
        name,
        value: newText
      }
    } as ChangeEvent<HTMLTextAreaElement>;
    
    onChange(event);
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-center gap-1 mb-1">
        <FormattingButton
          onClick={() => handleFormatClick('bold')}
          isActive={activeFormats.has('bold')}
          title="Negrito"
        >
          <Bold className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={() => handleFormatClick('italic')}
          isActive={activeFormats.has('italic')}
          title="Itálico"
        >
          <Italic className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={() => handleFormatClick('underline')}
          isActive={activeFormats.has('underline')}
          title="Sublinhado"
        >
          <Underline className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={() => handleFormatClick('list')}
          isActive={activeFormats.has('list')}
          title="Lista"
        >
          <List className="h-3 w-3" />
        </FormattingButton>
        <ColorPicker
          currentColor={currentColor}
          onColorSelect={handleColorSelect}
          isActive={activeFormats.has('color')}
        />
      </div>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
        className={`w-full resize-none border rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm ${height} ${fontSize} ${className}`}
        style={{
          lineHeight: '1.5',
          maxHeight: `${maxLines * 1.5}em`,
          minHeight: `${Math.min(4, maxLines) * 1.5}em`,
        }}
      />
    </div>
  );
};

export default FormattedTextArea;