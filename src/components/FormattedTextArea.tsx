import React from 'react';
import FormattingToolbar from './formatting/FormattingToolbar';
import TextArea from './formatting/TextArea';
import { FormattedTextAreaProps } from './formatting/types';
import { useFormatting } from './formatting/useFormatting';
import { useKeyboardShortcuts } from './formatting/useKeyboardShortcuts';
import { Check, X } from 'lucide-react';

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
  saveStatus,
}) => {
  const {
    activeFormats,
    currentColor,
    textareaRef,
    formattedRanges,
    setCurrentColor,
    applyFormatToSelection,
    handleTextChange
  } = useFormatting(onChange);

  const { handleKeyDown } = useKeyboardShortcuts(applyFormatToSelection);

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

  const handleListFormat = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;
    const lines = text.split('\n');
    let currentLineStart = 0;
    let currentLineIndex = 0;

    for (let i = 0; i < lines.length; i++) {
      if (currentLineStart + lines[i].length >= start) {
        currentLineIndex = i;
        break;
      }
      currentLineStart += lines[i].length + 1;
    }

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
    } as React.ChangeEvent<HTMLTextAreaElement>;
    
    onChange(newEvent);
  };

  return (
    <div className="space-y-1">
      <FormattingToolbar
        activeFormats={activeFormats}
        currentColor={currentColor}
        onFormatClick={applyFormatToSelection}
        onColorSelect={setCurrentColor}
        onListClick={handleListFormat}
      />
      <div className="relative">
        <TextArea
          ref={textareaRef}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          height={height}
          maxLines={maxLines}
          fontSize={fontSize}
          className={`${className} ${!value && 'bg-red-50'}`}
          style={getStylesForPosition(textareaRef.current?.selectionStart || 0)}
        />
        {saveStatus && (
          <div className="absolute right-2 bottom-2 flex items-center">
            {saveStatus.isSaving ? (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
            ) : saveStatus.isError ? (
              <X className="w-4 h-4 text-red-500" />
            ) : saveStatus.lastSaved && (
              <Check className="w-4 h-4 text-gray-400" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormattedTextArea;