import React, { ChangeEvent, KeyboardEvent, forwardRef } from 'react';

interface TextAreaProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  height: string;
  maxLines: number;
  fontSize: string;
  className?: string;
  style?: React.CSSProperties;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  id,
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  height,
  maxLines,
  fontSize,
  className = "",
  style
}, ref) => {
  return (
    <textarea
      ref={ref}
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`w-full resize-none border rounded-md p-2 placeholder:text-gray-500 placeholder:text-sm ${height} ${fontSize} ${className}`}
      style={{
        ...style,
        lineHeight: '1.5',
        maxHeight: `${maxLines * 1.5}em`,
        minHeight: `${Math.min(4, maxLines) * 1.5}em`,
      }}
    />
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;