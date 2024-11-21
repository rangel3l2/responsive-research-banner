import React, { ChangeEvent, useState, useRef } from 'react';
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
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [currentColor, setCurrentColor] = useState('#000000');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormatting = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    // Toggle format state
    const newActiveFormats = new Set(activeFormats);
    if (activeFormats.has(format)) {
      newActiveFormats.delete(format);
    } else {
      newActiveFormats.add(format);
    }
    setActiveFormats(newActiveFormats);

    // If text is selected, apply formatting
    if (start !== end) {
      const formattedText = selectedText;
      const newValue = value.substring(0, start) + formattedText + value.substring(end);
      const event = {
        target: {
          name,
          value: newValue
        }
      } as ChangeEvent<HTMLTextAreaElement>;
      
      onChange(event);
      
      // Restore selection
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + formattedText.length);
      }, 0);
    }
  };

  const getStyles = () => {
    const styles: React.CSSProperties = {
      fontWeight: activeFormats.has('bold') ? 'bold' : 'normal',
      fontStyle: activeFormats.has('italic') ? 'italic' : 'normal',
      textDecoration: activeFormats.has('underline') ? 'underline' : 'none',
      color: activeFormats.has('color') ? currentColor : 'inherit',
    };
    return styles;
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e);
  };

  const handleColorSelect = (color: string) => {
    setCurrentColor(color);
    applyFormatting('color');
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-start gap-1 mb-1 p-1 bg-gray-50 rounded-md border">
        <FormattingButton
          onClick={() => applyFormatting('bold')}
          isActive={activeFormats.has('bold')}
          title="Negrito"
        >
          <Bold className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={() => applyFormatting('italic')}
          isActive={activeFormats.has('italic')}
          title="Itálico"
        >
          <Italic className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={() => applyFormatting('underline')}
          isActive={activeFormats.has('underline')}
          title="Sublinhado"
        >
          <Underline className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={() => applyFormatting('list')}
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
        ref={textareaRef}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
        className={`w-full resize-none border rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm ${height} ${fontSize} ${className}`}
        style={{
          ...getStyles(),
          lineHeight: '1.5',
          maxHeight: `${maxLines * 1.5}em`,
          minHeight: `${Math.min(4, maxLines) * 1.5}em`,
        }}
      />
    </div>
  );
};

export default FormattedTextArea;