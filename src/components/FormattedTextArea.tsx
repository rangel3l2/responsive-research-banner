import React, { ChangeEvent } from 'react';

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
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full resize-none border rounded-md p-2 ${height} ${fontSize} ${className}`}
      style={{
        lineHeight: '1.5',
        maxHeight: `${maxLines * 1.5}em`,
      }}
    />
  );
};

export default FormattedTextArea;