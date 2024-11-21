import React, { ChangeEvent, useState, useRef, KeyboardEvent } from 'react';
import FormattingToolbar from './formatting/FormattingToolbar';
import TextArea from './formatting/TextArea';
import { FormattedTextAreaProps } from '@/models/formData';

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
      const newRange = {
        start,
        end,
        formats: new Set([format]),
        color: format === 'color' ? currentColor : undefined
      };

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
          setFormattedRanges(ranges => ranges.filter((_, i) => i !== existingRangeIndex));
        } else {
          setFormattedRanges([...formattedRanges]);
        }
      } else {
        setFormattedRanges([...formattedRanges, newRange]);
      }
    }

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

  const handleListFormat = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;
    const lines = text.split('\n');
    let currentLineStart = 0;
    let currentLineIndex = 0;

    // Find the current line
    for (let i = 0; i < lines.length; i++) {
      if (currentLineStart + lines[i].length >= start) {
        currentLineIndex = i;
        break;
      }
      currentLineStart += lines[i].length + 1;
    }

    // Add or remove bullet point
    const currentLine = lines[currentLineIndex];
    if (currentLine.startsWith('• ')) {
      lines[currentLineIndex] = currentLine.substring(2);
    } else {
      lines[currentLineIndex] = '• ' + currentLine;
    }

    const newText = lines.join('\n');
    const newEvent = {
      target: {
        name: textarea.name,
        value: newText
      }
    } as ChangeEvent<HTMLTextAreaElement>;
    
    onChange(newEvent);
  };

  const getStylesForPosition = (position: number) => {
    const styles: React.CSSProperties = {};
    
    formattedRanges.forEach(range => {
      if (position >= range.start && position < range.end) {
        if (range.formats.has('bold')) styles.fontWeight = 'bold';
        if (range.formats.has('italic')) styles.fontStyle = 'italic';
        if (range.formats.has('underline')) styles.textDecoration = 'underline';
        if (range.formats.has('color') && range.color) styles.color = range.color;
      }
    });
    
    return styles;
  };

  return (
    <div className="space-y-1">
      <FormattingToolbar
        activeFormats={activeFormats}
        currentColor={currentColor}
        onFormatClick={applyFormatToSelection}
        onColorSelect={(color) => {
          setCurrentColor(color);
          applyFormatToSelection('color');
        }}
        onListClick={handleListFormat}
      />
      <TextArea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        height={height}
        maxLines={maxLines}
        fontSize={fontSize}
        className={className}
        style={getStylesForPosition(textareaRef.current?.selectionStart || 0)}
      />
    </div>
  );
};

export default FormattedTextArea;