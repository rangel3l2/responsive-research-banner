import React from 'react';
import TextArea from './formatting/TextArea';
import { FormattedTextAreaProps } from './formatting/types';
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
  return (
    <div className="space-y-1">
      <div className="relative">
        <TextArea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          height={height}
          maxLines={maxLines}
          fontSize={fontSize}
          className={className}
        />
        {saveStatus && (
          <div className="absolute right-2 bottom-2 flex items-center">
            {saveStatus.isSaving ? (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
            ) : saveStatus.isError ? (
              <X className="w-4 h-4 text-red-500" />
            ) : (
              <Check className={`w-4 h-4 ${saveStatus.lastSaved ? 'text-green-500' : 'text-gray-300'}`} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormattedTextArea;