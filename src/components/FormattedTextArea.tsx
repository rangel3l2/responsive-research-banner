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
  const [formattedRanges, setFormattedRanges] = useState<Array<{
    start: number;
    end: number;
    formats: Set<string>;
    color?: string;
  }>>([]);

  const applyFormatToSelection = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const hasSelection = start !== end;

    if (hasSelection) {
      // Se há texto selecionado, aplica a formatação apenas ao intervalo selecionado
      const newRange = {
        start,
        end,
        formats: new Set([format]),
        color: format === 'color' ? currentColor : undefined
      };

      // Verifica se já existe formatação para este intervalo
      const existingRangeIndex = formattedRanges.findIndex(
        range => range.start === start && range.end === end
      );

      if (existingRangeIndex !== -1) {
        const existingRange = formattedRanges[existingRangeIndex];
        if (existingRange.formats.has(format)) {
          existingRange.formats.delete(format);
          if (format === 'color') {
            delete existingRange.color;
          }
        } else {
          existingRange.formats.add(format);
          if (format === 'color') {
            existingRange.color = currentColor;
          }
        }

        if (existingRange.formats.size === 0) {
          // Remove o intervalo se não houver mais formatações
          setFormattedRanges(ranges => ranges.filter((_, i) => i !== existingRangeIndex));
        } else {
          setFormattedRanges([...formattedRanges]);
        }
      } else {
        setFormattedRanges([...formattedRanges, newRange]);
      }
    }

    // Atualiza os formatos ativos para novos textos
    const newActiveFormats = new Set(activeFormats);
    if (activeFormats.has(format)) {
      newActiveFormats.delete(format);
    } else {
      newActiveFormats.add(format);
    }
    setActiveFormats(newActiveFormats);

    textarea.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const modifier = e.ctrlKey || e.metaKey;
    
    if (modifier) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          applyFormatToSelection('bold');
          break;
        case 'i':
          e.preventDefault();
          applyFormatToSelection('italic');
          break;
        case 'u':
          e.preventDefault();
          applyFormatToSelection('underline');
          break;
      }
    }
  };

  const getStylesForPosition = (position: number) => {
    const styles: React.CSSProperties = {};
    
    // Verifica formatações ativas para a posição atual
    formattedRanges.forEach(range => {
      if (position >= range.start && position < range.end) {
        if (range.formats.has('bold')) styles.fontWeight = 'bold';
        if (range.formats.has('italic')) styles.fontStyle = 'italic';
        if (range.formats.has('underline')) styles.textDecoration = 'underline';
        if (range.formats.has('color') && range.color) styles.color = range.color;
      }
    });

    // Aplica formatações ativas para novo texto
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      if (start === end && position >= start) {
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
    onChange(e);
  };

  const handleColorSelect = (color: string) => {
    setCurrentColor(color);
    applyFormatToSelection('color');
  };

  const handleListFormat = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    // Pega a linha atual
    const lines = text.split('\n');
    let currentLineIndex = 0;
    let currentPosition = 0;
    
    for (let i = 0; i < lines.length; i++) {
      if (currentPosition + lines[i].length >= start) {
        currentLineIndex = i;
        break;
      }
      currentPosition += lines[i].length + 1; // +1 para o caractere de nova linha
    }

    // Adiciona ou remove o marcador de lista
    const currentLine = lines[currentLineIndex];
    if (currentLine.startsWith('• ')) {
      lines[currentLineIndex] = currentLine.substring(2);
    } else {
      lines[currentLineIndex] = '• ' + currentLine;
    }

    // Atualiza o texto
    const newText = lines.join('\n');
    const newEvent = {
      target: {
        name: textarea.name,
        value: newText
      }
    } as ChangeEvent<HTMLTextAreaElement>;
    
    onChange(newEvent);
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-start gap-1 mb-1 p-1 bg-gray-50 rounded-md border">
        <FormattingButton
          onClick={() => applyFormatToSelection('bold')}
          isActive={activeFormats.has('bold')}
          title="Negrito (Ctrl/Cmd + B)"
        >
          <Bold className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={() => applyFormatToSelection('italic')}
          isActive={activeFormats.has('italic')}
          title="Itálico (Ctrl/Cmd + I)"
        >
          <Italic className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={() => applyFormatToSelection('underline')}
          isActive={activeFormats.has('underline')}
          title="Sublinhado (Ctrl/Cmd + U)"
        >
          <Underline className="h-3 w-3" />
        </FormattingButton>
        <FormattingButton
          onClick={handleListFormat}
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
          ...getStylesForPosition(textareaRef.current?.selectionStart || 0),
          lineHeight: '1.5',
          maxHeight: `${maxLines * 1.5}em`,
          minHeight: `${Math.min(4, maxLines) * 1.5}em`,
        }}
      />
    </div>
  );
};

export default FormattedTextArea;