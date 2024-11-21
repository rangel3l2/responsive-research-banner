import React, { ChangeEvent, useState, useRef, useEffect, KeyboardEvent } from 'react';
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
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);

  const toggleFormat = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const hasSelection = start !== end;

    const newActiveFormats = new Set(activeFormats);
    if (activeFormats.has(format)) {
      newActiveFormats.delete(format);
    } else {
      newActiveFormats.add(format);
    }
    setActiveFormats(newActiveFormats);

    if (hasSelection) {
      setSelectionStart(start);
      setSelectionEnd(end);
    }

    textarea.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const modifier = e.ctrlKey || e.metaKey;
    
    if (modifier) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          toggleFormat('bold');
          break;
        case 'i':
          e.preventDefault();
          toggleFormat('italic');
          break;
        case 'u':
          e.preventDefault();
          toggleFormat('underline');
          break;
      }
    }
  };

  const getStyles = () => {
    const styles: React.CSSProperties = {};
    
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const hasSelection = start !== end;

      if (hasSelection || (selectionStart !== null && selectionEnd !== null)) {
        if (activeFormats.has('bold')) styles.fontWeight = 'bold';
        if (activeFormats.has('italic')) styles.fontStyle = 'italic';
        if (activeFormats.has('underline')) styles.textDecoration = 'underline';
        if (activeFormats.has('color')) styles.color = currentColor;
      }
    }
    
    return styles;
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start !== end) {
      setSelectionStart(start);
      setSelectionEnd(end);
    }
    
    onChange(e);
  };

  const handleColorSelect = (color: string) => {
    setCurrentColor(color);
    toggleFormat('color');
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-start gap-1 mb-1 p-1 bg-gray-50 rounded-md border">
        <FormattingButton
          onClick={() => toggleFormat('bold')}
          isActive={activeFormats.has('bold')}
          title="Negrito (Ctrl/Cmd + B)"
        >
          <Bold className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={() => toggleFormat('italic')}
          isActive={activeFormats.has('italic')}
          title="Itálico (Ctrl/Cmd + I)"
        >
          <Italic className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={() => toggleFormat('underline')}
          isActive={activeFormats.has('underline')}
          title="Sublinhado (Ctrl/Cmd + U)"
        >
          <Underline className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={() => toggleFormat('list')}
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
        onKeyDown={handleKeyDown}
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