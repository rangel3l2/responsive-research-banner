import React from 'react';
import FormattingToolbar from './formatting/FormattingToolbar';
import TextArea from './formatting/TextArea';
import { FormattedTextAreaProps } from './formatting/types';
import { useFormatting } from './formatting/useFormatting';
import { useKeyboardShortcuts } from './formatting/useKeyboardShortcuts';

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
    </div>
  );
};

export default FormattedTextArea;