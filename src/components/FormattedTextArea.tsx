import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline } from "lucide-react";

interface FormattedTextAreaProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  height: string;
  maxLines: number;
  fontSize?: string;
}

const FormattedTextArea = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  height,
  maxLines,
  fontSize = 'text-sm'
}: FormattedTextAreaProps) => {
  const applyFormatting = (format: 'bold' | 'italic' | 'underline') => {
    const textarea = document.getElementById(id) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
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
    }

    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    const lines = newValue.split('\n');
    
    if (lines.length > maxLines) {
      return;
    }
    
    const event = {
      target: {
        name: textarea.name,
        value: newValue
      }
    } as React.ChangeEvent<HTMLTextAreaElement>;
    onChange(event);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split('\n');
    if (lines.length > maxLines) {
      return;
    }
    onChange(e);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-1 items-center bg-gray-50 p-1 rounded-t-md border border-b-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => applyFormatting('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => applyFormatting('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => applyFormatting('underline')}
        >
          <Underline className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleTextareaChange}
        className={`mt-0 rounded-t-none ${height} ${fontSize} whitespace-pre-line`}
      />
    </div>
  );
};

export default FormattedTextArea;