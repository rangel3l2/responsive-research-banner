import { useState, useRef } from 'react';
import { FormattedRange } from './types';

export const useFormatting = (onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void) => {
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const [currentColor, setCurrentColor] = useState('#000000');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [formattedRanges, setFormattedRanges] = useState<FormattedRange[]>([]);

  const applyFormatToSelection = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const hasSelection = start !== end;

    if (hasSelection) {
      const newRange: FormattedRange = {
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
    } else {
      // Toggle format in active formats for new text only when no text is selected
      const newActiveFormats = new Set(activeFormats);
      if (activeFormats.has(format)) {
        newActiveFormats.delete(format);
      } else {
        newActiveFormats.add(format);
      }
      setActiveFormats(newActiveFormats);
    }

    textarea.focus();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart;
    
    if (activeFormats.size > 0 && cursorPosition > 0) {
      const newRange: FormattedRange = {
        start: cursorPosition - 1,
        end: cursorPosition,
        formats: new Set(activeFormats),
        color: activeFormats.has('color') ? currentColor : undefined
      };
      
      setFormattedRanges(prev => [...prev, newRange]);
    }
    
    onChange(e);
  };

  return {
    activeFormats,
    currentColor,
    textareaRef,
    formattedRanges,
    setCurrentColor,
    applyFormatToSelection,
    handleTextChange
  };
};