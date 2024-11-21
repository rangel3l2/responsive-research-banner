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
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const target = e.currentTarget;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
    }
  };

  return (
    <div 
      className={`prose max-w-none ${fontSize} ${className}`}
      style={{ 
        minHeight: height, 
        border: '1px solid #e2e8f0',
        borderRadius: '0.375rem',
        padding: '0.5rem',
        backgroundColor: 'white',
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
      placeholder={placeholder}
      role="textbox"
      aria-label={placeholder}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

export default FormattedTextArea;