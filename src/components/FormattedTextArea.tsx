import React, { ChangeEvent, useState } from 'react';
import { Button } from './ui/button';
import { Bold, Italic, Underline, List } from 'lucide-react';

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

  return (
    <div className="space-y-1">
      <div className="flex justify-center gap-1 mb-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormatClick('bold')}
          className="h-7 w-7 p-1 hover:bg-gray-100"
        >
          <Bold className="h-3.5 w-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormatClick('italic')}
          className="h-7 w-7 p-1 hover:bg-gray-100"
        >
          <Italic className="h-3.5 w-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormatClick('underline')}
          className="h-7 w-7 p-1 hover:bg-gray-100"
        >
          <Underline className="h-3.5 w-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormatClick('list')}
          className="h-7 w-7 p-1 hover:bg-gray-100"
        >
          <List className="h-3.5 w-3.5" />
        </Button>
      </div>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onSelect={handleSelect}
        className={`w-full resize-none border rounded-md p-2 ${height} ${fontSize} ${className}`}
        style={{
          lineHeight: '1.5',
          maxHeight: `${maxLines * 1.5}em`,
        }}
      />
    </div>
  );
};

export default FormattedTextArea;