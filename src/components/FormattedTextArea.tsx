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
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement;
    setSelectionStart(textarea.selectionStart);
    setSelectionEnd(textarea.selectionEnd);
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById(id) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    let formattedText = '';
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
      default:
        formattedText = selectedText;
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

  return (
    <div className="space-y-2">
      <div className="flex gap-2 mb-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => insertFormatting('bold')}
          className="h-8 w-8"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => insertFormatting('italic')}
          className="h-8 w-8"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => insertFormatting('underline')}
          className="h-8 w-8"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => insertFormatting('list')}
          className="h-8 w-8"
        >
          <List className="h-4 w-4" />
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