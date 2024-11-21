import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { FormattedTextAreaProps } from '@/models/formData';

const FormattedTextArea = ({
  id,
  name,
  placeholder,
  value,
  onChange,
  height,
  maxLines,
  fontSize,
  className = "",
}: FormattedTextAreaProps) => {
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div 
      className={`prose max-w-none ${fontSize}`}
      dangerouslySetInnerHTML={{ __html: value }}
      style={{ 
        minHeight: height, 
        border: '1px solid #e2e8f0',
        borderRadius: '0.375rem',
        padding: '0.5rem',
        backgroundColor: 'white' 
      }}
      contentEditable
      onInput={(e) => {
        const target = e.target as HTMLDivElement;
        onChange({ 
          target: { 
            name, 
            value: target.innerHTML 
          } 
        } as any);
      }}
      onPaste={handlePaste}
    />
  );
};

export default FormattedTextArea;